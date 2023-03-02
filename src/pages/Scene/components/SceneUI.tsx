import {CaretRightOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Col, Collapse, Empty, Row, Space} from 'antd';
import React, {useState} from 'react';
import './SceneUI.less';
import EmptyScene from '@/assets/emptySearch.svg';
import Postman, {PostmanProps, PostmanValue} from '@/components/Postman';


const Panel = Collapse.Panel;

export interface SceneUIProps {
  sceneData: SceneProps;
  onChange: (data: SceneProps) => void;
}

export interface SceneStep {
  stepName: string;
  request: PostmanProps;
}

export interface SceneProps {
  name: string;
  steps: SceneStep[];
}

const SceneUI: React.FC<SceneUIProps> = ({sceneData, onChange}) => {

  const [stepRequests, setStepRequests] = useState<PostmanProps[]>([]);

  console.log(sceneData)

  const onCreateStep = () => {
    const requests = [...stepRequests, {method: "GET", url: ''}]
    const length = requests.length;
    const steps: SceneStep[] = [...sceneData.steps, {
      stepName: '测试步骤',
      request: {value: requests[length - 1] as PostmanValue}
    }]
    steps[steps.length - 1].request.onChange = (value: any) => {
      const s = [...steps]
      s[length - 1].request.value = value
      onChange({
        ...sceneData,
        steps: s,
      })
    };
    onChange({
      ...sceneData,
      steps
    })
  }

  return <>
    <Row gutter={8} style={{marginBottom: 12}}>
      <Col span={8}>
        <Button type="primary" onClick={onCreateStep}>
          <PlusOutlined/> 添加步骤
        </Button>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        {
          sceneData.steps.length === 0 ?
            <Empty image={EmptyScene} imageStyle={{height: 240}} description="还没有任何测试步骤哦，快添加一个叭~"/> :
            <Space direction="vertical" className="mouse-ui">
              {
                sceneData.steps.map((step, index) => <Collapse
                  key={index.toString()}
                  collapsible="header"
                  defaultActiveKey={['1']}
                  className="mouse-step"
                  expandIcon={({isActive}) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
                >
                  <Panel header={step.stepName} key={step.stepName}>
                    <Postman {...step.request}/>
                  </Panel>
                </Collapse>)
              }
            </Space>
        }
      </Col>
    </Row>
  </>;
};

export default SceneUI;
