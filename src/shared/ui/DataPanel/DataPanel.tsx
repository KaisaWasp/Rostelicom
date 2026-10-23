import { ExclamationCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Empty, Spin } from 'antd';
import type { ReactNode } from 'react';
import styles from './DataPanel.module.css';

type DataPanelProps = {
  children?: ReactNode;
  empty?: boolean;
  emptyDescription?: string;
  error?: string;
  loading?: boolean;
  onRetry?: () => void;
  title?: string;
  toolbar?: ReactNode;
  variant?: 'default' | 'tinted' | 'analytics';
};

const DataPanel = ({
  children,
  empty = false,
  emptyDescription = 'Данные для отображения отсутствуют.',
  error,
  loading = false,
  onRetry,
  title,
  toolbar,
  variant = 'default',
}: DataPanelProps) => {
  const panelTitle = title ? <span className={styles['panel-title']}>{title}</span> : undefined;

  return (
    <Card
      className={styles[variant]}
      title={panelTitle}
      extra={toolbar ? <span className={styles['panel-toolbar']}>{toolbar}</span> : undefined}
      variant="borderless"
    >
      {loading ? (
        <div className={styles.state}>
          <Spin aria-label="Загрузка данных" />
        </div>
      ) : null}
      {!loading && error ? (
        <Alert
          description={error}
          icon={<ExclamationCircleOutlined />}
          message="Не удалось загрузить данные"
          showIcon
          type="error"
          action={
            onRetry ? (
              <Button icon={<ReloadOutlined />} onClick={onRetry} size="small">
                Повторить
              </Button>
            ) : undefined
          }
        />
      ) : null}
      {!loading && !error && empty ? (
        <div className={styles.state}>
          <Empty description={emptyDescription} />
        </div>
      ) : null}
      {!loading && !error && !empty ? children : null}
    </Card>
  );
};

export default DataPanel;
