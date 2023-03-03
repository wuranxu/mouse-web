import {Card} from "antd";
import React from "react";
import MouseCodeEditor from "@/components/Code/MouseCodeEditor";
import {Language} from "../types";


interface SceneCodeType {
  language?: Language;
}

const SceneCode: React.FC<SceneCodeType> = ({language}) => {

  return (
    <Card bodyStyle={{padding: 0}} bordered={false}>
      <MouseCodeEditor height={500} language={language}/>
    </Card>
  )
}

export default SceneCode;
