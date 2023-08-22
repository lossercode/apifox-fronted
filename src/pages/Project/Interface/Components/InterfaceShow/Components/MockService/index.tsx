import {
  EditableProTable,
  ModalForm,
  ProColumns,
  ProForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import { useRef, useState } from 'react';
import styles from './index.less';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type ExpectationType = {
  id: React.Key;
  title?: string;
  address?: string;
  creator?: string;
  edited_at?: string;
  children?: ExpectationType[];
};

const defaultData: ExpectationType[] = [
  {
    id: 624748504,
    title: '添加用户admin',
    address: 'https://pines.ca/mock/100/admin/add',
    creator: '张三',
    edited_at: '1590486176000',
  },
];

const columns: ProColumns<DataSourceType>[] = [
  {
    title: '参数名称',
    dataIndex: 'name',
    width: '50%',
  },
  {
    title: '参数值',
    dataIndex: 'value',
    width: '50%',
  },
];

const MockService: React.FC = () => {
  const [modalVisit, setModalVisit] = useState(false);
  const [form] = Form.useForm<{ name: string; company: string }>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );
  const formRef = useRef<ProFormInstance<any>>();
  const editorFormRef = useRef<EditableFormInstance<ExpectationType>>();
  const mockColumns: ProColumns<ExpectationType> = [
    {
      title: '期望简介',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'mock地址',
      dataIndex: 'address',
      key: 'address',
      width: '30%',
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '编辑时间',
      dataIndex: 'edited_at',
      key: 'edited_at',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record) => [
        <a
          key="editable"
          onClick={() => {
            setModalVisit(true);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            const tableDataSource = formRef.current?.getFieldValue(
              'table',
            ) as DataSourceType[];
            formRef.current?.setFieldsValue({
              table: tableDataSource.filter((item) => item.id !== record.id),
            });
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  return (
    <>
      <ModalForm<{
        introduction: string;
      }>
        className={styles['expectation-modal']}
        {...formItemLayout}
        layout="LAYOUT_TYPE_HORIZONTAL"
        title="添加期望/编辑期望"
        open={modalVisit}
        onOpenChange={setModalVisit}
        trigger={
          <Button type="primary" className={styles['add-button']}>
            添加期望
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
          await waitTime(2000);
          console.log(values.name);
          message.success('提交成功');
          return true;
        }}
      >
        <h2>基本信息</h2>
        <ProFormText
          width="md"
          name="introduction"
          label="期望简介"
          placeholder="请输入名称"
        />
        <ProFormSelect
          request={async () => [
            {
              value: 'json',
              label: 'JSON',
            },
          ]}
          width="sm"
          name="paramType"
          label="请求参数类型"
        />
        <ProForm.Item
          className={styles['response-table']}
          label="期望参数"
          name="dataSource"
          initialValue={defaultData}
          trigger="onValuesChange"
        >
          <EditableProTable<DataSourceType>
            rowKey="id"
            toolBarRender={false}
            columns={columns}
            recordCreatorProps={{
              newRecordType: 'dataSource',
              position: 'bottom',
              record: () => ({
                id: Date.now(),
                addonBefore: 'ccccccc',
                decs: 'testdesc',
              }),
            }}
            editable={{
              type: 'multiple',
              editableKeys,
              onChange: setEditableRowKeys,
              actionRender: (row, _, dom) => {
                return [dom.delete];
              },
            }}
          />
        </ProForm.Item>
        <h2>响应</h2>
        <ProFormSwitch name="isRandomCode" label="是否支持随机响应码" />
        <ProFormSelect
          request={async () => [
            {
              value: '200',
              label: '200',
            },
          ]}
          width="sm"
          name="responseCode"
          label="响应码"
        />
        <ProForm.Item
          className={styles['response-table']}
          label="HTTP头"
          name="dataSource"
          initialValue={defaultData}
          trigger="onValuesChange"
        >
          <EditableProTable<DataSourceType>
            rowKey="id"
            toolBarRender={false}
            columns={columns}
            recordCreatorProps={{
              newRecordType: 'dataSource',
              position: 'bottom',
              record: () => ({
                id: Date.now(),
                addonBefore: 'ccccccc',
                decs: 'testdesc',
              }),
            }}
            editable={{
              type: 'multiple',
              editableKeys,
              onChange: setEditableRowKeys,
              actionRender: (row, _, dom) => {
                return [dom.delete];
              },
            }}
          />
        </ProForm.Item>
        <ProFormSelect
          request={async () => [
            {
              value: 'json',
              label: 'JSON',
            },
          ]}
          width="sm"
          name="dataType"
          label="返回数据类型"
        />
        <ProForm.Item
          className={styles['response-table']}
          label="期望响应"
          name="dataSource"
          initialValue={defaultData}
          trigger="onValuesChange"
        >
          <EditableProTable<DataSourceType>
            rowKey="id"
            toolBarRender={false}
            columns={columns}
            recordCreatorProps={{
              position: 'bottom',
            }}
            editable={{
              type: 'multiple',
              editableKeys,
              onChange: setEditableRowKeys,
              actionRender: (row, _, dom) => {
                return [dom.delete];
              },
            }}
          />
        </ProForm.Item>
        <ProFormSwitch name="isRandomCode" label="是否支持动态数据" />
      </ModalForm>
      <ProForm<{
        table: ExpectationType[];
      }>
        submitter={{
          // 配置按钮的属性
          resetButtonProps: {
            style: {
              // 隐藏重置按钮
              display: 'none',
            },
          },
          submitButtonProps: {
            style: {
              // 隐藏重置按钮
              display: 'none',
            },
          },
        }}
        formRef={formRef}
        initialValues={{
          table: defaultData,
        }}
        validateTrigger="onBlur"
      >
        <EditableProTable<ExpectationType>
          rowKey="id"
          scroll={{
            x: 960,
          }}
          editableFormRef={editorFormRef}
          maxLength={5}
          name="table"
          recordCreatorProps={false}
          columns={mockColumns}
        />
      </ProForm>
    </>
  );
};

export default MockService;
