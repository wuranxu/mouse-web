import {PostmanValue} from "@/components/Postman";

export type Language = 'yaml' | 'json';

export interface SceneStep {
  stepName: string;
  request: PostmanValue;
}

export interface SceneProps {
  name: string;
  steps: SceneStep[];
}

export interface SceneUIProps {
  sceneData: SceneProps;
  onChange: (data: SceneProps) => void;
}
