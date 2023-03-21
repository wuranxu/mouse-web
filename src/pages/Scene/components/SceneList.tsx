import React, {KeyboardEventHandler, useEffect, useState} from "react";
import {Avatar, Button, Col, Divider, Input, Popconfirm, Row, Space, Table, Tag, Tooltip} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {FormattedMessage, history} from "@umijs/max";
import {PlusOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {deleteScene, listScene} from "@/services/scene";

// scene type
enum SceneType {
  HTTP = 1,
  GRPC = 2
}

export interface MouseUser {
  id: number;
  name: string;
  email: string;
  role: number;
}

export interface Scene {
  id: number;
  name: string;
  tags: string[];
  sceneType?: SceneType;
  createdAt: string;
  createUser: string;
  creator: MouseUser;
  updater: MouseUser;
}

const SceneList: React.FC = () => {
  const [data, setData] = useState<Scene[]>([]);

  const onDelete = async (sceneId: number) => {
    const resp = await deleteScene({sceneId})
    if (resp.code === 0) {
      onFetchSceneList()
    }
  }

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
      dataIndex: 'sceneType',
      render: (sceneType: SceneType) => <Tag
        color={sceneType === SceneType.HTTP ? 'green' : 'blue'}>{sceneType === SceneType.HTTP ? 'HTTP' : 'GRPC'}</Tag>
    },
    {
      title: '创建人',
      key: 'creator',
      dataIndex: 'creator',
      render: (user: MouseUser) => <div>
        <Avatar key={user.name} size={24}>{user.name.slice(0, 1)}</Avatar> {user.name}
      </div>
    },
    {
      title: '创建时间',
      key: 'createdAt',
      dataIndex: 'createdAt'
    },
    {
      title: '操作',
      key: 'ops',
      render: (_, record) => <>
        <a>执行</a>
        <Divider type="vertical"/>
        <a href={`/scene/${record.id}`} target="_blank">编辑</a>
        <Divider type="vertical"/>
        <Popconfirm title="你确定要删除此场景吗?" onConfirm={() => {
          onDelete(record.id)
        }}>
          <a>删除</a>
        </Popconfirm>
      </>
    }
  ]

  const onFetchSceneList = async (name = '') => {
    const resp = await listScene({name});
    if (resp.code === 0) {
      setData(resp.data as Scene[])
    }
  }

  useEffect(() => {
    onFetchSceneList()
  }, [])

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
          <Input.Search placeholder="请输入要查询的场景名称"
                        onSearch={onFetchSceneList}
            // @ts-ignore
                        onPressEnter={(e: KeyboardEventHandler<HTMLInputElement>) => {
                          // @ts-ignore
                          return onFetchSceneList(e.target.value);
                        }}/>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} rowKey={row => row.id}/>
    </>
  )
};

export default SceneList;
