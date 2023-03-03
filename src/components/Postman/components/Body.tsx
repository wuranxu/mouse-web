import {Col, Empty, Radio, Row} from "antd";
import React, {useEffect, useState} from "react";
import {DataSourceType} from "@/components/Postman/components/types";
import MouseCodeEditor from "@/components/Code/MouseCodeEditor";
import {OnChange} from "@monaco-editor/react";
import EmptyBody from '@/assets/waiting.svg';
import {ProColumns} from "@ant-design/pro-components";
import MouseEditTable from "@/components/Table/MouseEditTable";

export interface BodyProps {
  body?: string;
  setBody: (value: string) => void | OnChange;
  setHeaders: (headers: DataSourceType[]) => void
  headers: DataSourceType[];
}

const Body: React.FC<BodyProps> = ({body, setBody, headers, setHeaders}) => {
  const [value, setValue] = useState<number>(1);
  const [formData, setFormData] = useState<DataSourceType[]>([]);
  // @ts-ignore
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'KEY',
      dataIndex: 'key',
      formItemProps: (form, {rowIndex}) => {
        return {
          rules: [{required: true, message: '此项为必填项'}],
        };
      },
      editable: () => true,
      width: '40%',
    },
    {
      title: 'VALUE',
      dataIndex: 'value',
      editable: () => true,
      formItemProps: (form, {rowIndex}) => {
        return {
          rules: [],
        };
      },
      width: '40%',
    },
    {
      title: '操作',
      valueType: 'option',
      width: '20%',
      // @ts-ignore
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
            setFormData(formData.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
    },
  ]

  const getBodyComponent = () => {
    if (value === 1) {
      return <Empty description="This request does not have a body" imageStyle={{height: 160}} image={EmptyBody}/>
    }
    if (value === 2) {
      return <MouseEditTable columns={columns} dataSource={formData} setDataSource={(source) => {
        setFormData(source)
        onChangeFormData(source)
      }}/>
    }
    return <MouseCodeEditor onChange={setBody} value={body} language="json" height={240}/>
  }

  const onChangeFormData = (source: DataSourceType[]) => {
    if (value === 2 && source.length > 0) {
      // 说明是form，写入到body
      const formDict = Object.assign({}, ...source.map(item => ({[item.key]: item.value})))
      setBody(JSON.stringify(formDict, null, 2))
    }
  }

  useEffect(() => {
    if (value === 1) {
      return;
    }
    const hd = [...headers]
    const idx = hd.findIndex(item => item.key.toLowerCase() === 'content-type')
    let headerValue;
    if (value === 2) {
      // set header with form
      headerValue = "application/x-www-form-urlencoded"
    } else {
      headerValue = "application/json; charset=utf-8"
    }
    if (idx > -1) {
      hd[idx].value = headerValue
    } else {
      hd.unshift({
        id: (Math.random() * 1000000).toFixed(0),
        key: 'Content-Type',
        value: headerValue
      })
    }
    setHeaders(hd)
  }, [value])

  useEffect(() => {
    if (!body) {
      return;
    }
    const idx = headers.findIndex(item => item.key.toLowerCase() === 'content-type')
    if (idx < 0) {
      return;
    }
    if (headers[idx].value.indexOf("json") > -1) {
      setValue(3)
    } else if (headers[idx].value.indexOf("form") > -1) {
      setValue(2)
      try {
        // 写入body到form表单
        const form = JSON.parse(body)
        const data = Object.keys(form).map(key => ({id: (Math.random() * 1000000).toFixed(0), key, value: form[key]}))
        setFormData(data)
      } catch (e) {
        console.log(e)
      }
    } else {
      setValue(1)
    }
  }, [])

  return (
    <>
      <Radio.Group value={value} onChange={e => {
        setValue(e.target.value)
      }}>
        <Radio value={1}>none</Radio>
        <Radio value={2}>form-data</Radio>
        <Radio value={3}>json</Radio>
      </Radio.Group>
      <Row style={{marginTop: 8}}>
        <Col span={24}>
          {
            getBodyComponent()
          }
        </Col>
      </Row>
    </>
  )
}

export default Body;
