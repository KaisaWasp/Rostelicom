import type { Meta, StoryObj } from '@storybook/react';
import PlatformStoryShell from '@app/stories/PlatformStoryShell';
import MarketRadarPage from './MarketRadarPage';

const meta = {
  title: 'Pages/Market radar',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PlatformStoryShell activeNavigationKey="market-radar" title="Радар присутствия">
      <MarketRadarPage />
    </PlatformStoryShell>
  ),
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
