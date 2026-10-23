import { FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import type { ReactNode } from 'react';
import styles from './FilterBar.module.css';

type FilterBarProps = {
  activeCount?: number;
  children: ReactNode;
  onReset?: () => void;
  trailing?: ReactNode;
};

const FilterBar = ({ activeCount = 0, children, onReset, trailing }: FilterBarProps) => {
  return (
    <section aria-label="Фильтры" className={styles.root}>
      <div className={styles.content}>{children}</div>
      <Space className={styles.actions} size={8}>
        {activeCount > 0 && <span className={styles.counter}>{activeCount}</span>}
        {onReset && (
          <Button icon={<ReloadOutlined />} onClick={onReset} type="text">
            Сбросить
          </Button>
        )}
        {trailing ?? <FilterOutlined aria-hidden />}
      </Space>
    </section>
  );
};

export default FilterBar;
