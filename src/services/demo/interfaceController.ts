import { request } from '@umijs/max';
import { API } from './typings';


// 获取所有接口
export async function getAllInterface(id: number) {
    return request<API.InterfaceList>(`/interface/getAllInterface?id=${id}`, {
      method: 'GET',
    });
  }

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
  });
}


// export async function reqGetTreeNode(){
//     return request(`/interfaceList`, {
//         method: 'GET',
//     });
// }


export async function interfaceAddFiles(name:string){
    return request(`/interface/interfaceFilesAdd`, {
        method: 'POST',
        data: {name: name},
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