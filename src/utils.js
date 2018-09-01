import { range, flatten, zipObj } from 'ramda';
import BN from 'bn.js';
import web3 from './web3';

export const getTransactionsHashesInBlock = async blockNum => {
  const res = await web3.eth.getBlock(blockNum);
  return res.transactions;
};

export const getTransactionHashes = async blockNums => {
  const txHashesPromises = blockNums.map(getTransactionsHashesInBlock);
  const txHashesPerBlockList = await Promise.all(txHashesPromises);
  return flatten(txHashesPerBlockList);
};

export const getTransactions = async blockNums => {
  const txHashes = await getTransactionHashes(blockNums);
  const txPs = txHashes.map(txHash => web3.eth.getTransaction(txHash));
  return Promise.all(txPs);
};

export const getTotalWeiTransferred = txs =>
  txs
    .reduce((prev, tx) => {
      const currBN = new BN(tx.value);
      return prev.add(currBN);
    }, new BN(0))
    .toString();

export const getTotals = addressKey => txs =>
  txs.reduce((prev, tx) => {
    const address = tx[addressKey];
    const prevTotal = prev[address];
    const newTotal = prevTotal
      ? new BN(prevTotal).add(new BN(tx.value))
      : new BN(tx.value);

    if (newTotal.eqn(0)) return prev;
    return Object.assign(prev, { [address]: newTotal.toString() });
  }, {});

export const getReceiverTotals = getTotals('to');
export const getSenderTotals = getTotals('from');

export const getUniqueAddresses = txs =>
  txs.reduce(
    (prev, tx) => Object.assign(prev, { [tx.from]: null, [tx.to]: null }),
    {}
  );

const isContract = code => code !== '0x';

export const getUniqueAddressesIsContract = async txs => {
  const uniqueAddressesObj = getUniqueAddresses(txs);
  const uniqueAddresses = Object.keys(uniqueAddressesObj);

  const getCodePs = uniqueAddresses
    .filter(address => address !== 'null')
    .map(address => web3.eth.getCode(address));

  const addressCodes = await Promise.all(getCodePs);
  const isContractList = addressCodes.map(isContract);

  return zipObj(uniqueAddresses, isContractList);
};

export const getAnalytics = async (start = 4238372, end = 4238374) => {
  const blockNums = range(start, end + 1);
  const txs = await getTransactions(blockNums);

  const totalWeiTransferred = getTotalWeiTransferred(txs);
  const receiverTotals = getReceiverTotals(txs);
  const senderTotals = getSenderTotals(txs);
  const uniqueAddressesIsContract = await getUniqueAddressesIsContract(txs);
  return {
    totalWeiTransferred,
    receiverTotals,
    senderTotals,
    uniqueAddressesIsContract
  };
};
