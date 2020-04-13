import React, { Component } from 'react';
import styles from './index.less';
import { message, Dropdown, Menu } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const iconTwitter = require('@assets/icon_twitter.svg');
const iconTelegram = require('@assets/icon_telegram.svg');
const iconMedium = require('@assets/icon_medium.svg');
const iconReddit = require('@assets/icon_reddit.svg');
const iconDiscord = require('@assets/icon_discord.svg');
const iconLinkedin = require('@assets/icon_linkedin.svg');
const iconYoutube = require('@assets/icon_youtube.svg');

export default class PageFooter extends Component {
  render() {
    return (
      <div className={styles.footer}>
        <section className={styles.footer__link}>
          <h2>Resource</h2>
          <a href="https://github.com/dforce-network/USR">GitHub</a>
          <a href="/">FAQ</a>
        </section>

        <section className={styles.footer__community}>
          <h2>Community</h2>
          <div>
            <a href="https://twitter.com/dForcenet" target="_blank">
              <img src={iconTwitter} alt="twitter" />
            </a>
            <a href="https://t.me/dforcenet" target="_blank">
              <img src={iconTelegram} alt="telegram" />
            </a>
            <a href="https://medium.com/dforcenet" target="_blank">
              <img src={iconMedium} alt="medium" />
            </a>
            <a href="https://www.reddit.com/r/dForceNetwork" target="_blank">
              <img src={iconReddit} alt="reddit" />
            </a>
            <a href="https://discord.gg/Gbtd3MR" target="_blank">
              <img src={iconDiscord} alt="discord" />
            </a>
            <a href="https://www.linkedin.com/company/dforce-network" target="_blank">
              <img src={iconLinkedin} alt="linkedin" />
            </a>
            <a href="https://www.youtube.com/channel/UCM6Vgoc-BhFGG11ZndUr6Ow" target="_blank">
              <img src={iconYoutube} alt="youtube" />
            </a>
          </div>

          <Dropdown
            overlay={(
              <Menu style={{ width: '100px' }}>
                <Menu.Item>中文</Menu.Item>
              </Menu>
            )}
          >
            <a href="/">English</a>
          </Dropdown>
        </section>

        <section className={styles.footer__email}>
          <h2>Contact</h2>
          <CopyToClipboard
            text={'contacts@dforce.network'}
            onCopy={() => {
              message.success('Copied', 4);
            }}
          >
            <span>contacts@dforce.network</span>
          </CopyToClipboard>
          <CopyToClipboard
            text={'bd@dforce.network'}
            onCopy={() => {
              message.success('Copied', 4);
            }}
          >
            <span>bd@dforce.network</span>
          </CopyToClipboard>
          <CopyToClipboard
            text={'tech@dforce.network'}
            onCopy={() => {
              message.success('Copied', 4);
            }}
          >
            <span>tech@dforce.network</span>
          </CopyToClipboard>
        </section>
      </div>
    )
  };
}
