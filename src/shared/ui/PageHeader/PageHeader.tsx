import { Breadcrumb, Skeleton } from 'antd';
import type { BreadcrumbProps } from 'antd';
import type { ReactNode } from 'react';
import styles from './PageHeader.module.css';

type PageHeaderProps = {
  actions?: ReactNode;
  breadcrumbs?: BreadcrumbProps['items'];
  extra?: ReactNode;
  loading?: boolean;
  subtitle?: string;
  title: string;
};

const PageHeader = ({
  actions,
  breadcrumbs,
  extra,
  loading = false,
  subtitle,
  title,
}: PageHeaderProps) => {
  if (loading) {
    return <Skeleton active paragraph={{ rows: 1 }} title={{ width: '32%' }} />;
  }

  return (
    <header className={styles.root}>
      <div className={styles.main}>
        {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
        <div>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>
      {(actions || extra) && (
        <div className={styles.actions}>
          {extra}
          {actions}
        </div>
      )}
    </header>
  );
};

export default PageHeader;
