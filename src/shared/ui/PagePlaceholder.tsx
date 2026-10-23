import { Result } from 'antd';
import PageHeader from './PageHeader/PageHeader';

type PagePlaceholderProps = {
  title: string;
};

const PagePlaceholder = ({ title }: PagePlaceholderProps) => {
  return (
    <>
      <PageHeader title={title} />
      <Result status="info" subTitle="Раздел будет реализован на следующем этапе." title={title} />
    </>
  );
};

export default PagePlaceholder;
