/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  interface LoginParams {
    username: string;
    password: number;
  }

  interface LoginRespnse {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

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
}
