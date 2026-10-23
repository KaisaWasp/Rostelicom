import type { Preview } from '@storybook/react';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import type { ReactNode } from 'react';
import { antdTheme } from '../src/shared/config/antd-theme';
import '../src/app/styles/index.css';

const withApplicationTheme = (story: () => ReactNode) => {
  return (
    <ConfigProvider locale={ruRU} theme={antdTheme}>
      {story()}
    </ConfigProvider>
  );
};

const preview: Preview = {
  decorators: [withApplicationTheme],
  parameters: {
    controls: {
      expanded: true,
    },
    layout: 'padded',
  },
};

export default preview;
