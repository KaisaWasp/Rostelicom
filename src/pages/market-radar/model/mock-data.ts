import type { Money, Percentage } from '@shared/lib';

export type MarketOrganization = {
  id: string;
  industry: string;
  name: string;
  potential: Money;
  region: string;
  revenue: Money;
  revenueGrowth: Percentage;
  status: 'client' | 'prospect' | 'unknown';
};

export type MarketPoint = {
  id: string;
  label: string;
  organizations: number;
  potential: Money;
  x: number;
  y: number;
};

export const marketRadarMock = {
  dataLabel: 'Демонстрационные данные',
  isMock: true as const,
  kpis: {
    averageGrowth: { valueBps: 1240 },
    organizations: 1248,
    prospects: 386,
    whiteSpots: 42,
  },
  organizations: [
    {
      id: 'org-01',
      industry: 'Промышленность',
      name: 'Организация А',
      potential: { amountMinor: 4850000000, currency: 'RUB' },
      region: 'Москва',
      revenue: { amountMinor: 124000000000, currency: 'RUB' },
      revenueGrowth: { valueBps: 1520 },
      status: 'prospect',
    },
    {
      id: 'org-02',
      industry: 'Логистика',
      name: 'Организация Б',
      potential: { amountMinor: 3280000000, currency: 'RUB' },
      region: 'Санкт-Петербург',
      revenue: { amountMinor: 86000000000, currency: 'RUB' },
      revenueGrowth: { valueBps: 940 },
      status: 'client',
    },
    {
      id: 'org-03',
      industry: 'Девелопмент',
      name: 'Организация В',
      potential: { amountMinor: 2120000000, currency: 'RUB' },
      region: 'Казань',
      revenue: { amountMinor: 64300000000, currency: 'RUB' },
      revenueGrowth: { valueBps: 1210 },
      status: 'prospect',
    },
    {
      id: 'org-04',
      industry: 'Ритейл',
      name: 'Организация Г',
      potential: { amountMinor: 1760000000, currency: 'RUB' },
      region: 'Екатеринбург',
      revenue: { amountMinor: 58900000000, currency: 'RUB' },
      revenueGrowth: { valueBps: 680 },
      status: 'unknown',
    },
    {
      id: 'org-05',
      industry: 'Промышленность',
      name: 'Организация Д',
      potential: { amountMinor: 1540000000, currency: 'RUB' },
      region: 'Новосибирск',
      revenue: { amountMinor: 52100000000, currency: 'RUB' },
      revenueGrowth: { valueBps: 1130 },
      status: 'prospect',
    },
  ] satisfies MarketOrganization[],
  points: [
    {
      id: 'moscow',
      label: 'Москва',
      organizations: 356,
      potential: { amountMinor: 12600000000, currency: 'RUB' },
      x: 24,
      y: 42,
    },
    {
      id: 'spb',
      label: 'Санкт-Петербург',
      organizations: 198,
      potential: { amountMinor: 8400000000, currency: 'RUB' },
      x: 18,
      y: 28,
    },
    {
      id: 'kazan',
      label: 'Казань',
      organizations: 172,
      potential: { amountMinor: 5100000000, currency: 'RUB' },
      x: 44,
      y: 54,
    },
    {
      id: 'ekb',
      label: 'Екатеринбург',
      organizations: 221,
      potential: { amountMinor: 4600000000, currency: 'RUB' },
      x: 64,
      y: 58,
    },
    {
      id: 'nsk',
      label: 'Новосибирск',
      organizations: 143,
      potential: { amountMinor: 3300000000, currency: 'RUB' },
      x: 82,
      y: 68,
    },
  ] satisfies MarketPoint[],
  updatedAt: '2026-10-20T09:30:00+03:00',
};
