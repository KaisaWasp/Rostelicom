import { AimOutlined, CalculatorOutlined, ProjectOutlined } from '@ant-design/icons';
import { AppShell, LogoSlot } from '@shared/ui';
import type { ReactNode } from 'react';

const navigationItems = [
  { icon: <AimOutlined />, key: 'market-radar', label: 'Радар присутствия' },
  { icon: <ProjectOutlined />, key: 'investment-navigator', label: 'Инвестиционный навигатор' },
  { icon: <CalculatorOutlined />, key: 'deal-calculator', label: 'Калькулятор сделок' },
];

type PlatformStoryShellProps = {
  activeNavigationKey: string;
  children: ReactNode;
  title: string;
};

const PlatformStoryShell = ({ activeNavigationKey, children, title }: PlatformStoryShellProps) => {
  return (
    <AppShell
      activeNavigationKey={activeNavigationKey}
      brandSlot={<LogoSlot />}
      headerActions={<span>Демо-профиль</span>}
      navigationItems={navigationItems}
      onNavigate={() => undefined}
      title={title}
    >
      {children}
    </AppShell>
  );
};

export default PlatformStoryShell;
