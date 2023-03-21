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

export async function queryScene(params?: Record<string, any>) {
  return request<SceneCreatedResponse>('/api/v1/scene/', {
    method: 'GET',
    params
  });
}

/**
 *  添加压测场景
 *  */
export async function createScene(data: Record<string, any>) {
  return request<SceneCreatedResponse>('/api/v1/scene/insert', {
    method: 'POST',
    data
  });
}

/**
 * 获取压测场景
 */
export async function listScene(params?: Record<string, any>) {
  return request<SceneListResponse>('/api/v1/scene/list', {
    method: 'GET',
    params
  });
}

/**
 * 删除压测场景
 */
export async function deleteScene(params?: Record<string, any>) {
  return request<SceneListResponse>('/api/v1/scene/delete', {
    method: 'DELETE',
    params
  });
}

