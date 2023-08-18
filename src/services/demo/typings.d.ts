/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

import { BasicInfoType } from '@/models/interfaceModel';

declare namespace API {
  interface loginParams {
    userAccount: string;
    userPassword: number;
  }

  interface loginRespnse {
    code: number;
    data: Record<string, any>;
    msg: string;
  }

  interface projectList {
    id: number;
    projectName: string;
    projectDesc: string;
    projectCreator?: string;
    createdAt?: string;
    joinedAt?: string;
  }

  interface projectListResponse {
    data: ProjectList[];
  }

  type projectType = 0 | 1;

  interface createProjectParams {
    projectName: string;
    projectDesc: string;
  }

  interface createProjectResponse {
    code: number;
    msg: string;
    data: Record<string, any>;
  }

  interface InterfaceInfoData {
    method: string;
    basicInfo: BasicInfoType;
    reqBodyType: string;
    reqParams: ReqType[];
    reqBody: ReqType[];
    reqCookie: ReqType[];
    reqHeader: ReqType[];
    resInfo: ResInfoType;
  }
  interface InterfaceInfo {
    code: number,
    msg: string,
    data: InterfaceInfoData
  }
}
