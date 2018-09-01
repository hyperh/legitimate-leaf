import { range, flatten, zipObj, pathOr } from 'ramda';
import BN from 'bn.js';
import web3 from './web3';

export const getTransactions = blocks =>
  flatten(blocks.map(block => block.transactions));

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

export const getBlocks = async (blockNums = []) => {
  const blockPs = blockNums.map(blockNum => web3.eth.getBlock(blockNum, true));
  return Promise.all(blockPs);
};

export const getNumUncles = (blocks = []) =>
  blocks.reduce((prev, block) => prev + block.uncles.length, 0);

export const getContractTxPercentage = (txs, uniqueAddressesIsContract) => {
  const numContractTx = txs
    .map(
      tx =>
        uniqueAddressesIsContract[tx.from] || uniqueAddressesIsContract[tx.to]
          ? 1
          : 0
    )
    .reduce((prev, isContractTx) => prev + isContractTx, 0);

  return (numContractTx / txs.length) * 100;
};

export const getNumEvents = async txs => {
  const txHashes = txs.map(tx => tx.hash);
  const txReceiptPs = txHashes.map(hash =>
    web3.eth.getTransactionReceipt(hash)
  );

  const receipts = await Promise.all(txReceiptPs);

  console.log(receipts);

  return receipts.reduce(
    (prev, receipt) => prev + pathOr([], ['logs'], receipt).length,
    0
  );
};

export const getAnalytics = async (start = 4238372, end = 4238374) => {
  const blockNums = range(start, end + 1);
  const blocks = await getBlocks(blockNums);
  const txs = getTransactions(blocks);

  const totalWeiTransferred = getTotalWeiTransferred(txs);
  const receiverTotals = getReceiverTotals(txs);
  const senderTotals = getSenderTotals(txs);
  const uniqueAddressesIsContract = await getUniqueAddressesIsContract(txs);
  const numUncles = getNumUncles(blocks);
  const contractTxPercentage = getContractTxPercentage(
    txs,
    uniqueAddressesIsContract
  );

  const numEvents = await getNumEvents(txs);

  return {
    totalWeiTransferred,
    receiverTotals,
    senderTotals,
    uniqueAddressesIsContract,
    numUncles,
    contractTxPercentage,
    numEvents
  };
};
