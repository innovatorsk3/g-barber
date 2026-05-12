'use client';

import { App as AntdApp, ConfigProvider } from 'antd';
import type { ThemeConfig } from 'antd';
import type { ReactNode } from 'react';

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#B91C1C',
    colorInfo: '#B91C1C',
    borderRadius: 16,
    fontFamily: 'Inter, system-ui, sans-serif',
    colorText: '#FAFAFA',
    colorTextBase: '#FAFAFA',
  },
  components: {
    Drawer: {
      colorBgElevated: '#09090B',
      colorText: '#FAFAFA',
      paddingLG: 0,
    },
    Button: {
      fontWeight: 600,
      controlHeight: 48,
    },
  },
};

export default function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider theme={theme}>
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
}
