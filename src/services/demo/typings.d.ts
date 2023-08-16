/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
<<<<<<< HEAD
  interface LoginParams {
    username: string;
    password: number;
  }

  interface LoginRespnse {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  interface createProjectInfo {
=======
  interface loginParams {
    userAccount: string;
    userPassword: number;
  }

  interface loginRespnse {
    code: number;
    data: Record<string, any>;
    msg: string;
  }

  interface projectList{
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
>>>>>>> fy
    projectName: string;
    projectDesc: string;
  }

  interface createProjectResponse {
    code: number;
    msg: string;
    data: Record<string, any>;
  }

<<<<<<< HEAD
  interface Result_PageInfo_UserInfo__ {
    success?: boolean;
    errorMessage?: string;
    data?: PageInfo_UserInfo_;
  }

  interface Result_UserInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: UserInfo;
  }

  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }
=======

>>>>>>> fy
}
