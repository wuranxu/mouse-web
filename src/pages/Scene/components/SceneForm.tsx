import { CheckCard } from '@ant-design/pro-components';
import { Avatar, Col, Form, Input, Row } from 'antd';
import { SceneProps } from '../types';

const FormItem = Form.Item;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export interface SceneFormProps {
  form: any;
  sceneData: SceneProps;
  setSceneData: (data: SceneProps) => void;
}

const SceneForm = ({ form, sceneData, setSceneData }: SceneFormProps) => {

  return (
    <Form form={form} {...layout}
      initialValues={{ name: sceneData.name, sceneType: sceneData.sceneType }}
      onValuesChange={kv => {
        setSceneData({ ...sceneData, ...kv })
      }}>
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
                    message: '请选择压测场景类型',
                  },
                ]}
              >
                <CheckCard.Group style={{ width: '100%' }}>
                  <CheckCard
                    title="HTTP"
                    avatar={
                      <Avatar
                        src="/http.png"
                        size="large"
                      />
                    }
                    description="经典的压测场景类型，经久而不衰"
                    value={1}
                  />
                  <CheckCard
                    title="GRPC"
                    avatar={
                      <Avatar
                        src="/GRPC.svg"
                        size="large"
                      />
                    }
                    disabled
                    description="rpc界的新锐，正在大力完善中..."
                    value={2}
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
