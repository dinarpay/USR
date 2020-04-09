import Web3 from 'web3';
import config from './config';
import USRABI from '../abi/USR.abi.json';
import USDxABI from '../abi/USDx.abi.json';
import { saveTransactions } from './index';

let Decimal = require('decimal.js-light');
Decimal = require('toformat')(Decimal);

const USDxAddress = config.USDx;
const USRAddress = config.USR;

export const WadDecimal = Decimal.clone({
  rounding: 1, // round down
  precision: 78,
  toExpNeg: -18,
  toExpPos: 78,
})

WadDecimal.format = {
  groupSeparator: ",",
  groupSize: 3,
}

// to fixed
function toFixed(num, precision) {
  return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
}

// get usdx balance
export async function getUSDxBalance() {
  const {
    web3,
    walletAddress,
    usdxObj,
  } = this.props.usr;
  const { dispatch } = this.props;

  if (!usdxObj || !walletAddress) return;

  const usdxBalanceRaw = await usdxObj.methods.balanceOf(walletAddress).call();
  const usdxBalanceDecimal = new WadDecimal(usdxBalanceRaw).div('1e18');
  const usdxBalance = toFixed(parseFloat(web3.utils.fromWei(usdxBalanceRaw)), 5);

  dispatch({
    type: 'usr/updateMultiParams',
    payload: {
      usdxBalance,
      usdxBalanceDecimal,
    }
  });
}

// get usr balance
export async function getUSRBalance() {
  const {
    dispatch,
    usr: {
      web3,
      usrObj,
      walletAddress,
    }
  } = this.props;

  if (!usrObj || !walletAddress) return;

  const usrBalanceRaw = await usrObj.methods.balanceOf(walletAddress).call();
  const usrBalanceDecimal = new WadDecimal(usrBalanceRaw).div('1e18');
  const usrBalance = toFixed(parseFloat(web3.utils.fromWei(usrBalanceRaw)), 5);

  // save usr balance
  dispatch({
    type: 'usr/updateMultiParams',
    payload: {
      usrBalance,
      usrBalanceDecimal,
    },
  });
}

// get recent transactions
export async function getRecentTransactions() {
  const { web3, walletAddress } = this.props.usr;
  let result = await web3.eth.getTransactionCount(walletAddress);
}

// get exchange rate
export async function getExchangeRate() {
  const { web3, usrObj } = this.props.usr;
  const exchangeRateRaw = await usrObj.methods.getExchangeRate().call();
  const exchangeRateDecimal = new WadDecimal(exchangeRateRaw).div('1e27');
  const exchangeRate = exchangeRateDecimal.toFixed();

  this.props.dispatch({
    type: 'usr/updateMultiParams',
    payload: { exchangeRate }
  });
}

export async function getTotalBalanceOfUSDx() {

}

export async function getShares() {

}

// get interest rate
export async function getInterestRate() {
  const { web3, usrObj } = this.props.usr;
  // console.log(usrObj.methods)
  const interestRateRaw = await usrObj.methods.interestRate().call();
  const interestRateDecimal = new WadDecimal(interestRateRaw).div('1e27');
  const interestRate = interestRateDecimal.toFixed();

  this.props.dispatch({
    type: 'usr/updateMultiParams',
    payload: { interestRate }
  });
}

// get total balance

// get shares

// set up contracts
export function setupContracts(dispatch) {
  const { web3 } = this.props.usr;
  dispatch('usrObj', new web3.eth.Contract(USRABI, USRAddress));
  dispatch('usdxObj', new web3.eth.Contract(USDxABI, USDxAddress));
}

// get balance of usr and usdx
export async function getData() {
  getUSRBalance.bind(this)();
  getUSDxBalance.bind(this)();
  getExchangeRate.bind(this)();
  getInterestRate.bind(this)();
}

export async function initBrowserWallet(dispatch, prompt = true) {
  dispatch('walletLoading', true);
  // if (!localStorage.getItem('walletKnown') && !prompt) return;

  let web3Provider;

  // Initialize web3 (https://medium.com/coinmonks/web3-js-ethereum-javascript-api-72f7b22e2f0a)
  if (window.ethereum) {
    web3Provider = window.ethereum;
    try {
      // Request account access
      await window.ethereum.enable();
    } catch (error) {
      // User denied account access...
      console.error("User denied account access");
    }

    window.ethereum.on('accountsChanged', (accounts) => {
      initBrowserWallet.bind(this)();
    })
  } else if (window.web3) {
    web3Provider = window.web3.currentProvider;
  } else {
    // If no injected web3 instance is detected, display err
    console.log("Please install MetaMask!");
    dispatch('web3Failure', true);
    return;
  }

  const web3 = new Web3(web3Provider);
  const network = await web3.eth.net.getId();

  dispatch('network', network);
  dispatch('web3Failure', false);
  dispatch('web3', web3);

  const walletType = 'browser';
  const accounts = await web3.eth.getAccounts();
  localStorage.setItem('walletKnown', true);

  dispatch('walletLoading', false);
  dispatch('walletAddress', accounts[0]);
  dispatch('walletType', walletType);

  setupContracts.bind(this)(dispatch);
  getData.bind(this)();
}

// transfer usdx
export async function mintUSR() {
  let {
    web3,
    usrObj,
    usdxObj,
    joinAmount,
    walletAddress,
    receiveUSRValue,
  } = this.props.usr;

  let storeJoinAmount = joinAmount.toFixed();

  joinAmount = joinAmount.mul(10**18);

  // return usdxObj.methods.approve(usrObj.options.address, '-1')
  //   .send({ from: walletAddress })
  //   .then(() => {

    // });
  return usrObj.methods
    .mint(walletAddress, joinAmount.toFixed())
    .send({
      from: walletAddress
    })
    .then(res => {
      let obj = {
        action: 'deposit',
        data: res,
        usr: receiveUSRValue,
        usdx: storeJoinAmount
      };
      saveTransactions(obj);

      this.props.dispatch({
        type: 'usr/updateRecentTransactions'
      });
    });
}

// transfer usr
export async function burnUSR() {
  let {
    web3,
    usrObj,
    usdxObj,
    joinAmount,
    exitAmount,
    walletAddress,
    receiveUSDxValue,
  } = this.props.usr;

  let storeExitAmount = exitAmount.toFixed();

  exitAmount = exitAmount.mul(10**18);

  return usrObj.methods
    .burn(walletAddress, exitAmount.toFixed())
    .send({
      from: walletAddress
    })
    .then(res => {
      let obj = {
        action: 'redeem',
        data: res,
        usr: storeExitAmount,
        usdx: receiveUSDxValue
      };
      saveTransactions(obj);

      this.props.dispatch({
        type: 'usr/updateRecentTransactions'
      });
    });
}
