import { InterfaceProps } from '@/models/interfaceModel';
import {
  getInterfaceInfo,
  getInterfaceResult,
} from '@/services/demo/interfaceController';

import { Button, Col, Input, Row, Tabs, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import style from './index.less';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

export default function InterfaceTest({ id }: { id: string }) {

  const [data, setData] = useState<InterfaceProps>();
//   const [result, setResult] = useState();
//   const [requestCode, setRequestCode] = useState();
const result = useRef('{}')
  // 根据id进行请求
  useEffect(() => {
    const init = async () => {
      const result = await getInterfaceInfo(id);
      if (result.code === 200) {
        setData(result.data);
      } else {
        message.error(result.msg);
      }
    };
    init();
  }, [id]);
  const test = async () => {
    const result = await getInterfaceResult(id);
    if (result.code !== 200) {
      message.error(result.msg);
    } else {
      const data = result.data;
      result.current = data
    }
  };
  const items = [
    {
      key: '1',
      label: '返回响应',
      children: (
        <AceEditor
            style={{width: '100%'}}
            mode="javascript"
            theme="monokai"
            name="blah2"
            fontSize={16}
            value={result.current}
            setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 4,
            }}/>
      ),
    },
    {
      key: '2',
      label: '实际请求',
      children: (
        <></>
      ),
    },
  ];
  return (
    <div className={style.box}>
      <Row>
        <Col span={17}>
          <Input
            addonBefore={data?.method || 'GET'}
            value={data?.url || 'http://localhost'}
          />
        </Col>
        <Col span={4} offset={2}>
          <Button type="primary" onClick={test}>
            开始测试
          </Button>
        </Col>
      </Row>
      <Tabs defaultActiveKey="1" items={items} style={{ marginTop: '20px' }} />
      
    </div>
  );
}
