import { PageContainer } from "@ant-design/pro-layout";
import { useIntl } from '@umijs/max';

const SceneList: React.FC = () => {
  const intl = useIntl();
  return (
    <PageContainer
      title={intl.formatMessage({ id: 'scene.list.title', defaultMessage: '场景列表' })}
    ></PageContainer>
  );
};

export default SceneList;
