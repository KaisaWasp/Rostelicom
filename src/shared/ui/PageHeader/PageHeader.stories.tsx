import { PlusOutlined } from '@ant-design/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'antd';
import PageHeader from './PageHeader';

const meta = {
  title: 'Shared/PageHeader',
  component: PageHeader,
  args: {
    title: 'Инвестиционный навигатор',
  },
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithContext: Story = {
  args: {
    actions: (
      <Button icon={<PlusOutlined />} type="primary">
        Создать подборку
      </Button>
    ),
    breadcrumbs: [{ title: 'Главная' }, { title: 'Инвестиционный навигатор' }],
    subtitle: 'Поиск и мониторинг инвестиционных проектов.',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};
