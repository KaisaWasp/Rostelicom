import type { Money, Percentage } from '@shared/lib';

export type CalculationItem = {
  category: string;
  id: string;
  name: string;
  quantity: number;
  total: Money;
  unit: string;
};

export const dealCalculatorMock = {
  analogs: [
    {
      completedAt: '2025-11-20',
      id: 'analog-1',
      industry: 'Промышленность',
      price: { amountMinor: 1980000000, currency: 'RUB' } as Money,
      region: 'Республика Татарстан',
      similarity: { valueBps: 9100 } as Percentage,
      title: 'Цифровая инфраструктура производственной площадки',
    },
    {
      completedAt: '2025-08-14',
      id: 'analog-2',
      industry: 'Логистика',
      price: { amountMinor: 2140000000, currency: 'RUB' } as Money,
      region: 'Московская область',
      similarity: { valueBps: 8400 } as Percentage,
      title: 'Комплекс автоматизации распределительного центра',
    },
    {
      completedAt: '2025-05-03',
      id: 'analog-3',
      industry: 'Промышленность',
      price: { amountMinor: 1870000000, currency: 'RUB' } as Money,
      region: 'Свердловская область',
      similarity: { valueBps: 7900 } as Percentage,
      title: 'Модернизация ИТ-контура предприятия',
    },
  ],
  dataLabel: 'Демонстрационные данные',
  factors: {
    regional: { valueBps: 300 } as Percentage,
    uniqueness: { valueBps: 500 } as Percentage,
    urgency: { valueBps: 800 } as Percentage,
  },
  isMock: true as const,
  items: [
    {
      category: 'Работы',
      id: 'item-1',
      name: 'Обследование площадки',
      quantity: 160,
      total: { amountMinor: 320000000, currency: 'RUB' } as Money,
      unit: 'час',
    },
    {
      category: 'Оборудование',
      id: 'item-2',
      name: 'Сетевое оборудование',
      quantity: 18,
      total: { amountMinor: 840000000, currency: 'RUB' } as Money,
      unit: 'шт.',
    },
    {
      category: 'ПО',
      id: 'item-3',
      name: 'Лицензии ПО',
      quantity: 18,
      total: { amountMinor: 460000000, currency: 'RUB' } as Money,
      unit: 'шт.',
    },
    {
      category: 'Работы',
      id: 'item-4',
      name: 'Монтаж и пусконаладка',
      quantity: 280,
      total: { amountMinor: 320000000, currency: 'RUB' } as Money,
      unit: 'час',
    },
    {
      category: 'Сервис',
      id: 'item-5',
      name: 'Сопровождение',
      quantity: 12,
      total: { amountMinor: 120000000, currency: 'RUB' } as Money,
      unit: 'мес.',
    },
  ] satisfies CalculationItem[],
  range: {
    maximum: { amountMinor: 2280000000, currency: 'RUB' } as Money,
    minimum: { amountMinor: 1840000000, currency: 'RUB' } as Money,
    target: { amountMinor: 2060000000, currency: 'RUB' } as Money,
  },
};
