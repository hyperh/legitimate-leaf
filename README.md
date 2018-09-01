# Ether Cash Flow Tool

This is a tool to analyze the Ethereum block chain. It will compute a series of analytics according to a user's input.

There are 2 ways a user can retrieve their analytics:

1. A range of block numbers (inclusive)
1. X blocks before the present block

# Installation
1. Install dependencies through [`yarn`](https://yarnpkg.com/en/) 

    ```
    yarn
    ```

    or [`npm`](https://www.npmjs.com/)

    ```
    npm install
    ```

# Running
1. Before running, we need to set environment variables. There are 2 ways to do this.
    1. `.env` file
        1. Add a single line: `REACT_APP_PROVIDER_URL=...` 
          
           For example with [Infura's Ropsten endpoint](https://infura.io/): 
           ````
           REACT_APP_PROVIDER_URL=https://ropsten.infura.io/v3/MY_API_KEY
           ````

           With local [`ganache-cli`](https://github.com/trufflesuite/ganache-cli):
           ````
           REACT_APP_PROVIDER_URL=http://localhost:8545
           ````
    1. Setting environment variables on the command line
        
        ````
        REACT_APP_PROVIDER_URL=... yarn start
        ````

        This will set the env var and start the app dev server at the same time.

1. Start the app dev server: `yarn start` or `npm start`

# Run Tests
1. `yarn test` or `npm start`
