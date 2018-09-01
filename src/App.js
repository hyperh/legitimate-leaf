import React, { Component } from 'react';
import './App.css';
import * as Utils from './utils';
import * as Status from './status';
class App extends Component {
  state = {
    status: Status.READY
  };

  getAnalytics = async () => {
    try {
      this.setState({ status: Status.REQUESTED });
      const res = await Utils.getAnalytics();
      this.setState({ ...res, status: Status.SUCCEEDED });
    } catch (e) {
      console.log(e);
      this.setState({ status: Status.FAILED });
    }
  };

  render() {
    const { status } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Ether Cash Flow Tool</h1>
        </header>

        <p>Status: {status}</p>

        <h2>Start and End Range of block numbers (inclusive)</h2>
        <input type="number" placeholder="Start" />
        <input type="number" placeholder="End" />
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
