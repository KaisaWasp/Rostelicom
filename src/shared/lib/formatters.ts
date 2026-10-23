export type Money = {
  amountMinor: number;
  currency: 'RUB';
};

export type Percentage = {
  valueBps: number;
};

const currencyFormatter = new Intl.NumberFormat('ru-RU', {
  currency: 'RUB',
  maximumFractionDigits: 0,
  style: 'currency',
});

const percentageFormatter = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
});

export const formatMoney = ({ amountMinor }: Money) => {
  return currencyFormatter.format(amountMinor / 100);
};

export const formatPercentage = ({ valueBps }: Percentage) => {
  return `${percentageFormatter.format(valueBps / 100)}%`;
};

export const formatCompactMoney = ({ amountMinor }: Money) => {
  const amount = amountMinor / 100;

  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toLocaleString('ru-RU', { maximumFractionDigits: 1 })} млрд ₽`;
  }

  return `${(amount / 1_000_000).toLocaleString('ru-RU', { maximumFractionDigits: 1 })} млн ₽`;
};
