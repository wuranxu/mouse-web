import SceneForm from '@/pages/Scene/components/SceneForm';
import {Language, SceneProps, SceneStep} from '@/pages/Scene/types';
import {FunctionOutlined, NodeIndexOutlined, SaveOutlined} from '@ant-design/icons';
import {PageContainer} from '@ant-design/pro-components';
import {Button, Card, Form, message, Select, Space, Switch, Tabs} from 'antd';
import React, {useEffect, useState} from 'react';
import {parse, stringify} from 'yaml';
import SceneCode from './components/SceneCode';
import SceneUI from './components/SceneUI';
import SceneVars from "@/pages/Scene/components/SceneVars";
import {createScene, queryScene} from "@/services/scene";
import {useParams} from '@umijs/max';


enum SceneMode {
  UI,
  CODE,
}

const {TabPane} = Tabs;

const UISwitch = ({mode, setMode, language, setLanguage}: any) => {
  return (
    <Space>
      {mode === SceneMode.CODE ? (
        <Select
          value={language}
          style={{width: 120}}
          size="small"
          onChange={(e) => setLanguage(e)}
        >
          <Select.Option value="yaml">YAML</Select.Option>
          <Select.Option value="json">JSON</Select.Option>
        </Select>
      ) : null}
      <Switch
        defaultChecked={true}
        onChange={(e) => {
          if (e) {
            setMode(SceneMode.UI);
          } else {
            setMode(SceneMode.CODE);
          }
        }}
        checkedChildren="UI模式"
        unCheckedChildren="Code模式"
      />
    </Space>
  );
};


const Scene: React.FC = () => {
  const [mode, setMode] = useState<SceneMode>(SceneMode.UI);
  const [language, setLanguage] = useState<Language>('yaml');
  const [varDrawer, setVarDrawer] = useState<boolean>(false);
  const [sceneData, setSceneData] = useState<SceneProps>({name: '', steps: [], sceneType: 'HTTP'});
  const [sceneCode, setSceneCode] = useState<string>('{}');
  const [form] = Form.useForm();

  const params = useParams();

  const onChangeCode = (code: string) => {
    try {
      let data;
      if (language === 'yaml') {
        data = parse(code)
      } else {
        data = JSON.parse(code)
      }
      form.setFieldsValue(data)
    } catch (e) {
      console.log("invalid code")
    }
  }

  const onSave = async (values: Record<string, any>) => {
    let steps, data;
    if (mode === SceneMode.UI) {
      steps = JSON.stringify(sceneData.steps)
      data = {...values, steps}
    } else {
      try {
        if (language === 'yaml') {
          data = parse(sceneCode)
        } else {
          data = JSON.parse(sceneCode)
        }
      } catch (e) {
        message.warning("数据不合法, 请检查");
        return
      }
      if (!data.name) {
        message.info("场景名称不能为空");
        return;
      }
      if (!data.sceneType) {
        message.info("场景类型不能为空");
        return;
      }
    }
    if (data.steps === undefined || data.steps.length === 0) {
      message.info("场景步骤不能为空");
      return;
    }
    // onSave data
    const resp = await createScene(data)
    if (resp.code === 0) {
      message.success(resp.msg);
    }
  }

  const onSubmit = async () => {
    let values;
    try {
      values = await form.validateFields()
    } catch (e) {
      const errs = form.getFieldsError()
      for (const err of errs) {
        if (err.errors.length > 0) {
          message.info(err.errors[0].toString())
          return
        }
      }
    }
    // save
    await onSave(values)
  }

  const convertToCode = (method: Function) => {
    const data = {
      ...sceneData,
      steps: sceneData.steps.map(item => ({
        ...item,
        check: item.check?.map(v => removeId(v)),
        out: item.out?.map(v => removeId(v)),
      }))
    }
    const yamlStr = method(data, null, 2);
    setSceneCode(yamlStr)
  }

  const removeId = (obj: Record<string, any>) => {
    const {id: _, index, key, value, ...newObj} = obj;
    return newObj;
  }

  const addId = (obj: Record<string, any>) => {
    return {
      ...obj,
      id: (Math.random() * 1000000).toFixed(0)
    }
  }

  const convertToUI = (method: Function) => {
    if (!sceneCode) {
      return;
    }
    const data = method(sceneCode)
    setSceneData({
      ...data,
      steps: data.steps.map((item: SceneStep) => ({
        ...item,
        out: item?.out?.map((v: Record<string, any>) => addId(v)),
        check: item?.check?.map((v: Record<string, any>) => addId(v)),
      }))
    })
  }

  const switchLang = (lang: "yaml" | 'json') => {
    setLanguage(lang)
    if (!sceneCode) {
      return;
    }
    try {
      let code;
      if (lang === 'yaml') {
        code = stringify(JSON.parse(sceneCode), null, 2)
      } else {
        code = JSON.stringify(parse(sceneCode), null, 2)
      }
      setSceneCode(code)
      message.success("转换成功")
    } catch (e) {
      message.warning("转换失败");
    }

  }

  const onQueryScene = async (sceneId: number | string) => {
    const resp = await queryScene({sceneId})
    if (resp.code === 0) {
      const steps = JSON.parse(resp?.data?.steps)
      const data = {name: resp?.data?.name, steps, sceneType: resp?.data?.sceneType}
      form.setFieldsValue(data)
      setSceneData(data)
    }
  }

  useEffect(() => {
    if (params.sceneId) {
      // 说明是编辑模式 查询场景数据
      onQueryScene(params.sceneId)
    }
  }, [])

  return (
    <PageContainer title={false} breadcrumb={{}} footer={
      window.location.pathname.indexOf("/scene/") > -1 && window.location.pathname.indexOf("/scene/list") === -1 ?
        [
          <Button key="vars" onClick={() => setVarDrawer(true)}><NodeIndexOutlined/> 变量列表</Button>,
          <Button key="function"><FunctionOutlined/> 基础函数</Button>,
          <Button key="submit" type="primary" onClick={onSubmit}><SaveOutlined/>
            提交
          </Button>,
        ] : []}>
      <Card>
        <SceneVars open={varDrawer} onChange={setVarDrawer} steps={sceneData.steps} width={720}/>
        <Tabs
          tabBarExtraContent={
            <UISwitch setMode={(md: SceneMode) => {
              setMode(md)
              const uiMethod = language === 'yaml' ? parse : JSON.parse
              const codeMethod = language === 'yaml' ? stringify : JSON.stringify
              if (md === SceneMode.CODE) {
                convertToCode(codeMethod);
              } else {
                convertToUI(uiMethod);
              }
            }} mode={mode} language={language} setLanguage={switchLang}/>
          }>
          <TabPane key="info" tab="场景信息">
            <SceneForm key="sceneForm" form={form} sceneData={sceneData} setSceneData={setSceneData}/>
          </TabPane>
          <TabPane key="detail" tab="场景流程">
            {mode === SceneMode.CODE ? (
              // @ts-ignore
              <SceneCode key="code" language={language} value={sceneCode} onChange={(code: string) => {
                setSceneCode(code)
                onChangeCode(code)
              }}/>
            ) : (
              // @ts-ignore
              <SceneUI key="sceneUI" sceneData={sceneData} onChange={setSceneData}/>
            )}
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default Scene;
