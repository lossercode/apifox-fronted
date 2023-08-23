import deepCopy from '@/utils/deepCopy';
import { useState } from 'react';

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
  mock: string;
  name: string;
  des: string;
  // 缩进，当有子节点的时候需要设置缩进
  indent: number;
  child: boolean;
  // 是否允许添加节点，当类型为数组时不能
  showAction: boolean;
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

export interface InterfaceProps{
  method: string;
  url: string;
  name: string;
  statu: string;
  des: string;
 
  reqBodyType: string;
  reqBody: readonly ReqType[]
  reqParams: readonly ReqType[]
  reqHeader: readonly ReqType[]
  reqCookie: readonly ReqType[]
  resInfo: ResInfo[]
}
export default function useInfaModel() {
  // 基本信息
  const [method, setMethod] = useState<string>('GET');
  const [url, setUrl] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [statu, setStatu] = useState<string>('open');
  const [des, setDes] = useState<string>('');
  
  // 请求参数body的类型
  const [reqBodyType, setReqBodyType] = useState<string>('form-data');
  // 请求参数的几个表格
  const [reqParams, setReqParams] = useState<readonly ReqType[]>([]);
  const [reqBody, setReqBody] = useState<readonly ReqType[]>([]);
  const [reqCookie, setReqCookie] = useState<readonly ReqType[]>([]);
  const [reqHeader, setReqHeader] = useState<readonly ReqType[]>([]);

  const [resInfo, setResInfo] = useState<ResInfo[]>([
    {
      code: 200,
      name: '成功',
      type: 'json',
      body: [],
    },
  ]);
  // 设置一个代理，直接修改resInfo涉及到很多嵌套比较麻烦
  // 加载时将当前选中的resInfo的body赋值给它，点击提交时再把该值赋值给resInfo
  const [resBodyProxy, setResBodyProxy] = useState<ResBodyType[]>([]);
  // 当前选中的resbody
  const [resCurrentIndex, setResCurrentIndex] = useState<number>(0);
  
  //组件加载时赋初始值
  const init = (data: InterfaceProps) => {
    setMethod(data.method)
    setUrl(data.url)
    setName(data.name)
    setDes(data.des)
    setStatu(data.statu)
    setReqBodyType(data.reqBodyType)
    setReqBody(data.reqBody)
    setReqParams(data.reqParams)
    setReqCookie(data.reqCookie)
    setResInfo(data.resInfo)
  }
  // 组件销毁时把值变成默认值，防止没有及时更新
  const destroy = () => {
    setMethod('GET')
    setUrl('')
    setName('')
    setDes('')
    setStatu('open')
    setReqBodyType('form-data')
    setReqBody([])
    setReqParams([])
    setReqCookie([])
    setResInfo([
      {
        code: 200,
        name: '成功',
        type: 'json',
        body: [],
      }
    ])
  }
  // 获取当前状态下的所有值
  const getValue = () : InterfaceProps => {
    // 将代理数组的值赋给当前的body
    const body = [...resBodyProxy]
    const res: any = deepCopy(resInfo)
    res[resCurrentIndex].body = body
    setResInfo([...res])
    const data: InterfaceProps = {
      url: url,
      method: method,
      name: name,
      des: des,
      statu: statu,
      reqBodyType: reqBodyType,
      reqBody: reqBody,
      reqParams: reqParams,
      reqCookie: reqCookie,
      reqHeader: reqHeader,
      resInfo: res,
    }
    return data
  }

  // 接口编辑页面专属的状态，其它页面使用时注意要保持状态回归到最初的状态
  return {
    method,
    setMethod,
    url,
    setUrl,
    name,
    setName,
    statu,
    setStatu,
    des, 
    setDes,
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
    resCurrentIndex,
    setResCurrentIndex,
    init,
    destroy,
    getValue
  };
}
