import { request } from '@umijs/max';
import { API } from './typings';

// 获取接口详细信息
export async function getInterfaceInfo(id: number) {
  return request<API.InterfaceInfo>(`/interface/getInterfaceInfo?id=${id}`, {
    method: 'GET',
  });
}

// 修改接口
export async function updateInterfaceInfo(id: number){
  return request<API.InterfaceInfo>(`/interface/updateInterfaceInfo`,{
    method: 'POST',
    data: {id: id},
  }
}