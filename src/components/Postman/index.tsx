import {Button, Card, Col, Input, Row, Select, Space, Tabs} from "antd";
import React, {useState} from "react";
import IconFont from "@/components/Icon/IconFont";
import Params from "@/components/Postman/components/Params";
import {ProColumns} from "@ant-design/pro-components";

const {Option} = Select;
const {TabPane} = Tabs;

type DataSourceType = {
  id: React.Key;
  key: string;
  value: string;
};

export interface PostmanProps {
  value: PostmanValue;
  onChange?: any;
}

export interface PostmanValue {
  url?: string;
  method?: string;
  headers?: Record<string, string>;
}

const Postman: React.FC<PostmanProps> = ({value, onChange}) => {
  const selectBefore = (
    <Select defaultValue="GET" style={{width: 120}}
            value={value.method}
            onChange={e => {
      onChange({...value, method: e})
    }}>
      <Option value="GET">GET</Option>
      <Option value="POST">POST</Option>
      <Option value="PUT">PUT</Option>
      <Option value="DELETE">DELETE</Option>
    </Select>
  );

  const getColumns: any = (data: DataSourceType[], setData: any) => {
    return [
      ...defaultColumns,
      {
        title: '操作',
        valueType: 'option',
        width: '20%',
        render: (record: any, action: any) => [
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            编辑
          </a>,
          <a
            key="delete"
            onClick={() => {
              setData(data.filter((item) => item.id !== record.id));
            }}
          >
            删除
          </a>,
        ],
      },
    ]
  }

  const defaultColumns: ProColumns<DataSourceType>[] = [
    {
      title: 'KEY',
      dataIndex: 'key',
      formItemProps: (form, {rowIndex}) => {
        return {
          rules: [{required: true, message: '此项为必填项'}],
        };
      },
      width: '40%',
    },
    {
      title: 'VALUE',
      dataIndex: 'value',
      formItemProps: (form, {rowIndex}) => {
        return {
          rules: [],
        };
      },
      width: '40%',
    },
  ]

  const [params, setParams] = useState<DataSourceType[]>([]);


  return (
    <Card bordered={false}>
      <Row gutter={16}>
        <Col span={18}>
          <Input addonBefore={selectBefore} defaultValue="https://www.baidu.com"/>
        </Col>
        <Col span={6}>
          <Space style={{float: 'right'}}>
            <Button type="primary"><IconFont type="icon-fasong"/> Send</Button>
          </Space>
        </Col>
      </Row>
      <Row gutter={8} style={{marginTop: 8}}>
        <Col span={24}>
          <Tabs>
            <TabPane key="params" tab="Params">
              <Params columns={getColumns(params, setParams)} dataSource={params} setDataSource={setParams}/>
            </TabPane>
            <TabPane key="headers" tab="Headers">

            </TabPane>
            <TabPane key="body" tab="Body">

            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Card>
  )
}

export default Postman;
