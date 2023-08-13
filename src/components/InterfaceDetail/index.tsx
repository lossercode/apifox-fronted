import type { ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import type { DescriptionsProps } from 'antd';
import { Button, Descriptions, Form, Table } from 'antd';
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

  const [form] = Form.useForm<{ name: string; company: string }>();
  const changeInterface = (values: any) => {
    console.log('values=', values);
    return new Promise((resolve) => {
      request('http://localhost:3000/interface/update', {
        method: 'POST',
        data: {
          method: values.method,
          path: values.path,
          interfaceName: values.headerName,
          interfaceDes: values.headerNote,
          createTime: new Date(),
        },
      })
        .then((response) => {
          console.log('response=', response);
          resolve(true);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  };

  return (
    <>
      <div className={styles['basic-info']}>
        <div className={styles['basic-info-title']}>
          <h2>基本信息</h2>
          <ModalForm<{
            name: string;
            company: string;
          }>
            title="编辑接口"
            trigger={
              <Button type="primary" className={styles['search-button']}>
                编辑接口
              </Button>
            }
            form={form}
            autoFocusFirstInput
            modalProps={{
              destroyOnClose: true,
              onCancel: () => console.log('run'),
            }}
            submitTimeout={2000}
            onFinish={async (values) => {
              await changeInterface(values);
              console.log(values.headerName);
              message.success('提交成功');
              return true;
            }}
          >
            <ProForm.Group>
              <ProFormSelect
                request={async () => [
                  {
                    value: 'GET',
                    label: 'GET',
                  },
                  {
                    value: 'POST',
                    label: 'POST',
                  },
                  {
                    value: 'PUT',
                    label: 'PUT',
                  },
                  {
                    value: 'DELETE',
                    label: 'DELETE',
                  },
                ]}
                width="md"
                name="method"
                label="请求方法"
              />
              <ProFormText
                width="md"
                name="path"
                label="接口路径"
                placeholder="请输入接口路径"
              />
            </ProForm.Group>
            <h3>Headers</h3>
            <ProForm.Group>
              <ProFormText
                width="md"
                name="headerName"
                label="参数名称"
                placeholder="请输入参数名称"
              />
              <ProFormText
                width="md"
                name="type"
                label="类型"
                placeholder="请输入类型"
              />
              <ProFormText
                width="md"
                name="example"
                label="示例"
                placeholder="请输入示例"
              />
              <ProFormSelect
                request={async () => [
                  {
                    value: true,
                    label: '是',
                  },
                  {
                    value: false,
                    label: '否',
                  },
                ]}
                width="md"
                name="isHeaderNecessary"
                label="是否必须"
              />
              <ProFormText
                width="md"
                name="headerNote"
                label="备注"
                placeholder="请输入备注"
              />
            </ProForm.Group>
            <h3>Body</h3>
            <ProForm.Group>
              <ProFormText
                width="md"
                name="bodyName"
                label="参数名称"
                placeholder="请输入参数名称"
              />
              <ProFormText
                width="md"
                name="value"
                label="参数值"
                placeholder="请输入参数值"
              />
              <ProFormText
                width="md"
                name="default"
                label="默认值"
                placeholder="请输入默认值"
              />
              <ProFormSelect
                request={async () => [
                  {
                    value: true,
                    label: '是',
                  },
                  {
                    value: false,
                    label: '否',
                  },
                ]}
                width="md"
                name="isBodyNecessary"
                label="是否必须"
              />
              <ProFormText
                width="md"
                name="note"
                label="备注"
                placeholder="请输入备注"
              />
            </ProForm.Group>
          </ModalForm>
        </div>
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
