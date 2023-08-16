import { useState } from 'react';
export type ReqType = {
  id: React.Key;
  name?: string;
  type?: string;
  des?: string;
  mock?: string;
};

export type ResBodyType = {
  [key: string]: string | number | boolean;
  id: number;
  type: string;
  element: string;
  mock: string;
  name: string;
  des: string;
  indent: number;
  child: boolean
};

export type ResInfo = {
  [key: string]: string | number | ResBodyType[];
  code: number;
  name: string;
  type: string;
  body: ResBodyType[];
};
export default function useInfaModel() {

  const [basicInfo, setBasicInfo] = useState({
    method: '',
    url: '',
    name: '',
    statu: '',
    director: '',
    des: '',
  });

  const [reqBodyType, setReqBodyType] = useState<string | number>('') 
  const [reqParams, setReqParams] = useState<readonly ReqType[]>([]);
  const [reqBody, setReqBody] = useState<readonly ReqType[]>([]);
  const [reqCookie, setReqCookie] = useState<readonly ReqType[]>([]);
  const [reqHeader, setReqHeader] = useState<readonly ReqType[]>([]);

  const [resInfo, setResInfo] = useState<ResInfo[]>([
    { code: 200, name: '成功', type: 'json', body: [{
      id: 1,
      type: '',
      element: '',
      mock: '',
      name: '',
      des: '',
      indent: 0,
      child: false
    }] },
  ]);

  const [resBodyProxy, setResBodyProxy] = useState<ResBodyType[]>([]);

  // 当前选中的resbody
  const [resIndex, setResIndex] = useState<number>(0)

  return {
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
    setResIndex
  };
}
