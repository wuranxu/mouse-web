import createDependencyProposals from "@/components/Code/suggestions";
import { useModel } from "@@/exports";
import { ClearOutlined, CopyOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import Editor, { loader, OnChange } from '@monaco-editor/react';
import { message, Space, Tooltip } from 'antd';
import * as monaco from 'monaco-editor';
import React from 'react';
//@ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';

const iconStyles = {
  fontSize: 16,
  cursor: 'pointer'
}

monaco.languages.registerCompletionItemProvider('yaml', {
  provideCompletionItems: function (model, position) {
    const word = model.getWordUntilPosition(position);
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn
    };
    return {
      suggestions: createDependencyProposals(range)
    };
  }
});
loader.config({ monaco });

interface MouseCodeEditorProps {
  height?: string | number;
  language?: 'yaml' | 'json';
  defaultValue?: string;
  value?: string;
  onChange?: OnChange;
}

const MouseCodeEditor: React.FC<MouseCodeEditorProps> = (props) => {
  const { initialState } = useModel("@@initialState");

  return (
    <>
      <Space style={{ float: 'right', marginRight: 8 }}>
        <Tooltip title="点击可复制全部代码">
          <CopyToClipboard text={props.value}
            onCopy={() => { message.success("复制成功") }}>
            <CopyOutlined style={iconStyles} />
          </CopyToClipboard>
        </Tooltip>
        <Tooltip title="点击可清空代码">
          <ClearOutlined style={iconStyles} onClick={() => {
            props?.onChange("")
          }} />
        </Tooltip>
        <Tooltip title="点击全屏编写代码">
          <FullscreenOutlined style={iconStyles} />
        </Tooltip>
        <Tooltip title="点击退出全屏">
          <FullscreenExitOutlined style={iconStyles} />
        </Tooltip>
      </Space>
      <Editor
        height={props.height}
        theme={initialState?.settings?.navTheme === 'light' ? 'vs-light' : 'vs-dark'}
        language={props.language}
        value={props.value}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
        options={{
          quickSuggestions: { other: true, strings: true },
        }}
      />
    </>
  );
};

export default MouseCodeEditor;
