import { getInterfaceInfo } from '@/services/demo/interfaceController';
import { Badge, Card, Descriptions, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import styles from './index.less';
import { API } from '@/services/demo/typings';
import type { ColumnsType } from 'antd/es/table';
import { ReqType } from '@/models/interfaceModel';

export const InterfaceDetail = ({id}: {id: number}) => {
  const {
    setMethod,
    setBasicInfo,
    basicInfo,
    setReqParams,
    setReqBody,
    setReqCookie,
    setReqHeader,
    setResInfo,
  } = useModel('interfaceModel', (model) => model);

  // 注意不能用数据流中的数据
  const [data, setData] = useState<API.InterfaceInfoData>({
    method: '',
    basicInfo: {
      url: '',
      name: '',
      statu: '',
      director: '',
      des: ''
    },
    reqBodyType: 'json',
    reqBody: [],
    reqCookie: [],
    reqHeader: [],
    reqParams: [],
    resInfo: []
  }
  )
  // 
  useEffect(() => {
    const init = async () => {
      const data = await getInterfaceInfo(1);
      const interfaceInfo = data.data;
      setData(interfaceInfo)
      console.log(interfaceInfo);
      setMethod(interfaceInfo.method);
      setBasicInfo(interfaceInfo.basicInfo);
      setReqParams(interfaceInfo.reqParams);
      setReqBody(interfaceInfo.reqBody);
      setReqCookie(interfaceInfo.reqCookie);
      setReqHeader(interfaceInfo.reqHeader);
      setResInfo(interfaceInfo.resInfo);
    };
    init();
  }, [id]);

  const columns: ColumnsType<ReqType> = [
    {
      title: '参数名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '示例值',
      dataIndex: 'mock',
      key: 'mock',
      render: (value) => value.map((item: {id: number, label: string}) => <Tag key={item.id}>{item.label}</Tag> )
    },
    {
      title: '描述',
      dataIndex: 'des',
      key: 'des',
    },
  ];
  return (
    <div className={styles['basic-info']}>
      <Card bordered={false} className={styles.card}>
        <Descriptions title="基本信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="接口名称">
            {data?.basicInfo.name}
          </Descriptions.Item>
          <Descriptions.Item label="接口状态">
            <Badge key="green" color="green" text={basicInfo.statu} />
          </Descriptions.Item>
          <Descriptions.Item label="负责人">
            {data?.basicInfo.name}
          </Descriptions.Item>
          <Descriptions.Item label="接口方法">
            <Badge
              className="site-badge-count-109"
              count={data?.method}
              style={{ backgroundColor: '#52c41a' }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="接口路径">
            {data?.basicInfo.url}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card bordered={false} className={styles.card}>
        <Descriptions title="请求参数" style={{ marginBottom: 0 }}>
        </Descriptions>
        {
          data?.reqBody?.length > 0 ? (
            <>
              <h4>Body</h4>
              <Table columns={columns} dataSource={data.reqBody}/>
            </>
          ) : null
        }
        {
          data?.reqHeader?.length > 0 ? (
            <>
              <h4>Header</h4>
              <Table columns={columns} dataSource={data.reqHeader}/>
            </>
          ) : null
        }
        {
        data?.reqParams?.length > 0 ? (
            <>
              <h4>Params</h4>
              <Table columns={columns} dataSource={data.reqParams}/>
            </>
          ) : null
        }
        {
          data?.reqCookie?.length > 0 ? (
            <>
              <h4>Cookie</h4>
              <Table columns={columns} dataSource={data.reqCookie}/>
            </>
          ) : null
        }
      </Card>

      <Card bordered={false} className={styles.card}>
        <Descriptions title="返回响应" style={{ marginBottom: 32 }}>
        </Descriptions>
        <Table></Table>
      </Card>
    </div>
  );
};

export default InterfaceDetail;
