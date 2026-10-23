import type { Meta, StoryObj } from '@storybook/react';
import LogoSlot from './LogoSlot';

const meta = {
  title: 'Shared/LogoSlot',
  component: LogoSlot,
} satisfies Meta<typeof LogoSlot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {};

export const WithProvidedAsset: Story = {
  args: {
    children: <strong>Оригинальный логотип</strong>,
  },
};
