import * as monaco from "monaco-editor";

export default function createDependencyProposals(range: any) {
  // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
  // here you could do a server side lookup
  return [
    {
      label: 'name',
      kind: monaco.languages.CompletionItemKind.Function,
      detail: "名称",
      insertText: 'name: ',
      range: range
    },
    {
      label: 'steps',
      kind: monaco.languages.CompletionItemKind.Function,
      detail: "步骤标签",
      insertText: 'steps: \n',
      range: range
    },
    {
      label: 'step_name',
      kind: monaco.languages.CompletionItemKind.Function,
      detail: "用例步骤名称",
      insertText: 'step_name: ',
      range: range
    },
    {
      label: 'url',
      kind: monaco.languages.CompletionItemKind.Function,
      detail: "用例请求url",
      insertText: 'url: ',
      range: range
    },
    {
      label: 'headers',
      kind: monaco.languages.CompletionItemKind.Function,
      detail: "用例请求headers",
      insertText: 'headers: ',
      range: range
    },
    {
      label: 'body',
      kind: monaco.languages.CompletionItemKind.Function,
      detail: "用例请求body",
      insertText: 'body: |\n',
      range: range
    },
    {
      label: 'method',
      kind: monaco.languages.CompletionItemKind.Function,
      detail: "用例请求method",
      insertText: 'method: ',
      range: range
    },
    {
      label: 'GET',
      kind: monaco.languages.CompletionItemKind.Constant,
      detail: "GET请求",
      insertText: 'GET',
      range: range
    },
    {
      label: 'POST',
      kind: monaco.languages.CompletionItemKind.Constant,
      detail: "POST请求",
      insertText: 'POST',
      range: range
    },
    {
      label: 'PUT',
      kind: monaco.languages.CompletionItemKind.Constant,
      detail: "PUT请求",
      insertText: 'PUT',
      range: range
    },
    {
      label: 'DELETE',
      kind: monaco.languages.CompletionItemKind.Constant,
      detail: "DELETE请求",
      insertText: 'DELETE',
      range: range
    },
    {
      label: 'status_check',
      kind: monaco.languages.CompletionItemKind.Function,
      detail: "状态码检测",
      insertText: 'status_check: true',
      range: range
    },
    {
      label: 'check',
      kind: monaco.languages.CompletionItemKind.Function,
      detail: "断言",
      insertText: 'check:\n',
      range: range
    },
    {
      label: 'out',
      kind: monaco.languages.CompletionItemKind.Function,
      detail: "出参提取",
      insertText: 'out:\n',
      range: range
    },
  ];
}
