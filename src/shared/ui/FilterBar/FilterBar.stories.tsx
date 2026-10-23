import type { Meta, StoryObj } from '@storybook/react';
import { Select } from 'antd';
import FilterBar from './FilterBar';

const meta = {
  title: 'Shared/FilterBar',
  component: FilterBar,
  args: {
    children: <Select aria-label="Регион" placeholder="Регион" style={{ minWidth: 180 }} />,
  },
} satisfies Meta<typeof FilterBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithActiveFilters: Story = {
  args: {
    activeCount: 2,
    onReset: () => undefined,
  },
};
