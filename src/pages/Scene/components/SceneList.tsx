import React, {useState} from "react";
import {Button, Col, Divider, Input, Row, Space, Table, Tooltip} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {FormattedMessage, history} from "@umijs/max";
import {PlusOutlined, QuestionCircleOutlined} from "@ant-design/icons";

// scene type
enum SceneType {
  HTTP = 1,
  GRPC = 2
}

interface Scene {
  id: number;
  name: string;
  tags: string[];
  sceneType?: SceneType;
  createdAt: string;
  createUser: string;
}

const SceneList: React.FC = () => {
  const [data, setData] = useState([]);

  const columns: ColumnsType<Scene> = [
    {
      title: <FormattedMessage id="scene.list.columns.id" defaultMessage="场景id"/>,
      key: 'id',
      dataIndex: 'id'
    },
    {
      title: <FormattedMessage id="scene.list.columns.name" defaultMessage="场景名称"/>,
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: '类型',
      key: 'sceneType',
      dataIndex: 'sceneType'
    },
    {
      title: '创建人',
      key: 'createUser',
      dataIndex: 'createUser'
    },
    {
      title: '创建时间',
      key: 'createdAt',
      dataIndex: 'createdAt'
    },
    {
      title: '操作',
      key: 'ops',
      render: () => <>
        <a>编辑</a>
        <Divider type="vertical"/>
        <a>删除</a>
      </>
    }
  ]

  return (
    <>
      <Row gutter={12} style={{marginBottom: 16}}>
        <Col span={8}>
          <Space>
            <Button onClick={() => {
              history.push("/scene/create");
            }} type="primary"><PlusOutlined/> 添加场景</Button>
            <Tooltip title="支持导入JSON、YAML、Har、JMX">
              <Button><QuestionCircleOutlined/> 导入场景</Button>
            </Tooltip>
          </Space>
        </Col>
        <Col span={8}/>
        <Col span={8}>
          <Input.Search placeholder="请输入要查询的场景名称"/>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} rowKey={row => row.id}/>
    </>
  )
};

export default SceneList;
