import InterfaceDetail from '@/components/InterfaceDetail';
import MockService from '@/components/MockService';
import { CloseOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { Button, Input, Tabs } from 'antd';
import styles from './index.less';

const InterfacePage: React.FC = () => {
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

  return (
    <div className={styles['detail-container']}>
      <div className={styles['detail-container-left']}>
        <div className={styles['interface-list']}>接口列表</div>
        <div className={styles.search}>
          <Input className={styles['search-input']} placeholder="搜索接口" />
          <Button type="primary" className={styles['search-button']}>
            添加接口
          </Button>
        </div>
        <div className={styles['interface-container']}>
          <div className={styles['init-interface']}>
            <span>初始接口1</span>
            <CloseOutlined />
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
