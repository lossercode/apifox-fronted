import { API } from '@/services/demo/typings';
import { PresetStatusColorType } from 'antd/es/_util/colors';
import { useState } from 'react';
// 接口基础信息
export type BasicInfoType = {
    url: string;
    name: string;
    status: PresetStatusColorType;
    text: string;
    director: string;
    des?: string;
  };
  export type TempInterfaceType = {
    method: string,
    basicInfo: BasicInfoType,
    reqParams?: ReqType[],
    reqBody?: ResBodyType[],
    reqCookie?: [],
    reqHeader?: [],
    resInfo?: [],
  };

  export type ReqType = {
    id: React.Key;
    name?: string;
    type?: string;
    des?: string;
    mock?: { id: number; label: string }[];
  };

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
const [addInterfaceMode,setAddInterfaceMode] = useState<boolean>(true);
const [method, setMethod] = useState<string>('');

const [tempInterface, setTempInterface] = useState<API.InterfaceInfoData>({
    method: '',
    basicInfo: {
      url: '',
      name: '',
      status: 'default',
        text: '',
      director: '',
    },
    reqParams: [],
    reqBody: [],
    reqCookie: [],
    reqHeader: [],
    resInfo: [],
  })


const [basicInfo, setBasicInfo] = useState<BasicInfoType>({
    url: '',
    name: '',
    status: "default",
    text:'',
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

  const [interfaceId, setInterfaceId] = useState<number>(0)

  return {
    addInterfaceMode,
    setAddInterfaceMode,
    interfaceId,
    setInterfaceId,
    tempInterface,
    setTempInterface,
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