import MouseCodeEditor from "@/components/Code/MouseCodeEditor";
import { OnChange } from "@monaco-editor/react";
import { Card } from "antd";
import React from "react";
import { Language } from "../types";


export interface SceneCodeType {
  language?: Language;
  value?: string;
  onChange?: OnChange;
}

const SceneCode: React.FC<SceneCodeType> = ({ language, value, onChange }) => {

  return (
    <Card bodyStyle={{ padding: 0 }} bordered={false}>
      <MouseCodeEditor height={500} language={language} value={value} onChange={onChange} />
    </Card>
  )
}

export default SceneCode;
