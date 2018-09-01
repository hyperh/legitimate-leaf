import React, { Component } from 'react';
import './App.css';
import * as Utils from './utils';
import * as Status from './status';
class App extends Component {
  state = {
    status: Status.READY,
    start: null,
    end: null
  };

  handleChangeInputStart = event =>
    this.setState({ start: event.target.value });
  handleChangeInputEnd = event => this.setState({ end: event.target.value });

  getAnalytics = async () => {
    try {
      const { start, end } = this.state;
      this.setState({ status: Status.REQUESTED });
      const radix = 10;
      const res = await Utils.getAnalytics(
        parseInt(start, radix),
        parseInt(end, radix)
      );
      this.setState({ ...res, status: Status.SUCCEEDED });
    } catch (e) {
      console.log(e);
      this.setState({ status: Status.FAILED });
    }
  };

  render() {
    const { status, start, end } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Ether Cash Flow Tool</h1>
        </header>

        <p>Status: {status}</p>

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
          <button onClick={this.getAnalytics}>Analyze the blockchain!</button>
        )}

        <h2>X previous blocks</h2>
        <input
          type="number"
          placeholder="Number of blocks before present block"
        />
        {status !== Status.REQUESTED && (
          <button onClick={this.getAnalytics}>Analyze the blockchain!</button>
        )}

        <p>{JSON.stringify(this.state.res, null, 2)}</p>
      </div>
    );
  }
}

export default App;
