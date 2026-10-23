import type { Meta, StoryObj } from '@storybook/react';
import PlatformStoryShell from '@app/stories/PlatformStoryShell';
import DealCalculatorPage from './DealCalculatorPage';

const meta = {
  title: 'Pages/Deal calculator',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PlatformStoryShell activeNavigationKey="deal-calculator" title="Калькулятор сделок">
      <DealCalculatorPage />
    </PlatformStoryShell>
  ),
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const FilledCalculation: Story = {};
