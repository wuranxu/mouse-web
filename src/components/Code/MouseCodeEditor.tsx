import React from "react";
import * as monaco from "monaco-editor";
import Editor, { loader } from "@monaco-editor/react";

loader.config({ monaco });



interface MouseCodeEditorProps {
  height?: string | number;
  language?: "yaml" | "json";
  defaultValue?: string;
  theme?: string;
}

const MouseCodeEditor: React.FC<MouseCodeEditorProps> = props => {
  return (
    <Editor
      height={props.height}
      theme={props.theme}
      language={props.language}
      defaultValue={props.defaultValue}
    />
  );
}

export default MouseCodeEditor;
