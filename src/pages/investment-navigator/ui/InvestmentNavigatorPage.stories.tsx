import type { Meta, StoryObj } from '@storybook/react';
import PlatformStoryShell from '@app/stories/PlatformStoryShell';
import InvestmentNavigatorPage from './InvestmentNavigatorPage';

const meta = {
  title: 'Pages/Investment navigator',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PlatformStoryShell activeNavigationKey="investment-navigator" title="Инвестиционный навигатор">
      <InvestmentNavigatorPage />
    </PlatformStoryShell>
  ),
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
