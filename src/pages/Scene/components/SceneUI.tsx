import { CaretRightOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Collapse, Row, Space } from 'antd';
import React from 'react';
import './SceneUI.less';

const Panel = Collapse.Panel;

const SceneUI: React.FC = () => {
  return (
    <>
      <Row gutter={8} style={{ marginBottom: 12 }}>
        <Col span={8}>
          <Button type="primary">
            <PlusOutlined /> 添加步骤
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Space direction="vertical" className="mouse-ui">
            <Collapse
              collapsible="header"
              defaultActiveKey={['1']}
              className="mouse-step"
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            >
              <Panel header="登录pity" key="1">
                <p>贼难受</p>
              </Panel>
            </Collapse>
            <Collapse
              defaultActiveKey={['1']}
              className="mouse-step"
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            >
              <Panel header="获取pity项目列表" key="1">
                <p>贼难受</p>
              </Panel>
            </Collapse>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default SceneUI;
