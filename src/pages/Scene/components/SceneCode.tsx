import {Card} from "antd";
import React from "react";
import MouseCodeEditor from "@/components/Code/MouseCodeEditor";
import {useModel} from "@umijs/max";
import {Language} from "../types";


interface SceneCodeType {
  language?: Language;
}

const SceneCode: React.FC<SceneCodeType> = ({language}) => {
  const {initialState} = useModel("@@initialState");

  return (
    <Card bodyStyle={{padding: 0}} bordered={false}>
      <MouseCodeEditor height={500} language={language}
                       theme={initialState?.settings?.navTheme === 'light' ? 'vs-light' : 'vs-dark'}/>
    </Card>
  )
}

export default SceneCode;
