import { request } from '@umijs/max';

<<<<<<< HEAD
export async function createProject(
  body?: API.createProjectInfo,
=======
export async function queryProjectList(type:API.projectType) {
  return request<API.projectListResponse>('/project/getAll', {
    method: 'GET',
    params: {
      type
    },
  });
}

export async function createProject(
  body?: API.createProjectParams,
>>>>>>> fy
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
<<<<<<< HEAD
=======


export async function updateProjectInfo(){
  
}
>>>>>>> fy
