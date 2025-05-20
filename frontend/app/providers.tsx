'use client';

import { ConfigProvider, App as AntdApp } from 'antd';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { store } from '../lib/redux/store';
import { theme } from '../lib/theme';

// Set dayjs locale
dayjs.locale('en');

export function Providers({ children }: { children: React.ReactNode }) {

  return (
    <Provider store={store}>
      <SessionProvider>
        <ConfigProvider theme={theme}>
          <AntdApp>{children}</AntdApp>
        </ConfigProvider>
      </SessionProvider>
    </Provider>
  );
}