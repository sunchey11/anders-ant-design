/* eslint-disable class-methods-use-this */
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { IntlProvider } from 'react-intl';
import { presetPalettes, presetDarkPalettes } from '@ant-design/colors';
import themeSwitcher from 'theme-switcher';
import type { TwoToneColor } from '@ant-design/icons';
import { setTwoToneColor } from '@ant-design/icons';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ConfigProvider } from 'antd';
import { browserHistory } from 'bisheng/router';
import zhCN from 'antd/lib/locale/zh_CN';
import type { DirectionType } from 'antd/es/config-provider';
import Header from './Header';
import type { SiteContextProps } from './SiteContext';
import SiteContext from './SiteContext';
import enLocale from '../../en-US';
import cnLocale from '../../zh-CN';
import * as utils from '../utils';
import 'moment/locale/zh-cn';
import { ButtonSample } from '../anders/buttons/ButtonSample';
import { MainMenu } from '../anders/menu/MainMenu';

if (typeof window !== 'undefined' && navigator.serviceWorker) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => registration.unregister());
  });
}

if (typeof window !== 'undefined') {
  // Redirect to `ant.design` if is not next version anymore
  if (location.hostname === 'next.ant.design') {
    location.href = location.href.replace('next.ant.design', 'ant.design');
  }

  // eslint-disable-next-line global-require
  require('../../static/style');

  // Expose to iframe
  (window as any).react = React;
  (window as any)['react-dom'] = ReactDOM;
  // eslint-disable-next-line global-require
  (window as any).antd = require('antd');
  // eslint-disable-next-line global-require
  (window as any)['@ant-design/icons'] = require('@ant-design/icons');

  // Error log statistic
  window.addEventListener('error', e => {
    // Ignore ResizeObserver error
    if (e.message === 'ResizeObserver loop limit exceeded') {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  });
}

const RESPONSIVE_MOBILE = 768;

// for dark.css timestamp to remove cache
const timestamp = Date.now();
const themeMap = {
  dark: `/dark.css?${timestamp}`,
  compact: `/compact.css?${timestamp}`,
};
const themeConfig = {
  themeMap,
};
const { switcher } = themeSwitcher(themeConfig);

interface LayoutPropsType {
  location: any;
  router: any;
  helmetContext: any;
  children: React.ReactNode;
}

interface LayoutStateType {
  appLocale: typeof cnLocale | typeof enLocale;
  theme: string;
  isMobile: boolean;
  direction: DirectionType;
  setTheme: SiteContextProps['setTheme'];
  setIframeTheme: SiteContextProps['setIframeTheme'];
}

export default class Layout extends React.Component<LayoutPropsType, LayoutStateType> {
  static contextType = SiteContext;

  timer: NodeJS.Timeout | null = null;

  isBeforeComponent = false;

  constructor(props: LayoutPropsType) {
    super(props);

  
  }

  render() {
    const { children, helmetContext = {}, ...restProps } = this.props;
    const strs = this.props.location.pathname.split('components/');
    if (strs.length < 2) {
      throw new Error('path must start with components');
    }
    // pathname为'components/uuv/'时，sampleName为uuv
    let sampleName: string = strs[1];
    if (sampleName.endsWith('/')) {
      sampleName = sampleName.substring(0, sampleName.length - 1);
    }
    return <MainMenu sampleName={sampleName}></MainMenu>;

  }
}
