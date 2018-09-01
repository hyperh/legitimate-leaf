import React from 'react';
import web3 from './web3';

const Results = ({ totalWeiTransferred }) => (
  <div>
    <h2>Results</h2>
    <div>
      Total ether transferred: {web3.utils.fromWei(totalWeiTransferred)}
    </div>
    <div>
      <h3>Receivers</h3>
    </div>
    <div />
  </div>
);

export default Results;
