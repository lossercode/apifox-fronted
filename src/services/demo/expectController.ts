import { request } from '@umijs/max';
import { API } from './typings';

// 获取接口详细信息
export async function getAllExpects(id: string) {
  return request<API.InterfaceInfo>(`/expect/getAllExpects?interfaceId=${id}`, {
    method: 'GET',
  });
}


// 获取接口详细信息
export async function getExpectInfo(id: string) {
  return request<API.InterfaceInfo>(`/expect/getExpectInfo?expectId=${id}`, {
    method: 'GET',
  });
}

// 更新期望
export async function updateExpectInfo(projectId: string, expectId: string, data: any) {
  return request<API.InterfaceInfo>(`/expect/update`, {
    method: 'POST',
    data: {
        expectId,
        projectId,
        ...data
    }
  });
}

// 新建期望
// 项目id，接口id，接口数据
export async function createExpect(projectId: string, interfaceId: string, data: any) {
  return request<API.InterfaceInfo>(`/expect/create`, {
    method: 'POST',
    data: {
        projectId: projectId,
        interfaceId: interfaceId,
        ...data
    }
  });
}