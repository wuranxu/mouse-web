import Editor, { loader, OnChange } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import React from 'react';

loader.config({ monaco });

interface MouseCodeEditorProps {
  height?: string | number;
  language?: 'yaml' | 'json';
  defaultValue?: string;
  theme?: string;
  value?: string;
  onChange?: OnChange;
}

const MouseCodeEditor: React.FC<MouseCodeEditorProps> = (props) => {
  return (
    <Editor
      height={props.height}
      theme={props.theme}
      language={props.language}
      value={props.value}
      onChange={props.onChange}
      defaultValue={props.defaultValue}
    />
  );
};

export default MouseCodeEditor;
