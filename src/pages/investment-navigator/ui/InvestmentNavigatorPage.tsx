import { BellOutlined, DownloadOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Alert, Button, Drawer, List, Progress, Select, Table, Tag, Timeline } from 'antd';
import { useState } from 'react';
import { DataPanel, FilterBar, KpiCard, PageHeader } from '@shared/ui';
import { formatCompactMoney } from '@shared/lib';
import { investmentNavigatorMock, stageLabels, type InvestmentProject } from '../model/mock-data';
import pageStyles from '@shared/styles/page-layout.module.css';
import styles from './InvestmentNavigatorPage.module.css';

const stageColors = {
  commissioning: 'green',
  construction: 'orange',
  design: 'purple',
  planning: 'blue',
} as const;

const InvestmentNavigatorPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<InvestmentProject>(
    investmentNavigatorMock.projects[0],
  );

  const selectProject = (project: InvestmentProject) => {
    setSelectedProject(project);
  };

  return (
    <main className={pageStyles.page}>
      <PageHeader
        actions={
          <>
            <Button icon={<DownloadOutlined />}>Экспорт</Button>
            <Button icon={<BellOutlined />} type="primary">
              Создать подписку
            </Button>
          </>
        }
        subtitle="Отслеживайте проекты и потребности в цифровой инфраструктуре."
        title="Инвестиционный навигатор"
      />
      <Alert
        className={pageStyles['demo-notice']}
        message="Демонстрационные данные"
        showIcon
        type="info"
      />
      <FilterBar activeCount={4} onReset={() => undefined}>
        <Select
          defaultValue="all"
          options={[
            { label: 'Все регионы', value: 'all' },
            { label: 'Республика Татарстан', value: 'tatarstan' },
          ]}
          style={{ minWidth: 172 }}
        />
        <Select
          defaultValue="construction"
          options={[
            { label: 'Все стадии', value: 'all' },
            { label: 'Строительство', value: 'construction' },
          ]}
          style={{ minWidth: 164 }}
        />
        <Select
          defaultValue="digital"
          options={[
            { label: 'Цифровые потребности', value: 'digital' },
            { label: 'АСУ ТП', value: 'asup' },
          ]}
          style={{ minWidth: 196 }}
        />
      </FilterBar>
      <div className={pageStyles['kpi-grid']}>
        <KpiCard
          description="в текущей выборке"
          title="Активных проектов"
          value={investmentNavigatorMock.kpis.projects}
        />
        <KpiCard
          status="positive"
          title="На строительстве"
          trend={{ direction: 'up', value: '12 новых' }}
          value={investmentNavigatorMock.kpis.construction}
        />
        <KpiCard
          title="С цифровыми потребностями"
          value={investmentNavigatorMock.kpis.digitalNeeds}
        />
        <KpiCard
          title="Плановый объём"
          value={formatCompactMoney(investmentNavigatorMock.kpis.investment)}
        />
      </div>
      <div className={pageStyles['split-grid']}>
        <DataPanel title="Проекты" variant="tinted">
          <List
            dataSource={investmentNavigatorMock.projects}
            renderItem={(project) => (
              <List.Item
                className={
                  selectedProject.id === project.id ? styles['project-selected'] : undefined
                }
              >
                <button
                  className={styles['project-card']}
                  onClick={() => selectProject(project)}
                  type="button"
                >
                  <div className={styles['project-heading']}>
                    <strong>{project.title}</strong>
                    <Tag color={stageColors[project.stage]}>{stageLabels[project.stage]}</Tag>
                  </div>
                  <span>{project.initiator}</span>
                  <span>
                    {project.region} · {formatCompactMoney(project.budget)}
                  </span>
                  <div className={styles['tag-list']}>
                    {project.needs.map((need) => (
                      <Tag key={need}>{need}</Tag>
                    ))}
                  </div>
                </button>
              </List.Item>
            )}
          />
        </DataPanel>
        <DataPanel title="География проектов" variant="analytics">
          <div className={styles['geo-canvas']}>
            <EnvironmentOutlined className={styles['geo-icon']} />
            <strong>{selectedProject.region}</strong>
            <span>{selectedProject.title}</span>
            <Progress
              percent={selectedProject.score}
              showInfo={false}
              strokeColor="#749FD6"
              trailColor="rgba(255,255,255,.15)"
            />
            <Button onClick={() => setIsDrawerOpen(true)} type="primary">
              Открыть детали
            </Button>
          </div>
        </DataPanel>
      </div>
      <DataPanel title="События и тендеры">
        <Table
          columns={[
            { dataIndex: 'date', key: 'date', title: 'Дата' },
            { dataIndex: 'type', key: 'type', render: (value) => <Tag>{value}</Tag>, title: 'Тип' },
            { dataIndex: 'project', key: 'project', title: 'Проект' },
            { dataIndex: 'title', key: 'title', title: 'Событие' },
          ]}
          dataSource={investmentNavigatorMock.events}
          pagination={false}
          rowKey={(row) => `${row.date}-${row.title}`}
          scroll={{ x: 760 }}
        />
      </DataPanel>
      <Drawer
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        title={selectedProject.title}
        width={480}
      >
        <div className={styles['drawer-content']}>
          <Tag color={stageColors[selectedProject.stage]}>{stageLabels[selectedProject.stage]}</Tag>
          <p>{selectedProject.initiator}</p>
          <strong>{formatCompactMoney(selectedProject.budget)}</strong>
          <Timeline
            items={[
              { children: 'Планирование проекта', color: 'green' },
              { children: 'Проектирование и выбор подрядчиков', color: 'blue' },
              { children: 'Строительный этап', color: 'orange' },
            ]}
          />
          <div>
            <strong>Потребности</strong>
            <div className={styles['tag-list']}>
              {selectedProject.needs.map((need) => (
                <Tag key={need}>{need}</Tag>
              ))}
            </div>
          </div>
          <Button block icon={<BellOutlined />} type="primary">
            Подписаться на изменения
          </Button>
        </div>
      </Drawer>
    </main>
  );
};

export default InvestmentNavigatorPage;
