import { InterfaceProps } from './types';
import { addInterface, getInterfaceInfo, updateInterfaceInfo } from '@/services/demo/interfaceController';
import deepCopy from '@/utils/deepCopy';
import { useModel, useParams } from '@umijs/max';
import { Button, Col, Form, Input, Row, Select, message } from 'antd';
import { useEffect, useState } from 'react';
import Context from './context';
import styles from './index.less';
import Request from './request';
import { Response } from './res';
import { ReqType, ResBodyType, ResInfo } from './types';
import InterfaceShow from '@/pages/Project/Interface/Components/InterfaceShow';


/*
 * id: 接口id，如果不传，表示该组件在新建接口时使用，如果有值，表示是在更新操作
 */
export default function InterfaceEdit({ id }: { id?: string }) {
  const path = useParams();
  const { directory, setNeedFlush, tabItems, setTabItems, setActiveTab, needFlush } =
    useModel('interfaceShowModel', (model) => model);

  // 是否展示删除按钮
  const [showDelete, setShowDelete] = useState(true);

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

  // 设置一个代理，直接修改resInfo涉及到很多嵌套比较麻烦
  // 加载时将当前选中的resInfo的body赋值给它，点击提交时再把该值赋值给resInfo
  const [resBodyProxy, setResBodyProxy] = useState<ResBodyType[]>([]);
  // 当前选中的resbody
  const [resCurrentIndex, setResCurrentIndex] = useState<number>(0);

  const [resInfo, setResInfo] = useState<ResInfo[]>([
    {
      code: 200,
      name: '成功',
      type: 'json',
      body: [],
    },
  ]);


  //组件加载时赋初始值
  const init = (data: InterfaceProps) => {
    setMethod(data.method);
    setUrl(data.url);
    setName(data.name);
    setDes(data.des);
    setStatu(data.statu);
    setReqBodyType(data.reqBodyType);
    setReqBody(data.reqBody);
    setReqParams(data.reqParams);
    setReqCookie(data.reqCookie);
    setReqHeader(data.reqHeader);
    setResInfo(data.resInfo);
    setResBodyProxy(data.resInfo[0].body);
  };

  // 获取当前状态下的所有值
  const getValue = (): InterfaceProps => {
    // 将代理数组的值赋给当前的body
    const body = [...resBodyProxy];
    const res: any = deepCopy(resInfo);
    res[resCurrentIndex].body = body;
    setResInfo([...res]);
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
      fileName: directory ? directory : '根目录'
    };
    return data;
  };
  // useEffect(() => {
  //   const mount = async () => {
  //     if (typeof id === 'undefined') {
  //       setShowDelete(false);
  //     } else {
  //       const result = await getInterfaceInfo(id);
  //       if (result.code === 200) {
  //         const data = result.data;
  //         init(data);
  //       } else {
  //         message.error(result.msg);
  //       }
  //     }
  //   };
  //   mount()
  // },[])

  useEffect(() => {
    const mount = async () => {
      if (typeof id === 'undefined') {
        setShowDelete(false);
      } else {
        const result = await getInterfaceInfo(id);
        if (result.code === 200) {
          const data = result.data;
          init(data);
        } else {
          message.error(result.msg);
        }
      }
    };
    mount();
  }, [id]);

  const methods = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'TRACE',
    'CONNECT',
    'OPTIONS',
  ];


  const save = async () => {
    const data = getValue();
    console.log('当前要传递的数据为', data)
    let result = null;
    // 如果有id表示更新, 没有id表示新建
    if (typeof id !== 'undefined') {
      result = await updateInterfaceInfo(id, data, path.id as string);
      if (result.code !== 200) {
        message.error(result.msg);
      } else {
        message.success('更新成功');
        setNeedFlush(!needFlush);
      }
    } else {
      result = await addInterface(path.id as string, data);
      if (result.code !== 200) {
        message.error(result.msg);
      } else {
        message.success('新建成功');
        // 刷新目录页面
        setNeedFlush(!needFlush);
        // 跳到详情页
        setTabItems([
          ...tabItems.slice(0, tabItems.length-1),
          {
            key: `${tabItems.length}`,
            label: `${method}|${name}`,
            children: <InterfaceShow id={result.data.id} />,
          },
        ]);
        setActiveTab(`${tabItems.length}`)
      }
    }
  };

  const props = {
    reqBodyType,
    setReqBodyType,
    reqBody,
    setReqBody,
    reqCookie,
    setReqCookie,
    reqHeader,
    setReqHeader,
    reqParams,
    setReqParams,
  };

  return (
    <div className={styles['container']}>
      <Context.Provider
        value={{
          resInfo,
          setResInfo,
          resBodyProxy,
          setResBodyProxy,
          resCurrentIndex,
          setResCurrentIndex,
        }}
      >
        <Form >
          <Row>
            <Col span={17}>
              <Form.Item>
                <Input
                  addonBefore={
                    <Select
                      defaultValue={method || 'GET'}
                      popupMatchSelectWidth={120}
                      onChange={setMethod}
                    >
                      {methods.map((method) => (
                        <Select.Option value={method} key={method}>
                          {method}
                        </Select.Option>
                      ))}
                    </Select>
                  }
                  onBlur={(e) => setUrl(e.target.value)}
                  // 注意要加一个key, 不然获取不到值，因为是异步请求数据
                  key={url}
                  defaultValue={url}
                />
              </Form.Item>
            </Col>
            <Col span={2} offset={1} className={styles.right}>
              <Button type="primary" onClick={save}>
                保存
              </Button>
            </Col>
            <Col span={2} className={styles.right}>
              <Button>运行</Button>
            </Col>
            {showDelete ? (
              <Col span={2} className={styles.right}>
                <Button danger type="primary">
                  删除
                </Button>
              </Col>
            ) : null}
          </Row>

          <Row>
            <Col span={8}>
              <Form.Item label="接口名称" name='name'>
                <Input
                  onBlur={(e) => setName(e.target.value)}
                  key={name}
                  defaultValue={name}
                />
              </Form.Item>
            </Col>
            <Col span={6} offset={2}>
              <Form.Item label="接口状态">
                <Select onChange={setStatu} defaultValue={statu}>
                  <Select.Option value="open">开发中</Select.Option>
                  <Select.Option value="closed">已发布</Select.Option>
                  <Select.Option value="test">测试中</Select.Option>
                  <Select.Option value="abolish">已废弃</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="接口描述" name='des'>
            <Input.TextArea
              onBlur={(e) => setDes(e.target.value)}
              key={des}
              defaultValue={des}
            />
          </Form.Item>
        </Form>

        <Request {...props}/>

        <Response />
      </Context.Provider>
    </div>
  );
}
