import type { Money } from '@shared/lib';

export type InvestmentProject = {
  budget: Money;
  completionDate: string;
  id: string;
  industry: string;
  initiator: string;
  needs: string[];
  region: string;
  score: number;
  stage: 'planning' | 'design' | 'construction' | 'commissioning';
  title: string;
};

export const stageLabels = {
  commissioning: 'Ввод в эксплуатацию',
  construction: 'Строительство',
  design: 'Проектирование',
  planning: 'Планирование',
} as const;

export const investmentNavigatorMock = {
  dataLabel: 'Демонстрационные данные',
  isMock: true as const,
  events: [
    {
      date: '2026-10-18',
      project: 'Индустриальный парк «Вектор»',
      title: 'Опубликована проектная документация',
      type: 'Событие',
    },
    {
      date: '2026-10-13',
      project: 'Городской логистический хаб',
      title: 'Открыт приём заявок на поставку',
      type: 'Тендер',
    },
    {
      date: '2026-10-08',
      project: 'Технопарк «Север»',
      title: 'Начат строительный этап',
      type: 'Событие',
    },
  ],
  kpis: {
    construction: 58,
    digitalNeeds: 91,
    investment: { amountMinor: 4860000000000, currency: 'RUB' } as Money,
    projects: 164,
  },
  projects: [
    {
      budget: { amountMinor: 1240000000000, currency: 'RUB' },
      completionDate: '2028-12-01',
      id: 'project-1',
      industry: 'Промышленность',
      initiator: 'ООО «Вектор Девелопмент»',
      needs: ['Каналы связи', 'АСУ ТП', 'Кибербезопасность'],
      region: 'Республика Татарстан',
      score: 92,
      stage: 'construction',
      title: 'Индустриальный парк «Вектор»',
    },
    {
      budget: { amountMinor: 870000000000, currency: 'RUB' },
      completionDate: '2027-06-15',
      id: 'project-2',
      industry: 'Логистика',
      initiator: 'АО «Региональные терминалы»',
      needs: ['Облако', 'Видеонаблюдение'],
      region: 'Московская область',
      score: 86,
      stage: 'design',
      title: 'Городской логистический хаб',
    },
    {
      budget: { amountMinor: 640000000000, currency: 'RUB' },
      completionDate: '2027-11-30',
      id: 'project-3',
      industry: 'Технологии',
      initiator: 'АНО «Технопарк Север»',
      needs: ['Каналы связи', 'Кибербезопасность'],
      region: 'Санкт-Петербург',
      score: 81,
      stage: 'planning',
      title: 'Технопарк «Север»',
    },
    {
      budget: { amountMinor: 510000000000, currency: 'RUB' },
      completionDate: '2026-12-20',
      id: 'project-4',
      industry: 'Девелопмент',
      initiator: 'ООО «Новый квартал»',
      needs: ['Видеонаблюдение', 'Облако'],
      region: 'Свердловская область',
      score: 74,
      stage: 'commissioning',
      title: 'Цифровой квартал «Восток»',
    },
  ] satisfies InvestmentProject[],
};
