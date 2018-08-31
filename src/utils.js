import Web3 from 'web3';
import dotenv from 'dotenv';
import { range, flatten } from 'ramda';
import BN from 'bn.js';

dotenv.config();

const networkUrl = process.env.INFURA_ENDPOINT_MAINNET;
const provider = new Web3.providers.HttpProvider(networkUrl);
const web3 = new Web3(provider);

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

export const getReceiverTotals = txs =>
  txs.reduce((prev, tx) => {
    const prevTotal = prev[tx.to];
    const newTotal = prevTotal
      ? new BN(prevTotal).add(new BN(tx.value))
      : new BN(tx.value);

    if (newTotal.eqn(0)) return prev;
    return Object.assign(prev, { [tx.to]: newTotal.toString() });
  }, {});

export const main = async () => {
  const start = 4238372;
  const end = 4238374;
  const blockNums = range(start, end + 1);
  const txs = await getTransactions(blockNums);

  const totalWeiTransferred = getTotalWeiTransferred(txs);
  const receiverTotals = getReceiverTotals(txs);
  return { totalWeiTransferred, receiverTotals };
};
