import { ArrowDownOutlined, ArrowUpOutlined, MinusOutlined } from '@ant-design/icons';
import { Card, Skeleton, Statistic, Typography } from 'antd';
import type { ReactNode } from 'react';
import styles from './KpiCard.module.css';

type TrendDirection = 'down' | 'neutral' | 'up';

type KpiCardProps = {
  description?: string;
  formatter?: (value: number | string) => ReactNode;
  loading?: boolean;
  status?: 'default' | 'negative' | 'positive';
  title: string;
  trend?: {
    direction: TrendDirection;
    value: string;
  };
  value: number | string;
};

const trendIcons: Record<TrendDirection, ReactNode> = {
  down: <ArrowDownOutlined />,
  neutral: <MinusOutlined />,
  up: <ArrowUpOutlined />,
};

const KpiCard = ({
  description,
  formatter,
  loading = false,
  status = 'default',
  title,
  trend,
  value,
}: KpiCardProps) => {
  if (loading) {
    return (
      <Card className={styles.root}>
        <Skeleton active paragraph={{ rows: 1 }} />
      </Card>
    );
  }

  return (
    <Card className={`${styles.root} ${styles[status]}`} size="small">
      <Statistic formatter={formatter} title={title} value={value} />
      {(trend || description) && (
        <div className={styles.footer}>
          {trend && (
            <span className={`${styles.trend} ${styles[status]}`}>
              {trendIcons[trend.direction]}
              {trend.value}
            </span>
          )}
          {description && <Typography.Text type="secondary">{description}</Typography.Text>}
        </div>
      )}
    </Card>
  );
};

export default KpiCard;
