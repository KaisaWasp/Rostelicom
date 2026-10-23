import { AimOutlined, CalculatorOutlined, ProjectOutlined } from '@ant-design/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Select } from 'antd';
import { AppShell, DataPanel, FilterBar, KpiCard, LogoSlot, PageHeader } from '@shared/ui';

const navigationItems = [
  { icon: <AimOutlined />, key: 'market-radar', label: 'Радар присутствия' },
  { icon: <ProjectOutlined />, key: 'investment-navigator', label: 'Инвестиционный навигатор' },
  { icon: <CalculatorOutlined />, key: 'deal-calculator', label: 'Калькулятор сделок' },
];

const meta = {
  title: 'Templates/Workspaces',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const AnalyticsWorkspace: Story = {
  render: () => (
    <AppShell
      activeNavigationKey="market-radar"
      brandSlot={<LogoSlot />}
      navigationItems={navigationItems}
      onNavigate={() => undefined}
      title="Радар присутствия"
    >
      <PageHeader
        actions={<Button type="primary">Сохранить подборку</Button>}
        subtitle="Композиционный шаблон рабочего пространства аналитика."
        title="Радар присутствия"
      />
      <div style={{ display: 'grid', gap: 16, maxWidth: 1600, margin: '0 auto' }}>
        <FilterBar activeCount={2} onReset={() => undefined}>
          <Select aria-label="Регион" placeholder="Регион" style={{ minWidth: 180 }} />
          <Select aria-label="Отрасль" placeholder="Отрасль" style={{ minWidth: 180 }} />
        </FilterBar>
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
          <KpiCard title="Показатель 1" value="—" />
          <KpiCard title="Показатель 2" value="—" />
          <KpiCard title="Показатель 3" value="—" />
        </div>
        <DataPanel title="Аналитическая область" variant="analytics">
          <div style={{ minHeight: 320 }}>Карта или сложный график</div>
        </DataPanel>
      </div>
    </AppShell>
  ),
};

export const FormWorkspace: Story = {
  render: () => (
    <AppShell
      activeNavigationKey="deal-calculator"
      brandSlot={<LogoSlot />}
      navigationItems={navigationItems}
      onNavigate={() => undefined}
      title="Калькулятор сделок"
    >
      <PageHeader
        subtitle="Композиционный шаблон сценарной рабочей области."
        title="Калькулятор сделок"
      />
      <div style={{ display: 'grid', gap: 16, maxWidth: 1600, margin: '0 auto' }}>
        <DataPanel title="Параметры расчёта">Будущая форма расчёта</DataPanel>
        <DataPanel title="Предварительный результат" />
      </div>
    </AppShell>
  ),
};
