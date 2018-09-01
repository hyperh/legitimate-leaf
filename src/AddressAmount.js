import React from 'react';
import PropTypes from 'prop-types';
import web3 from './web3';

const AddressAmount = ({ address, totalWei }) => (
  <div key={address}>
    {address}: {web3.utils.fromWei(totalWei)}
  </div>
);

AddressAmount.propTypes = {
  address: PropTypes.string.isRequired,
  totalWei: PropTypes.string.isRequired
};

export default AddressAmount;
