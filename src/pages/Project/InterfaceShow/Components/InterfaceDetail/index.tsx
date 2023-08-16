import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import type { DescriptionsProps } from 'antd';
import { Descriptions, Table } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id: React.Key;
  title?: string;
  readonly?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  update_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [];

const ReqParaHead = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '参数名称',
      dataIndex: 'paraname',
      key: 'paraname',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '是否必须',
      dataIndex: 'isNecessary',
      key: 'isNecessary',
    },
    {
      title: '示例',
      dataIndex: 'example',
      key: 'example',
    },
    {
      title: '备注',
      dataIndex: 'note',
      key: 'note',
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        maxLength={5}
        loading={false}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};

const ReqParaBody = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '参数名称',
      dataIndex: 'paraname',
      key: 'paraname',
    },
    {
      title: '参数值',
      dataIndex: 'paravalue',
      key: 'paravalue',
    },
    {
      title: '是否必须',
      dataIndex: 'isNecessary',
      key: 'isNecessary',
    },
    {
      title: '默认值',
      dataIndex: 'default',
      key: 'default',
    },
    {
      title: '备注',
      dataIndex: 'note',
      key: 'note',
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        maxLength={5}
        loading={false}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};

const InterfaceDetail: React.FC = () => {
  const tabsItems: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '接口名称',
      children: '初始接口1',
    },
    {
      key: '2',
      label: '状态',
      children: '已完成',
    },
    {
      key: '3',
      label: '接口路径',
      children: '/api/admin/add',
    },
    {
      key: '4',
      label: 'Mock地址',
      children: 'https://pines.ca/mock/100/api/admin/add',
    },
    {
      key: '5',
      label: '创建人',
      children: '张三',
    },
    {
      key: '6',
      label: '更新时间',
      children: '2023-08-01 20:45:12',
    },
  ];

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '是否必须',
      dataIndex: 'isNecessary',
      key: 'isNecessary',
    },
    {
      title: '默认值',
      dataIndex: 'default',
      key: 'default',
    },
    {
      title: '备注',
      dataIndex: 'note',
      key: 'note',
    },
  ];

  return (
    <>
      <div className={styles['basic-info']}>
        <h2>基本信息</h2>
        <Descriptions
          className={styles['basic-info-description']}
          column={2}
          items={tabsItems}
        />
      </div>
      <div className={styles['request-para']}>
        <h2>请求参数</h2>
        <div className={styles['request-para-data']}>
          <h3>Headers:</h3>
          <ReqParaHead />
          <h3 className={styles['data-body']}>Body:</h3>
          <ReqParaBody />
        </div>
      </div>
      <div className={styles['return-data']}>
        <h2>返回数据</h2>
        <Table className={styles['return-data-table']} columns={columns} />
      </div>
    </>
  );
};

export default InterfaceDetail;
