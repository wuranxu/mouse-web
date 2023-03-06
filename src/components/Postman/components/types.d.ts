import React from "react";

export interface DataSourceType {
  id: React.Key;
  key: string;
  value: string;
}


export interface VariableSourceType {
  id: React.Key;
  // name: string;
  from: "Response" | "RequestHeader" | "ResponseHeader" | "Cookie" | "StatusCode";
  extractType: "Regex" | "JSONPath";
  expression: string;
  variable: string;
}

export interface AssertionSourceType {
  id: React.Key;
  name: string;
  assertType: "Equal";
  expected: string;
  actually: string;
  errorMsg: string;
  disabled: boolean;
}
