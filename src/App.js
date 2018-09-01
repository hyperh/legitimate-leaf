import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import './App.css';
import * as Utils from './utils';
import * as Status from './status';
import web3 from './web3';
import Results from './Results';

const radix = 10;
class App extends Component {
  state = {
    status: Status.READY,
    start: '',
    end: '',
    diff: '',
    res: {
      title: '',
      totalWeiTransferred: 0,
      receiverTotals: {},
      senderTotals: {},
      uniqueAddressesIsContract: {}
    }
  };

  handleChangeInputStart = event =>
    this.setState({ start: event.target.value });
  handleChangeInputEnd = event => this.setState({ end: event.target.value });
  handleChangeInputDiff = event => this.setState({ diff: event.target.value });

  getAnalyticsWithStartEnd = async () => {
    try {
      const { start, end } = this.state;

      const startInt = parseInt(start, radix);
      const endInt = parseInt(end, radix);

      const canSubmit = startInt > 0 && endInt > 0;
      if (!canSubmit) return alert('Start and end must be positive integers.');

      this.setState({ status: Status.REQUESTED });

      const res = await Utils.getAnalytics(startInt, endInt);
      this.setState({
        res: { ...res, title: `Block ${startInt} to Block ${endInt}` },
        status: Status.SUCCEEDED
      });
    } catch (e) {
      console.log(e);
      this.setState({ status: Status.FAILED });
    }
  };

  getAnalyticsWithDiff = async () => {
    try {
      const { diff } = this.state;

      const diffInt = parseInt(diff, radix);
      const canSubmit = diffInt > 0;

      if (!canSubmit)
        return alert(
          'Number of blocks before current must be a positive integer.'
        );

      this.setState({ status: Status.REQUESTED });

      const currentBlockNum = await web3.eth.getBlockNumber();

      const startInt = parseInt(currentBlockNum - diff, radix);
      const endInt = parseInt(currentBlockNum, radix);

      const res = await Utils.getAnalytics(startInt, endInt);
      this.setState({
        res: { ...res, title: `Block ${startInt} to Block ${endInt}` },
        status: Status.SUCCEEDED
      });
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
