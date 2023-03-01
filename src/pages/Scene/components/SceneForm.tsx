import { CheckCard } from '@ant-design/pro-components';
import { Avatar, Col, Form, Input, Row } from 'antd';
import React from 'react';

const FormItem = Form.Item;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const SceneForm: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} {...layout}>
      <Row gutter={8}>
        <Col span={1} />
        <Col span={22}>
          <Row>
            <Col span={24}>
              <FormItem
                label="压测场景名"
                name="name"
                rules={[
                  {
                    required: true,
                    message: '请输入场景名称',
                  },
                ]}
              >
                <Input placeholder="请输入场景名称" style={{ width: '90%' }} />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem
                label="压测场景类型"
                name="sceneType"
                rules={[
                  {
                    required: true,
                    message: '请输入场景名称',
                  },
                ]}
              >
                <CheckCard.Group style={{ width: '100%' }}>
                  <CheckCard
                    title="HTTP"
                    avatar={
                      <Avatar
                        src="https://gw.alipayobjects.com/zos/bmw-prod/2dd637c7-5f50-4d89-a819-33b3d6da73b6.svg"
                        size="large"
                      />
                    }
                    description="通过业界流行的技术栈来快速构建 Java 后端应用"
                    value="SpringBoot"
                  />
                  <CheckCard
                    title="GRPC"
                    avatar={
                      <Avatar
                        src="https://gw.alipayobjects.com/zos/bmw-prod/6935b98e-96f6-464f-9d4f-215b917c6548.svg"
                        size="large"
                      />
                    }
                    description="使用 SOFAStack 中间件来快速构建分布式后端应用"
                    value="SOFABoot"
                  />
                </CheckCard.Group>
              </FormItem>
            </Col>
          </Row>
        </Col>
        <Col span={1} />
      </Row>
    </Form>
  );
};

export default SceneForm;
