import React, {useState} from "react";
import {PageContainer} from "@ant-design/pro-components";
import {Card, Select, Space, Switch, Tabs} from "antd";
import SceneCode from "./components/SceneCode";
import {Language} from "@/pages/Scene/types";

enum SceneMode {
  UI,
  CODE
}

const {TabPane} = Tabs;

const UISwitch = ({mode, setMode, language, setLanguage}: any) => {

  return (
    <Space>
      {
        mode === SceneMode.CODE ?
          <Select value={language} style={{width: 120}} size="small" onChange={e => setLanguage(e)}>
            <Select.Option value="yaml">YAML</Select.Option>
            <Select.Option value="json">JSON</Select.Option>
          </Select> : null
      }
      <Switch defaultChecked={true} onChange={e => {
        if (e) {
          setMode(SceneMode.UI)
        } else {
          setMode(SceneMode.CODE)
        }
      }} checkedChildren="UI模式" unCheckedChildren="Code模式"/>
    </Space>
  )
}

const Scene: React.FC = () => {
  const [mode, setMode] = useState<SceneMode>(SceneMode.UI);
  const [language, setLanguage] = useState<Language>('yaml');


  return (
    <PageContainer title="压测场景">
      <Card>
        <Tabs
          tabBarExtraContent={<UISwitch setMode={setMode} mode={mode} language={language} setLanguage={setLanguage}/>}>
          <TabPane key="info" tab="场景信息">

          </TabPane>
          <TabPane key="detail" tab="场景流程">
            {
              mode === SceneMode.CODE ? <SceneCode key="code" language={language}/> : null
            }
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  )
}

export default Scene;
