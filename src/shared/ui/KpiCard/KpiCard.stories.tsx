import type { Meta, StoryObj } from '@storybook/react';
import KpiCard from './KpiCard';

const meta = {
  title: 'Shared/KpiCard',
  component: KpiCard,
  args: {
    title: 'Потенциал рынка',
    value: '—',
  },
} satisfies Meta<typeof KpiCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const PositiveTrend: Story = {
  args: {
    status: 'positive',
    trend: { direction: 'up', value: '+12,4%' },
    value: 124000000,
  },
};

export const NegativeTrend: Story = {
  args: {
    status: 'negative',
    trend: { direction: 'down', value: '−4,8%' },
    value: 84000000,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};
