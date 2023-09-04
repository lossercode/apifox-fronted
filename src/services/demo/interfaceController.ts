import { request } from '@umijs/max';
import { API } from './typings';
import { InterfaceProps } from '@/models/interfaceModel';

// 获取接口详细信息
export async function getInterfaceInfo(id: string){
  return request<API.InterfaceInfo>(`/interface/getInterfaceInfo?interfaceId=${id}`, {
    method: 'GET',
  });
}

// 修改接口
export async function updateInterfaceInfo(id: string, data: InterfaceProps, projectId: string) {
  return request<API.InterfaceInfo>(`/interface/update`,{
    method: 'POST',
    data: {interfaceId: id, data: data, projectId: projectId},
  });
}

// 添加接口: 项目的id, 接口信息, 目录的id
export async function addInterface(id: string, data: InterfaceProps) {
  return request<API.InterfaceInfo>(`/interface/create`, {
    method: 'POST',
    data: {
      projectId: id,
      data: data,
    }
  })
}

// export async function reqGetTreeNode(){
//     return request(`/interfaceList`, {
//         method: 'GET',
//     });
// }
export async function getAllInterface(id: string) {
  return request<API.InterfaceList>(`/interface/getAllInterface?projectId=${id}`, {
    method: 'GET',
  });
}

export async function interfaceAddFiles(name:string, id:string){
    return request(`/interface/interfaceFilesAdd`, {
        method: 'POST',
        data: {name: name, projectId: id},
    });
}

export async function reqUpdateTreeNode(name:string,key: number){
    return request(`/interface`, {
        method: 'POST',
    });
}

export async function reqDeleteTreeNode(name:string,key: number){
    return request(`/interface/`, {
        method: 'POST',
    });
}

export async function getInterfaceResult(id: string, options: any){
  return request(`/mock/${id}`, {
    ...options
  })
}
