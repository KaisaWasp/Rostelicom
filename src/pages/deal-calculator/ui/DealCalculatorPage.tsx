import { FileTextOutlined, SaveOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, InputNumber, Select, Steps, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DataPanel, PageHeader } from '@shared/ui';
import { formatMoney, formatPercentage } from '@shared/lib';
import { dealCalculatorMock, type CalculationItem } from '../model/mock-data';
import pageStyles from '@shared/styles/page-layout.module.css';
import styles from './DealCalculatorPage.module.css';

const itemColumns: ColumnsType<CalculationItem> = [
  { dataIndex: 'name', key: 'name', title: 'Позиция' },
  {
    dataIndex: 'category',
    key: 'category',
    render: (value) => <Tag>{value}</Tag>,
    title: 'Категория',
  },
  { dataIndex: 'quantity', key: 'quantity', title: 'Количество' },
  { dataIndex: 'unit', key: 'unit', title: 'Ед.' },
  { dataIndex: 'total', key: 'total', render: (value) => formatMoney(value), title: 'Стоимость' },
];

const DealCalculatorPage = () => {
  return (
    <main className={pageStyles.page}>
      <PageHeader
        actions={
          <>
            <Button icon={<SaveOutlined />}>Сохранить черновик</Button>
            <Button disabled icon={<FileTextOutlined />} type="primary">
              Сформировать КП
            </Button>
          </>
        }
        subtitle="Получите предварительный диапазон стоимости по параметрам будущей сделки."
        title="Калькулятор сделок"
      />
      <Alert
        className={pageStyles['demo-notice']}
        description="Результат демонстрационный и не является коммерческим предложением."
        message="Демонстрационные данные"
        showIcon
        type="info"
      />
      <Steps
        className={styles.steps}
        current={2}
        items={[{ title: 'Параметры' }, { title: 'Состав решения' }, { title: 'Расчёт' }]}
      />
      <div className={styles.workspace}>
        <div className={styles['form-column']}>
          <DataPanel title="Параметры сделки">
            <Form layout="vertical" requiredMark="optional">
              <div className={styles['form-grid']}>
                <Form.Item label="Тип сделки">
                  <Input defaultValue="Цифровая инфраструктура производственной площадки" />
                </Form.Item>
                <Form.Item label="Регион">
                  <Select
                    defaultValue="tatarstan"
                    options={[
                      { label: 'Республика Татарстан', value: 'tatarstan' },
                      { label: 'Московская область', value: 'moscow' },
                    ]}
                  />
                </Form.Item>
                <Form.Item label="Масштаб">
                  <Select
                    defaultValue="enterprise"
                    options={[
                      { label: 'Enterprise', value: 'enterprise' },
                      { label: 'Standard', value: 'standard' },
                    ]}
                  />
                </Form.Item>
                <Form.Item label="Срок реализации, месяцев">
                  <InputNumber defaultValue={12} min={1} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Модель финансирования">
                  <Select
                    defaultValue="mixed"
                    options={[
                      { label: 'Смешанная', value: 'mixed' },
                      { label: 'CAPEX', value: 'capex' },
                      { label: 'OPEX', value: 'opex' },
                    ]}
                  />
                </Form.Item>
              </div>
            </Form>
          </DataPanel>
          <DataPanel title="Состав решения" variant="tinted">
            <div className={pageStyles['table-scroll']}>
              <Table
                columns={itemColumns}
                dataSource={dealCalculatorMock.items}
                pagination={false}
                rowKey="id"
                scroll={{ x: 720 }}
              />
            </div>
          </DataPanel>
        </div>
        <DataPanel title="Предварительная оценка" variant="tinted">
          <div className={styles.summary}>
            <span className={styles['summary-label']}>Диапазон стоимости</span>
            <strong className={styles.range}>
              {formatMoney(dealCalculatorMock.range.minimum)} —{' '}
              {formatMoney(dealCalculatorMock.range.maximum)}
            </strong>
            <div className={styles['range-track']}>
              <span>Минимум</span>
              <span className={styles['range-target']}>
                Ориентир
                <br />
                <strong>{formatMoney(dealCalculatorMock.range.target)}</strong>
              </span>
              <span className={styles['range-end']}>Максимум</span>
            </div>
            <div className={styles['factor-list']}>
              <span>
                Региональный коэффициент{' '}
                <strong>+{formatPercentage(dealCalculatorMock.factors.regional)}</strong>
              </span>
              <span>
                Срочность <strong>+{formatPercentage(dealCalculatorMock.factors.urgency)}</strong>
              </span>
              <span>
                Уникальность{' '}
                <strong>+{formatPercentage(dealCalculatorMock.factors.uniqueness)}</strong>
              </span>
            </div>
            <Alert
              description="Расчёт основан на 3 демонстрационных аналогах."
              message="Средняя уверенность"
              showIcon
              type="warning"
            />
          </div>
        </DataPanel>
      </div>
      <DataPanel title="Аналоги расчёта">
        <Table
          columns={[
            { dataIndex: 'title', key: 'title', title: 'Проект-аналог' },
            { dataIndex: 'industry', key: 'industry', title: 'Отрасль' },
            { dataIndex: 'region', key: 'region', title: 'Регион' },
            { dataIndex: 'completedAt', key: 'completedAt', title: 'Завершён' },
            {
              dataIndex: 'price',
              key: 'price',
              render: (value) => formatMoney(value),
              title: 'Стоимость',
            },
            {
              dataIndex: 'similarity',
              key: 'similarity',
              render: (value) => formatPercentage(value),
              title: 'Похожесть',
            },
          ]}
          dataSource={dealCalculatorMock.analogs}
          pagination={false}
          rowKey="id"
          scroll={{ x: 900 }}
        />
      </DataPanel>
    </main>
  );
};

export default DealCalculatorPage;
