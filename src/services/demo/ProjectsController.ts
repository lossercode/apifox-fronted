import { request } from '@umijs/max';
import { API } from './typings';

export async function queryProjectList(type: API.projectType) {
  return request<API.projectListResponse>('/project/getAll', {
    method: 'GET',
    params: {
      type,
    },
  });
}

export async function createProject(
  body?: API.createProjectParams,
  options?: { [key: string]: any },
) {
  return request<API.createProjectResponse>('/project/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


export async function updateProjectInfo(
  body?: API.createProjectParams,
  options?: { [key: string]: any },
) {
  return request<API.createProjectResponse>('/project/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
