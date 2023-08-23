import { getInterfaceInfo } from '@/services/demo/interfaceController';
import { Badge, Card, Descriptions, Table, Tag, message } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import type { ColumnsType } from 'antd/es/table';
import { InterfaceProps, ReqType, ResBodyType } from '@/models/interfaceModel';
import { parseBodyToJson } from '@/utils/parseBody';
import { Body } from '@/components/InterfaceEdit/body';

// 接口的id
export const InterfaceDetail = ({id}: {id: string}) => {
  
  // 注意不能用数据流中的数据, 避免状态混乱
  const [data, setData] = useState<InterfaceProps | null>(null)
  const [body, setBody] = useState<ResBodyType[]>([])
  // 
  useEffect(() => {
    const init = async () => {
      const result = await getInterfaceInfo(id);
      if(result.code === 200){
        const interfaceInfo = result.data;
        // 解析body
        const body = result.data.resInfo[0].body
        setBody(body)
        setData(interfaceInfo)
      }else{
        message.error(result.msg)
      }
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
    // {
    //   title: '示例值',
    //   dataIndex: 'mock',
    //   key: 'mock',
    //   render: (value) => value.map((item: {id: number, label: string}) => <Tag key={item.id}>{item.label}</Tag> )
    // },
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
            {data?.name}
          </Descriptions.Item>
          <Descriptions.Item label="接口状态">
            <Badge key="green" color="green" text={data?.statu} />
          </Descriptions.Item>
          <Descriptions.Item label="接口方法">
            <Badge
              className="site-badge-count-109"
              count={data?.method}
              style={{ backgroundColor: '#52c41a' }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="接口路径">
            {data?.url}
          </Descriptions.Item>
          <Descriptions.Item label="接口描述">
            {data?.des}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card bordered={false} className={styles.card}>
        <Descriptions title="请求参数" style={{ marginBottom: 0 }}>
        </Descriptions>
        {
          data?.reqBody.length ? (
            <>
              <h4>Body</h4>
              <Table columns={columns} dataSource={data.reqBody}/>
            </>
          ) : null
        }
        {
          data?.reqHeader.length ? (
            <>
              <h4>Header</h4>
              <Table columns={columns} dataSource={data.reqHeader}/>
            </>
          ) : null
        }
        {
        data?.reqParams.length ? (
            <>
              <h4>Params</h4>
              <Table columns={columns} dataSource={data.reqParams}/>
            </>
          ) : null
        }
        {
          data?.reqCookie.length ?  (
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
        <Body initValue={body}/>
      </Card>
    </div>
  );
};

export default InterfaceDetail;
