import {
  AimOutlined,
  BellOutlined,
  CalculatorOutlined,
  ProjectOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Button, Input, Space } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '@shared/config/routes';
import { AppShell, LogoSlot } from '@shared/ui';
import styles from './AppLayout.module.css';

const pageTitles: Record<string, string> = {
  [APP_ROUTES.dashboard]: 'Главная',
  [APP_ROUTES.marketRadar]: 'Радар присутствия',
  [APP_ROUTES.investmentNavigator]: 'Инвестиционный навигатор',
  [APP_ROUTES.dealCalculator]: 'Калькулятор сделок',
};

const navigationItems = [
  { icon: <AimOutlined />, key: APP_ROUTES.marketRadar, label: 'Радар присутствия' },
  {
    icon: <ProjectOutlined />,
    key: APP_ROUTES.investmentNavigator,
    label: 'Инвестиционный навигатор',
  },
  { icon: <CalculatorOutlined />, key: APP_ROUTES.dealCalculator, label: 'Калькулятор сделок' },
];

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeNavigationKey = navigationItems.some(({ key }) => key === location.pathname)
    ? location.pathname
    : APP_ROUTES.marketRadar;

  return (
    <AppShell
      activeNavigationKey={activeNavigationKey}
      brandSlot={<LogoSlot />}
      headerActions={
        <Space size={8}>
          <Input className={styles.search} placeholder="Поиск" prefix={<SearchOutlined />} />
          <Badge count={3} size="small">
            <Button aria-label="Уведомления" icon={<BellOutlined />} type="text" />
          </Badge>
          <Avatar icon={<UserOutlined />} />
        </Space>
      }
      navigationItems={navigationItems}
      onNavigate={navigate}
      title={pageTitles[location.pathname] ?? 'Аналитическая платформа'}
    >
      <Outlet />
    </AppShell>
  );
};

export default AppLayout;
