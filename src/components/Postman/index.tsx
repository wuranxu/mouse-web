import IconFont from "@/components/Icon/IconFont";
import Body from "@/components/Postman/components/Body";
import MouseEditTable from "@/components/Table/MouseEditTable";
import { SceneProps } from "@/pages/Scene/types";
import { ProColumns } from "@ant-design/pro-components";
import { Button, Card, Col, Input, Row, Select, Space, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { AssertionSourceType, DataSourceType, VariableSourceType } from "./components/types";

const { Option } = Select;
const { TabPane } = Tabs;


export interface PostmanProps {
  value: PostmanValue;
  index: number;
  onChange?: any;
  sceneData: SceneProps;
}

export interface PostmanValue {
  url?: string;
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

const Postman: React.FC<PostmanProps> = ({ value, index, onChange, sceneData }) => {
  const [params, setParams] = useState<DataSourceType[]>([]);
  const [headers, setHeaders] = useState<DataSourceType[]>();
  const [variables, setVariables] = useState<VariableSourceType[]>(sceneData.steps[index].out);
  const [assertion, setAssertion] = useState<AssertionSourceType[]>(sceneData.steps[index].check);

  const onChangeRequest = (kv: Record<string, any>) => {
    const steps = [...sceneData.steps]
    steps[index].request = {
      ...steps[index].request,
      ...kv,
    }
    onChange({
      ...sceneData,
      steps,
    })
  }

  const onChangeHeader = (hd: DataSourceType[]) => {
    setHeaders(hd)
    onChangeRequest({ headers: Object.assign({}, ...hd.map(item => ({ [item.key]: item.value }))) })
  }

  const onChangeAssertion = (data: AssertionSourceType[]) => {
    setAssertion(data)
    const steps = [...sceneData.steps]
    steps[index].check = data;
    onChange({
      ...sceneData,
      steps,
    })
  }

  const onChangeOutParameters = (data: VariableSourceType[]) => {
    setVariables(data)
    const steps = [...sceneData.steps]
    steps[index].out = data;
    onChange({
      ...sceneData,
      steps,
    })
  }

  // 获取query参数
  function getUrlQueryParams(url = location.search) {
    let paramString = url.split('?')[1];
    if (paramString === undefined) {
      return;
    }
    const urlSearchParams = new URLSearchParams(paramString);
    const items = [];
    const entries = urlSearchParams.entries();
    for (const entry of entries) {
      items.push({
        id: (Math.random() * 1000000).toFixed(0),
        key: entry[0],
        value: entry[1],
      })
    }
    setParams(items)
  }


  const selectBefore = (
    <Select defaultValue="GET" style={{ width: 120 }}
      value={value.method}
      onChange={e => {
        onChangeRequest({ method: e })
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
        render: (text: any, record: { id: React.Key; }, _: any, action: { startEditable: (arg0: any) => void; }) => [
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
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
      editable: () => true,
      width: '40%',
    },
    {
      title: 'VALUE',
      dataIndex: 'value',
      editable: () => true,
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [],
        };
      },
      width: '40%',
    },
  ]

  const varColumns: ProColumns<VariableSourceType>[] = [
    {
      title: '来源',
      dataIndex: 'from',
      valueType: 'select',
      valueEnum: {
        Response: "Response",
        RequestHeader: "RequestHeader",
        ResponseHeader: "ResponseHeader",
        StatusCode: "StatusCode",
      },
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [],
        };
      },
    },
    {
      title: '取值类型',
      dataIndex: 'extractType',
      valueType: 'select',
      valueEnum: {
        Regex: "Regex",
        JSONPath: "JSONPath",
      },
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [],
        };
      },
    },
    {
      title: '取值表达式',
      dataIndex: 'expression',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [],
        };
      },
    },
    {
      title: '变量名称',
      dataIndex: 'variable',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [{ required: true, message: '请为变量取个名字吧~' }],
        };
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: '20%',
      render: (text: any, record: { id: React.Key; }, _: any, action: { startEditable: (arg0: any) => void; }) => [
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
            setVariables(variables.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
    },
  ]

  const assertColumns: ProColumns<AssertionSourceType>[] = [
    {
      title: '预期结果',
      dataIndex: 'expected',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [{ required: true, message: '请填写预期结果~' }],
        };
      },
    },
    {
      title: '类型',
      dataIndex: 'assertType',
      valueType: 'select',
      valueEnum: {
        Equal: "等于",
      },
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [{ required: true, message: '请选择断言类型~' }],
        };
      },
    },
    {
      title: '实际结果',
      dataIndex: 'actually',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [{ required: true, message: '请填写预期结果~' }],
        };
      },
    },
    {
      title: '错误描述',
      dataIndex: 'errorMsg',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [],
        };
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: '20%',
      render: (text: any, record: { id: React.Key; }, _: any, action: { startEditable: (arg0: any) => void; }) => [
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
            setVariables(variables.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
    },
  ]



  // change url
  useEffect(() => {
    getUrlQueryParams(value.url)
  }, [value.url])

  useEffect(() => {
    const headers = sceneData.steps[index].request.headers;
    if (headers === undefined) {
      return;
    }
    setHeaders(Object.keys(headers).map(k => ({
      id: (Math.random() * 1000000).toFixed(0),
      key: k,
      value: headers[k]
    })))
  }, [])

  const onUpdateParams = (data: DataSourceType[]) => {
    setParams(data)
    onUpdateUrl(data)
  }

  const onUpdateUrl = (data: DataSourceType[]) => {
    const p = data.length === 0 ? '' : '?'
    const prefixUrl = value.url?.split("?")[0]
    const url = `${prefixUrl || ''}${p}${data.map(item => `${item.key}=${item.value}`).join("&")}`
    onChangeRequest({ url })
  }


  return (
    <Card bordered={false}>
      <Row gutter={16}>
        <Col span={18}>
          <Input addonBefore={selectBefore} placeholder="Enter request url" value={value.url} onChange={e => {
            onChangeRequest({ url: e.target.value })
          }} />
        </Col>
        <Col span={6}>
          <Space style={{ float: 'right' }}>
            <Button type="primary"><IconFont type="icon-fasong" /> Send</Button>
          </Space>
        </Col>
      </Row>
      <Row gutter={8} style={{ marginTop: 8 }}>
        <Col span={24}>
          <Tabs>
            <TabPane key="params" tab="Params">
              <MouseEditTable columns={getColumns(params, onUpdateParams)} dataSource={params}
                setDataSource={onUpdateParams}
                title="Query Params" />
            </TabPane>
            <TabPane key="headers" tab="Headers">
              <MouseEditTable columns={getColumns(headers, onChangeHeader)} dataSource={headers}
                setDataSource={onChangeHeader} title="Request Headers" />
            </TabPane>
            <TabPane key="body" tab="Body">
              <Body setHeaders={onChangeHeader} headers={headers} body={value.body} setBody={(body: string | undefined) => {
                onChangeRequest({ body })
              }} />
            </TabPane>
            <TabPane key="parameters" tab="Variables">
              <MouseEditTable columns={varColumns} dataSource={variables}
                setDataSource={onChangeOutParameters} title="参数提取" />
            </TabPane>
            <TabPane key="assertion" tab="Assertion">
              <MouseEditTable columns={assertColumns} dataSource={assertion}
                setDataSource={onChangeAssertion} title="步骤断言" />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Card>
  )
}

export default Postman;
