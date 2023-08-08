import type { DescriptionsProps } from 'antd';
import { Descriptions, Table } from 'antd';
import styles from './index.less';

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

  const columns1 = [
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

  const columns2 = [
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

  const columns3 = [
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
          <Table columns={columns1} />
          <h3 className={styles['data-body']}>Body:</h3>
          <Table columns={columns2} />
        </div>
      </div>
      <div className={styles['return-data']}>
        <h2>返回数据</h2>
        <Table className={styles['return-data-table']} columns={columns3} />
      </div>
    </>
  );
};

export default InterfaceDetail;
