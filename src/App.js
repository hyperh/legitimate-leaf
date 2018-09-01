import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import './App.css';
import * as Utils from './utils';
import * as Status from './status';
import web3 from './web3';
import Results from './Results';

class App extends Component {
  state = {
    status: Status.READY,
    start: null,
    end: null,
    diff: null,
    res: {
      totalWeiTransferred: 0,
      receiverTotals: {},
      uniqueAddressesIsContract: {}
    }
  };

  handleChangeInputStart = event =>
    this.setState({ start: event.target.value });
  handleChangeInputEnd = event => this.setState({ end: event.target.value });

  getAnalyticsWithStartEnd = async () => {
    try {
      const { start, end } = this.state;
      this.setState({ status: Status.REQUESTED });
      const radix = 10;
      const res = await Utils.getAnalytics(
        parseInt(start, radix),
        parseInt(end, radix)
      );
      this.setState({ res, status: Status.SUCCEEDED });
    } catch (e) {
      console.log(e);
      this.setState({ status: Status.FAILED });
    }
  };

  getAnalyticsWithDiff = async () => {
    try {
      const { diff } = this.state;
      const radix = 10;

      this.setState({ status: Status.REQUESTED });

      const currentBlockNum = await web3.eth.getBlockNumber();

      const res = await Utils.getAnalytics(
        parseInt(currentBlockNum - diff, radix),
        parseInt(currentBlockNum, radix)
      );
      this.setState({ res, status: Status.SUCCEEDED });
    } catch (e) {
      console.log(e);
      this.setState({ status: Status.FAILED });
    }
  };

  render() {
    const { status, start, end, diff, res } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Ether Cash Flow Tool</h1>
        </header>

        <h2>Start and End Range of block numbers (inclusive)</h2>
        <input
          type="number"
          placeholder="Start"
          value={start}
          onChange={this.handleChangeInputStart}
        />
        <input
          type="number"
          placeholder="End"
          value={end}
          onChange={this.handleChangeInputEnd}
        />
        {status !== Status.REQUESTED && (
          <button onClick={this.getAnalyticsWithStartEnd}>
            Analyze the blockchain!
          </button>
        )}

        <h2>Number of blocks before present block</h2>
        <input
          type="number"
          placeholder="Number of blocks before present block"
          value={diff}
          onChange={this.handleChangeInputDiff}
        />
        {status !== Status.REQUESTED && (
          <button onClick={this.getAnalyticsWithDiff}>
            Analyze the blockchain!
          </button>
        )}

        {status === Status.REQUESTED && (
          <div className="spinnerWrapper">
            <Spinner name="wave" />
          </div>
        )}
        {status === Status.SUCCEEDED && <Results {...res} />}
      </div>
    );
  }
}

export default App;
