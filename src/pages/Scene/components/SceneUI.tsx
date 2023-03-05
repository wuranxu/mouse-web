import {
  CaretRightOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { Button, Col, Collapse, Empty, Input, Row, Space } from 'antd';
import React, { useState } from 'react';
import './SceneUI.less';
import EmptyScene from '@/assets/emptySearch.svg';
import Postman from '@/components/Postman';
import { SceneStep, SceneUIProps } from '../types';


const Panel = Collapse.Panel;


interface StepTitleProps {
  title: string;
  onChange: (title: string) => void
}

const StepTitle: React.FC<StepTitleProps> = ({ title, onChange }) => {
  const [editable, setEditable] = useState<boolean>(false);
  const [value, setValue] = useState<string>(title);
  return (
    <div>
      {
        editable ?
          <Space>
            <Input size="small" onClick={e => {
              e.stopPropagation();
            }} placeholder="请输入步骤名称" defaultValue={value}
              onPressEnter={e => {
                e.stopPropagation();
                setEditable(false)
                onChange(value)
              }}
              onChange={e => setValue(e.target.value)} />
            <CheckOutlined onClick={e => {
              e.stopPropagation()
              setEditable(false)
              onChange(value)
            }} />
            <CloseOutlined onClick={(e) => {
              e.stopPropagation();
              setEditable(false)
            }} />
          </Space> :
          <span>{title} <EditOutlined onClick={(e) => {
            e.stopPropagation();
            setEditable(true)
          }} /></span>
      }
    </div>
  )
}

const SceneUI: React.FC<SceneUIProps> = ({ sceneData, onChange }) => {

  const onCreateStep = () => {
    const steps: SceneStep[] = [...sceneData.steps, {
      stepName: `测试步骤-${sceneData.steps.length + 1}`,
      request: { method: "GET", url: '' },
      check: [],
      out: []
    }]
    onChange({
      ...sceneData,
      steps
    })
  }

  console.log("form", sceneData)

  const onChangeStepName = (idx: number, name: string) => {
    const steps: SceneStep[] = [...sceneData.steps]
    steps[idx].stepName = name
    onChange({
      ...sceneData,
      steps
    })
  }


  return <>
    <Row gutter={8} style={{ marginBottom: 12 }}>
      <Col span={8}>
        <Button type="primary" onClick={onCreateStep}>
          <PlusOutlined /> 添加步骤
        </Button>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        {
          sceneData.steps.length === 0 ?
            <Empty image={EmptyScene} imageStyle={{ height: 240 }} description="还没有任何测试步骤哦，快添加一个叭~" /> :
            <Space direction="vertical" className="mouse-ui">
              {
                sceneData.steps.map((step, index) => <Collapse
                  key={index.toString()}
                  collapsible="header"
                  defaultActiveKey={['1']}
                  className="mouse-step"
                  expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                >
                  <Panel
                    extra={<DeleteOutlined style={{ color: 'rgb(249,57,32)' }} key={`remove-${index}`} onClick={e => {
                      e.stopPropagation();
                      const steps = [...sceneData.steps]
                      steps.splice(index, 1)
                      onChange({
                        ...sceneData,
                        steps
                      })
                    }} />} header={<StepTitle title={step.stepName} onChange={title => {
                      onChangeStepName(index, title)
                    }} />} key={index.toString()}>
                    <Postman value={step.request} sceneData={sceneData} index={index} onChange={onChange} />
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
