import { ReqType } from '@/models/interfaceModel';
import {
  getInterfaceInfo,
  getInterfaceResult,
} from '@/services/demo/interfaceController';

import { Button, Col, Input, Row, Tabs, message } from 'antd';
import { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import style from './index.less';
import Request from '../InterfaceEdit/request';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

// 一个独立的测试页面
export default function InterfaceTest({ id }: { id?: string }) {
  const [body, setBody] = useState<string>('');

  const [url, setUrl] = useState<string>('');
  const [method, setMethod] = useState<string>('GET');
  //// 请求参数body的类型
  const [reqBodyType, setReqBodyType] = useState<string>('form-data');
  // 请求参数的几个表格
  const [reqParams, setReqParams] = useState<readonly ReqType[]>([]);
  const [reqBody, setReqBody] = useState<readonly ReqType[]>([]);
  const [reqCookie, setReqCookie] = useState<readonly ReqType[]>([]);
  const [reqHeader, setReqHeader] = useState<readonly ReqType[]>([]);
  const props = {
    reqBody,
    setReqBody,
    reqParams,
    setReqParams,
    reqCookie,
    setReqCookie,
    reqHeader,
    setReqHeader,
    reqBodyType,
    setReqBodyType,
  };

  // 根据id进行请求
  useEffect(() => {
    const init = async () => {
      // 传id表示要测试指定的接口，不传可以测试任意接口
      if (typeof id !== 'undefined') {
        const result = await getInterfaceInfo(id);
        if (result.code === 200) {
          const data = result.data;
          setMethod(data.method)
          setUrl(data.url)
          setReqBody(data.reqBody)
          setReqParams(data.reqParams)
          setReqHeader(data.reqHeader)
          setReqCookie(data.reqCookie)
          setReqBodyType(data.reqBodyType)
        } else {
          message.error(result.msg);
        }
      }
    };
    init();
  }, [id]);
  const test = async () => {
    if (typeof id !== 'undefined') {
      const result = await getInterfaceResult(id);
      if (result.code !== 200) {
        message.error(result.msg);
      } else {
        // 第三个参数控制缩进量，不写的话 ace-editor无法换行
        setBody(JSON.stringify(result.data, null, 4));
      }
    }
  };
  const items = [
    {
      key: '1',
      label: '返回响应',
      children: (
        <AceEditor
          width="100%"
          height="100vh"
          mode="json"
          theme="monokai"
          name="blah2"
          fontSize={12}
          value={body}
          setOptions={{
            showLineNumbers: true,
            wrap: true,
            tabSize: 4,
            useWorker: false
          }}
        />
      ),
    },
    {
      key: '2',
      label: '实际请求',
      children: <></>,
    },
  ];
  return (
    <div className={style.box}>
      <Row>
        <Col span={17}>
          <Input
            addonBefore={method || 'GET'}
            value={
              `http://127.0.0.1:3000/mock${url}` 
            }
          />
        </Col>
        <Col span={4} offset={2}>
          <Button type="primary" onClick={test}>
            开始测试
          </Button>
        </Col>
      </Row>
      <Row style={{marginTop: '20px'}}>
        <Request {...props} />
      </Row>
      <Tabs defaultActiveKey="1" items={items} style={{ marginTop: '20px' }} />
    </div>
  );
}
