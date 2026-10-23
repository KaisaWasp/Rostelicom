import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#7700FF',
    colorInfo: '#749FD6',
    colorLink: '#7700FF',
    colorWarning: '#FF4F12',
    colorBgBase: '#FFFFFF',
    colorBgContainer: '#FFFFFF',
    colorBgElevated: '#FFFFFF',
    colorBgLayout: '#F7F6FA',
    colorFillAlter: '#F0EDF6',
    colorText: '#172033',
    colorTextSecondary: '#667085',
    colorBorder: '#E3E8EC',
    colorBorderSecondary: '#EEF0F3',
    borderRadius: 14,
    borderRadiusLG: 20,
    boxShadowTertiary: '0 10px 28px rgba(40, 26, 61, 0.07)',
    controlHeight: 40,
    fontFamily: 'Inter, Arial, sans-serif',
  },
  components: {
    Button: {
      borderRadius: 8,
      fontWeight: 600,
    },
    Card: {
      borderRadiusLG: 16,
      headerBg: 'transparent',
    },
    Menu: {
      itemBorderRadius: 8,
      itemHeight: 44,
      itemSelectedBg: '#E8D2ED',
      itemSelectedColor: '#7700FF',
    },
    Table: {
      headerBg: '#F0EDF6',
      headerColor: '#4A4354',
      headerSplitColor: 'transparent',
    },
  },
};
