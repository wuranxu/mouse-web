import { PostmanValue } from "@/components/Postman";
import { AssertionSourceType, VariableSourceType } from "@/components/Postman/components/types";

export type Language = 'yaml' | 'json';

export interface SceneStep {
  stepName: string;
  request: PostmanValue;
  check: AssertionSourceType[];
  out: VariableSourceType[];
}

export interface SceneProps {
  name: string;
  sceneType: 'HTTP' | 'GRPC';
  steps: SceneStep[];
}

export interface SceneUIProps {
  sceneData: SceneProps;
  onChange: (data: SceneProps) => void;
}
