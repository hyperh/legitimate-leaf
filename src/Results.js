import React from 'react';
import PropTypes from 'prop-types';
import web3 from './web3';
import AddressAmount from './AddressAmount';
import './App.css';

const Results = ({
  title,
  totalWeiTransferred,
  receiverTotals,
  senderTotals,
  uniqueAddressesIsContract
}) => (
  <div>
    <h2>Results: {title}</h2>
    <div>Total ETH transferred: {web3.utils.fromWei(totalWeiTransferred)}</div>
    <div>
      <h3>Amount ETH received by address:</h3>
      {Object.keys(receiverTotals).map(address => (
        <AddressAmount
          key={address}
          address={address}
          totalWei={receiverTotals[address]}
        />
      ))}
    </div>
    <div>
      <h3>Amount ETH sent by address:</h3>
      {Object.keys(senderTotals).map(address => (
        <AddressAmount
          key={address}
          address={address}
          totalWei={senderTotals[address]}
        />
      ))}
    </div>
    <div />
  </div>
);

Results.propTypes = {
  title: PropTypes.string.isRequired,
  totalWeiTransferred: PropTypes.string.isRequired,
  receiverTotals: PropTypes.object.isRequired,
  senderTotals: PropTypes.object.isRequired,
  uniqueAddressesIsContract: PropTypes.object.isRequired
};

export default Results;
