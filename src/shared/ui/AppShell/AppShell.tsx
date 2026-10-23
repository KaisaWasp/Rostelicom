import { MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Drawer, Grid, Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import type { ReactNode } from 'react';
import { useState } from 'react';
import styles from './AppShell.module.css';

type NavigationItem = {
  icon?: ReactNode;
  key: string;
  label: string;
};

type AppShellProps = {
  activeNavigationKey: string;
  brandSlot: ReactNode;
  children: ReactNode;
  headerActions?: ReactNode;
  navigationItems: NavigationItem[];
  onNavigate: (key: string) => void;
  title: string;
};

const AppShell = ({
  activeNavigationKey,
  brandSlot,
  children,
  headerActions,
  navigationItems,
  onNavigate,
  title,
}: AppShellProps) => {
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
  const screens = Grid.useBreakpoint();
  const isDesktop = Boolean(screens.lg);

  const menuItems: MenuProps['items'] = navigationItems.map(({ icon, key, label }) => ({
    icon,
    key,
    label,
  }));

  const handleNavigation: MenuProps['onClick'] = ({ key }) => {
    onNavigate(key);
    setIsMobileNavigationOpen(false);
  };

  const navigation = (
    <Menu
      className={styles.menu}
      items={menuItems}
      mode="inline"
      onClick={handleNavigation}
      selectedKeys={[activeNavigationKey]}
    />
  );

  return (
    <Layout className={styles.layout}>
      {isDesktop ? (
        <Layout.Sider className={styles.sider} theme="light" width={264}>
          <div className={styles.brand}>{brandSlot}</div>
          {navigation}
        </Layout.Sider>
      ) : (
        <Drawer
          aria-label="Основная навигация"
          className={styles.drawer}
          onClose={() => setIsMobileNavigationOpen(false)}
          open={isMobileNavigationOpen}
          placement="left"
          title={brandSlot}
          width={288}
        >
          {navigation}
        </Drawer>
      )}
      <Layout>
        <Layout.Header className={styles.header}>
          {!isDesktop && (
            <Button
              aria-label="Открыть основную навигацию"
              icon={<MenuUnfoldOutlined />}
              onClick={() => setIsMobileNavigationOpen(true)}
              type="text"
            />
          )}
          <div className={styles['header-title']}>{title}</div>
          <div className={styles['header-actions']}>{headerActions}</div>
        </Layout.Header>
        <Layout.Content className={styles.content}>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AppShell;
