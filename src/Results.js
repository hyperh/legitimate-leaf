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
  uniqueAddressesIsContract,
  numUncles
}) => (
  <div className="results">
    <h2>Results: {title}</h2>

    <div>
      <h3>Total</h3>
      <div>ETH transferred: {web3.utils.fromWei(totalWeiTransferred)}</div>
      <div>
        Unique addresses received transactions:{' '}
        {Object.keys(receiverTotals).length}
      </div>
      <div>
        Unique addresses sent transactions: {Object.keys(senderTotals).length}
      </div>
      <div>Number of uncles: {numUncles}</div>
    </div>

    <div className="addressAmounts">
      <h3>Amount ETH received by address:</h3>
      {Object.keys(receiverTotals).map(address => (
        <AddressAmount
          key={address}
          address={address}
          totalWei={receiverTotals[address]}
          isContract={uniqueAddressesIsContract[address]}
        />
      ))}
    </div>
    <div className="addressAmounts">
      <h3>Amount ETH sent by address:</h3>
      {Object.keys(senderTotals).map(address => (
        <AddressAmount
          key={address}
          address={address}
          totalWei={senderTotals[address]}
          isContract={uniqueAddressesIsContract[address]}
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
  uniqueAddressesIsContract: PropTypes.object.isRequired,
  numUncles: PropTypes.number.isRequired
};

export default Results;
