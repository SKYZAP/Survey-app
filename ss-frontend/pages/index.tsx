import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/global.css';
import 'antd/dist/antd.css';
import { MainScreen } from '../components/main-screen';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <MainScreen />;
}
