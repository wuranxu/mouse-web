import * as monaco from 'monaco-editor';
import Editor, {loader, OnChange} from '@monaco-editor/react';
import React from 'react';
import createDependencyProposals from "@/components/Code/suggestions";


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
loader.config({monaco});

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
      options={{
        quickSuggestions: {other: true, strings: true},
      }}
    />
  );
};

export default MouseCodeEditor;
