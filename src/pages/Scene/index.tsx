import {PageContainer} from '@ant-design/pro-components';
import {useIntl} from '@umijs/max';
import SceneList from './components/SceneList';
import React from "react";
import {Card} from "antd";

const Scene: React.FC = () => {
  const intl = useIntl();

  return (
    <PageContainer
      breadcrumb={{}}
      title={false}
      // title={intl.formatMessage({id: 'scene.list.title', defaultMessage: '场景列表'})}
    >
      <Card>
        <SceneList/>
      </Card>
    </PageContainer>
  );
};

export default Scene;
