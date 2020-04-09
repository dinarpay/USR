// operation panel
import React, { Component } from 'react';
import styles from './index.less';
import { formatCurrencyNumber } from '@utils';

export default class Overview extends Component {
  render() {
    const {
      usrBalance,
      usdxBalance,
      interestRate,
      exchangeRate,
    } = this.props.usr;

    return (
      <section className={styles.overview}>
        <h2>You can withdraw <b>{ formatCurrencyNumber(usdxBalance) }</b> USDx</h2>

        <p>USR balance: { formatCurrencyNumber(usrBalance) }</p>
        <p>1 USR = { exchangeRate } USDx</p>
        <p>USDx Annual Rate: { interestRate }%</p>
      </section>
    );
  }
}
