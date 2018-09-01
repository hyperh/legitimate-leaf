import Web3 from 'web3';
import dotenv from 'dotenv';

dotenv.config();

const networkUrl = process.env.REACT_APP_INFURA_ENDPOINT_MAINNET;
const provider = new Web3.providers.HttpProvider(networkUrl);
const web3 = new Web3(provider);

export default web3;
