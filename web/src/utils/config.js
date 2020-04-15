import { message } from 'antd';

message.config({
  top: 100,
  maxCount: 1,
  duration: 3
});

export default {
  "defaultWeb3Provider": "https://mainnet.infura.io/v3/8facbab2998b411ea0cef95ae90b66f1",
  main: {
    "USDx": "0xD96cC7f80C1cb595eBcdC072531e1799B3a2436E",
    "USR": "0x1f2B68512A0e4C2CcEFAd0af60E699B22588362a",
    "network": 1
  },
  rinkeby: {
    "USDx": "0xD96cC7f80C1cb595eBcdC072531e1799B3a2436E",
    "USR": "0x1f2B68512A0e4C2CcEFAd0af60E699B22588362a",
    "network": 1
  }
};
