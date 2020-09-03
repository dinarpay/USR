# USR

## Clone the repo

Clone the repo with git sub modules:

```
git clone -r https://github.com/dforce-network/USR
```

or run:

```
git submodule init && git submodule update
```

in an existing USR repo.

## Usage

### Build

Install buidler and plugins

```
npm install
mv .example.env .env
```

Run the following commands to compile all contracts:

```
npx buidler compile
```

Compile the USDx contracts for integration test:

```
npx buidler compile --config buidler.config.usdx.js
```

Run a local develop network with buidler EVM:

```
npx buidler node
```

Run a local node and a console:

```
npx buidler console
```

### Test

To run the tests:

```
npx buidler test
```

To run test coverage:

```
npx buidler coverage --temp build
```

### Deploy

To deploy contracts, need to set basic config parameters in `.env`:

```
INFURA_APIKEY: Infura key.
PRIVATE_KEY: Private key of deployer account.
```

Deploy contracts at the local:

```
truffle migrate
```

Deploy contracts at the testnet: Kovan.

```
truffle migrate --network kovan
```
