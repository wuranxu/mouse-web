import {request} from '@umijs/max';


export interface SceneCreatedResponse {
  code: number;
  msg: string;
  data?: Record<string, any> | null;
}

export interface SceneListResponse {
  code: number;
  msg: string;
  data?: any[] | null;
}

/**
 *  添加压测场景
 *  */
export async function createScene(data: Record<string, any>) {
  return request<SceneCreatedResponse>('/api/scene/insert', {
    method: 'POST',
    data
  });
}

/**
 * 获取压测场景
 */
export async function listScene(params?: Record<string, any>) {
  return request<SceneListResponse>('/api/scene/list', {
    method: 'GET',
    params
  });
}
