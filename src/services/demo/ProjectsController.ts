import { request } from '@umijs/max';

export async function createProject(
  body?: API.createProjectInfo,
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
