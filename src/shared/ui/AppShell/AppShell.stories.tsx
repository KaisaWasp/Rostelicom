import { AimOutlined, CalculatorOutlined, ProjectOutlined } from '@ant-design/icons';
import type { Meta, StoryObj } from '@storybook/react';
import AppShell from './AppShell';

const meta = {
  title: 'Shared/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    activeNavigationKey: 'market-radar',
    brandSlot: <strong>LogoSlot</strong>,
    navigationItems: [
      { icon: <AimOutlined />, key: 'market-radar', label: 'Радар присутствия' },
      { icon: <ProjectOutlined />, key: 'investment-navigator', label: 'Инвестиционный навигатор' },
      { icon: <CalculatorOutlined />, key: 'deal-calculator', label: 'Калькулятор сделок' },
    ],
    onNavigate: () => undefined,
    title: 'Радар присутствия',
  },
  render: (args) => (
    <AppShell {...args}>
      <div style={{ minHeight: 480 }}>Рабочая область страницы</div>
    </AppShell>
  ),
} satisfies Meta<typeof AppShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
