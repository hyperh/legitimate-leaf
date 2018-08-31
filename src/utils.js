import Web3 from 'web3';
import dotenv from 'dotenv';
import { range, flatten } from 'ramda';

dotenv.config();

const networkUrl = process.env.INFURA_ENDPOINT_MAINNET;
const provider = new Web3.providers.HttpProvider(networkUrl);
const web3 = new Web3(provider);

export const getTransactionsHashesInBlock = async blockNum => {
  const res = await web3.eth.getBlock(blockNum);
  return res.transactions;
};

export const main = async () => {
  const blockNums = range(6238372, 6238374);
  const txHashesPromises = blockNums.map(getTransactionsHashesInBlock);
  const txHashesPerBlockList = await Promise.all(txHashesPromises);
  const txHashes = flatten(txHashesPerBlockList);

  const txPs = txHashes.map(txHash => web3.eth.getTransaction(txHash));
  const res = await Promise.all(txPs);
  console.log(res);
};
