import type { Meta, StoryObj } from '@storybook/react';
import DataPanel from './DataPanel';

const meta = {
  title: 'Shared/DataPanel',
  component: DataPanel,
  args: {
    title: 'Динамика показателя',
  },
} satisfies Meta<typeof DataPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Содержимое таблицы, графика или карты.',
  },
};

export const Analytics: Story = {
  args: {
    children: 'Контрастная зона для карты или сложного графика.',
    variant: 'analytics',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    empty: true,
  },
};

export const Error: Story = {
  args: {
    error: 'Попробуйте обновить данные позже.',
    onRetry: () => undefined,
  },
};
