import type { PropsWithChildren } from 'react';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { antdTheme } from '@shared/config/antd-theme';
import { store } from '@app/store/store';

const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider locale={ruRU} theme={antdTheme}>
          {children}
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default AppProviders;
