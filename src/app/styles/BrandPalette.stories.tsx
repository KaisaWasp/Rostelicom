import type { Meta, StoryObj } from '@storybook/react';
import styles from './BrandPalette.stories.module.css';

const colors = [
  { name: 'Rostelecom Purple', token: '--app-color-brand-primary', value: '#7700FF' },
  { name: 'Rostelecom Orange', token: '--app-color-brand-attention', value: '#FF4F12' },
  { name: 'Rostelecom Light Blue', token: '--app-color-brand-information', value: '#749FD6' },
  { name: 'Rostelecom Lavender', token: '--app-color-brand-selection', value: '#E8D2ED' },
  { name: 'Rostelecom Cool Grey', token: '--app-color-brand-neutral', value: '#E3E8EC' },
];

const meta = {
  title: 'Foundations/Brand palette',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <div className={styles.root}>
      <div>
        <h1 className={styles.title}>Палитра Ростелекома</h1>
        <p className={styles.description}>
          Фиолетовый — основной акцент. Оранжевый применяется точечно для приоритета.
        </p>
      </div>
      <div className={styles.grid}>
        {colors.map(({ name, token, value }) => (
          <article className={styles.card} key={token}>
            <div className={styles.swatch} style={{ backgroundColor: `var(${token})` }} />
            <strong>{name}</strong>
            <span>{value}</span>
          </article>
        ))}
      </div>
    </div>
  ),
};
