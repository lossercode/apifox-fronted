import { useState } from 'react';
// 接口基础信息
export type BasicInfoType = {
  url: string;
  name: string;
  statu: string;
  director: string;
  des: string;
};
// 请求参数的表格字段名称
export type ReqType = {
  id: React.Key;
  name?: string;
  type?: string;
  des?: string;
  mock?: { id: number; label: string }[];
};

// 响应体表格的参数
export type ResBodyType = {
  [key: string]: string | number | boolean | string[];
  id: number;
  type: string;
  element: string;
  mock: '';
  name: string;
  des: string;
  // 缩进，当有子节点的时候需要设置缩进
  indent: number;
  child: boolean;
};

// 响应体的基本信息，可以设置多个响应体
export type ResInfo = {
  [key: string]: string | number | ResBodyType[];
  // 响应码
  code: number;
  // 响应体的名称
  name: string;
  // 响应类型：json / xml
  type: string;
  // 响应体的具体数据
  body: ResBodyType[];
};
export default function useInfaModel() {
  const [method, setMethod] = useState<string>('');
  const [basicInfo, setBasicInfo] = useState<BasicInfoType>({
    url: '',
    name: '',
    statu: '',
    director: '',
    des: '',
  });
  const [reqBodyType, setReqBodyType] = useState<string | number>('');
  const [reqParams, setReqParams] = useState<readonly ReqType[]>([]);
  const [reqBody, setReqBody] = useState<readonly ReqType[]>([]);
  const [reqCookie, setReqCookie] = useState<readonly ReqType[]>([]);
  const [reqHeader, setReqHeader] = useState<readonly ReqType[]>([]);

  const [resInfo, setResInfo] = useState<ResInfo[]>([
    {
      code: 200,
      name: '成功',
      type: 'json',
      body: [
        {
          id: 1,
          type: '',
          element: '',
          mock: '',
          name: '',
          des: '',
          indent: 0,
          child: false,
        },
      ],
    },
  ]);
  // 设置一个代理，直接修改resInfo涉及到很多嵌套比较麻烦
  // 加载时将当前选中的resInfo的body赋值给它，点击提交时再把该值赋值给resInfo
  const [resBodyProxy, setResBodyProxy] = useState<ResBodyType[]>([]);

  // 当前选中的resbody
  const [resIndex, setResIndex] = useState<number>(0);

  return {
    method,
    setMethod,
    basicInfo,
    setBasicInfo,
    reqParams,
    setReqParams,
    reqBody,
    setReqBody,
    reqBodyType,
    setReqBodyType,
    reqCookie,
    setReqCookie,
    reqHeader,
    setReqHeader,
    resInfo,
    setResInfo,
    resBodyProxy,
    setResBodyProxy,
    resIndex,
    setResIndex,
  };
}
