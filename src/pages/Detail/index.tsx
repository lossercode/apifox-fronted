import InterfaceDetail from '@/components/InterfaceDetail';
import MockService from '@/components/MockService';
import { CloseOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import type { TabsProps } from 'antd';
import { Button, Form, Input, Tabs, message } from 'antd';
import { useEffect } from 'react';
import { request, useParams } from 'umi';
import styles from './index.less';

const InterfacePage: React.FC = () => {
  const { id } = useParams();
  console.log('id=', id);
  useEffect(() => {
    request(`http://localhost:3000/project/interface?projectId=${id}`)
      .then((response) => {
        console.log('response=', response);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const createInterface = (values: any) => {
    console.log('values=', values);
    return new Promise((resolve) => {
      request('http://localhost:3000/interface/create', {
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
  const [form] = Form.useForm<{ name: string; company: string }>();
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '接口详情',
      children: <InterfaceDetail />,
    },
    {
      key: '2',
      label: '编辑',
    },
    {
      key: '3',
      label: '测试',
    },
    {
      key: '4',
      label: 'Mock服务',
      children: <MockService />,
    },
  ];

  const handleDelete = () => {
    console.log('delete');
  };

  return (
    <div className={styles['detail-container']}>
      <div className={styles['detail-container-left']}>
        <div className={styles['interface-list']}>接口列表</div>
        <div className={styles.search}>
          <Input className={styles['search-input']} placeholder="搜索接口" />
          <ModalForm<{
            name: string;
            company: string;
          }>
            title="新建接口"
            trigger={
              <Button type="primary" className={styles['search-button']}>
                新建接口
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
              await createInterface(values);
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
        <div className={styles['interface-container']}>
          <div className={styles['init-interface']}>
            <span className={styles['init-interface-font']}>初始接口1</span>
            <span
              className={styles['init-interface-icon']}
              onClick={handleDelete}
            >
              <CloseOutlined />
            </span>
          </div>
        </div>
      </div>
      <div className={styles['detail-container-right']}>
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
};

export default InterfacePage;
