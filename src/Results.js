import React from 'react';
import web3 from './web3';

const Results = ({
  totalWeiTransferred,
  receiverTotals,
  senderTotals,
  uniqueAddressesIsContract
}) => (
  <div>
    <h2>Results</h2>
    <div>
      Total ether transferred: {web3.utils.fromWei(totalWeiTransferred)}
    </div>
    <div>
      <h3>Amount ETH received by address:</h3>
      {Object.keys(receiverTotals).map(address => (
        <div>
          {address}: {web3.utils.fromWei(receiverTotals[address])}
        </div>
      ))}
    </div>
    <div>
      <h3>Amount ETH sent by address:</h3>
      {Object.keys(senderTotals).map(address => (
        <div>
          {address}: {web3.utils.fromWei(senderTotals[address])}
        </div>
      ))}
    </div>
    <div />
  </div>
);

export default Results;
