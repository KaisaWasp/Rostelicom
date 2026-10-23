import { DownloadOutlined, SaveOutlined } from '@ant-design/icons';
import { Alert, Button, Select, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { DataPanel, FilterBar, KpiCard, PageHeader } from '@shared/ui';
import { formatCompactMoney, formatMoney, formatPercentage } from '@shared/lib';
import { marketRadarMock, type MarketOrganization } from '../model/mock-data';
import pageStyles from '@shared/styles/page-layout.module.css';
import styles from './MarketRadarPage.module.css';

const statusLabels = {
  client: 'Действующий клиент',
  prospect: 'Потенциальный клиент',
  unknown: 'Нет данных',
} as const;

const statusColors = {
  client: 'success',
  prospect: 'purple',
  unknown: 'default',
} as const;

const organizationColumns: ColumnsType<MarketOrganization> = [
  { dataIndex: 'name', fixed: 'left', key: 'name', title: 'Организация', width: 200 },
  { dataIndex: 'industry', key: 'industry', title: 'Отрасль', width: 150 },
  { dataIndex: 'region', key: 'region', title: 'Регион', width: 150 },
  {
    dataIndex: 'revenue',
    key: 'revenue',
    render: (value) => formatCompactMoney(value),
    title: 'Выручка',
    width: 140,
  },
  {
    dataIndex: 'revenueGrowth',
    key: 'growth',
    render: (value) => formatPercentage(value),
    title: 'Динамика',
    width: 120,
  },
  {
    dataIndex: 'status',
    key: 'status',
    render: (value) => <Tag color={statusColors[value]}>{statusLabels[value]}</Tag>,
    title: 'Статус',
    width: 180,
  },
  {
    dataIndex: 'potential',
    key: 'potential',
    render: (value) => formatCompactMoney(value),
    title: 'Потенциал',
    width: 140,
  },
];

const MarketRadarPage = () => {
  const [selectedPointId, setSelectedPointId] = useState(marketRadarMock.points[0].id);
  const selectedPoint =
    marketRadarMock.points.find(({ id }) => id === selectedPointId) ?? marketRadarMock.points[0];

  return (
    <main className={pageStyles.page}>
      <PageHeader
        actions={
          <>
            <Button icon={<DownloadOutlined />}>Экспорт CSV</Button>
            <Button icon={<SaveOutlined />} type="primary">
              Сохранить представление
            </Button>
          </>
        }
        subtitle="Находите точки роста и приоритизируйте организации в выбранной территории."
        title="Радар присутствия"
      />
      <Alert
        className={pageStyles['demo-notice']}
        message="Демонстрационные данные"
        showIcon
        type="info"
      />
      <FilterBar activeCount={3} onReset={() => undefined}>
        <Select
          defaultValue="all"
          options={[
            { label: 'Все регионы', value: 'all' },
            { label: 'Москва', value: 'moscow' },
          ]}
          style={{ minWidth: 152 }}
        />
        <Select
          defaultValue="industry"
          options={[
            { label: 'Промышленность', value: 'industry' },
            { label: 'Логистика', value: 'logistics' },
          ]}
          style={{ minWidth: 176 }}
        />
        <Select
          defaultValue="growth"
          options={[
            { label: 'Рост выручки', value: 'growth' },
            { label: 'Снижение выручки', value: 'decline' },
          ]}
          style={{ minWidth: 168 }}
        />
      </FilterBar>
      <div className={pageStyles['kpi-grid']}>
        <KpiCard
          description="в текущей выборке"
          title="Организаций"
          value={marketRadarMock.kpis.organizations}
        />
        <KpiCard
          status="positive"
          title="Потенциальных клиентов"
          trend={{ direction: 'up', value: '8,6%' }}
          value={marketRadarMock.kpis.prospects}
        />
        <KpiCard
          description="территории без покрытия"
          status="negative"
          title="Белые пятна"
          trend={{ direction: 'up', value: 'Требуют внимания' }}
          value={marketRadarMock.kpis.whiteSpots}
        />
        <KpiCard
          status="positive"
          title="Средний рост выручки"
          trend={{ direction: 'up', value: 'Год к году' }}
          value={formatPercentage(marketRadarMock.kpis.averageGrowth)}
        />
      </div>
      <div className={pageStyles['split-grid']}>
        <DataPanel
          title="Карта возможностей"
          toolbar={<span className={styles.updated}>Обновлено 20 октября</span>}
          variant="analytics"
        >
          <div className={styles.map}>
            <div className={styles['map-caption']}>Схема распределения возможностей</div>
            {marketRadarMock.points.map((point) => (
              <Tooltip key={point.id} title={`${point.label}: ${formatMoney(point.potential)}`}>
                <button
                  aria-label={`${point.label}, ${point.organizations} организаций`}
                  className={`${styles.marker} ${selectedPointId === point.id ? styles['marker-selected'] : ''}`}
                  onClick={() => setSelectedPointId(point.id)}
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  type="button"
                >
                  <span>{point.organizations}</span>
                </button>
              </Tooltip>
            ))}
            <div className={styles['map-legend']}>
              <span>Выбрано: {selectedPoint.label}</span>
              <span>{formatCompactMoney(selectedPoint.potential)}</span>
            </div>
          </div>
        </DataPanel>
        <DataPanel title="Приоритетные территории" variant="tinted">
          <div className={styles['territory-list']}>
            {marketRadarMock.points.map((point, index) => (
              <button
                className={styles.territory}
                key={point.id}
                onClick={() => setSelectedPointId(point.id)}
                type="button"
              >
                <span className={styles.rank}>{index + 1}</span>
                <span>
                  <strong>{point.label}</strong>
                  <small>{point.organizations} организаций</small>
                </span>
                <strong>{formatCompactMoney(point.potential)}</strong>
              </button>
            ))}
          </div>
        </DataPanel>
      </div>
      <DataPanel title="Организации в выборке">
        <div className={pageStyles['table-scroll']}>
          <Table
            columns={organizationColumns}
            dataSource={marketRadarMock.organizations}
            pagination={false}
            rowKey="id"
            scroll={{ x: 1050 }}
            size="middle"
          />
        </div>
      </DataPanel>
    </main>
  );
};

export default MarketRadarPage;
