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
  [key: string | number]: string | number | boolean | string[];
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

export interface InterfaceProps {
  method: string;
  url: string;
  name: string;
  statu: string;
  des: string;
  fileName: string;
  reqBodyType: string;
  reqBody: readonly ReqType[];
  reqParams: readonly ReqType[];
  reqHeader: readonly ReqType[];
  reqCookie: readonly ReqType[];
  resInfo: ResInfo[];

}
