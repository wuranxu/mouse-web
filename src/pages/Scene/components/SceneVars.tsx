import {CaretRightOutlined, CopyOutlined} from "@ant-design/icons";
import {Collapse, Drawer, Empty, message, Tag} from "antd"
import React from "react";
import type {SceneStep} from "@/pages/Scene/types";
//@ts-ignore
import {CopyToClipboard} from 'react-copy-to-clipboard';
import EmptyBody from "@/assets/waiting.svg";
import Table, {ColumnsType} from "antd/es/table";
import {VariableSourceType} from "@/components/Postman/components/types";


const {Panel} = Collapse;

export interface SceneVarsProps {
  open?: boolean;
  onChange: (open: boolean) => void;
  steps: SceneStep[];
  width?: number | 720;
}


const SceneVars: React.FC<SceneVarsProps> = ({open, onChange, steps, width}) => {

  const columns: ColumnsType<VariableSourceType> = [
    {
      title: 'variable',
      dataIndex: 'variable',
      key: 'variable',
    },
    {
      title: 'from',
      dataIndex: 'from',
      key: 'from',
      render: (text) => <Tag color="green">{text}</Tag>
    },
    {
      title: 'expression',
      dataIndex: 'expression',
      key: 'expression',
      render: (text) => text || '-'
    },
    {
      title: '操作',
      dataIndex: 'ops',
      key: 'ops',
      render: (text, record) => <CopyToClipboard text={`\$\{${record.variable}\}`} onCopy={
        () => {
          message.success("复制成功")
        }
      }>
        <CopyOutlined style={{fontSize: 16}} key="copy"/>
      </CopyToClipboard>
    }
  ]

  return (
    <Drawer title="参数列表" open={open} onClose={() => onChange(false)} footer={null} width={width}>
      {
        steps.length === 0 ?
          <Empty description="还没有检测到场景步骤, 快去搞一个！" imageStyle={{height: 220}} image={EmptyBody}/> :
          <Collapse
            bordered={false}
            expandIcon={({isActive}) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
          >
            {
              steps.map((item, index) => (
                <Panel header={item.stepName} key={index.toString()}>
                  <Table columns={columns} dataSource={item.out} pagination={false} size="small"/>
                </Panel>
              ))
            }
          </Collapse>
      }
    </Drawer>
  )
}


export default SceneVars;
