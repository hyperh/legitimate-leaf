import React from 'react';
import PropTypes from 'prop-types';
import web3 from './web3';
import './App.css';

const AddressAmount = ({ address, totalWei, isContract }) => (
  <div key={address} className={isContract ? 'contract' : null}>
    {isContract && '(CONTRACT) '} {address}: {web3.utils.fromWei(totalWei)}
  </div>
);

AddressAmount.defaultProps = {
  isContract: false
};

AddressAmount.propTypes = {
  address: PropTypes.string.isRequired,
  totalWei: PropTypes.string.isRequired,
  isContract: PropTypes.bool
};

export default AddressAmount;
