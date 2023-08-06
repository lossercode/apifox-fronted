import { EnvironmentFilled } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Button, Menu } from 'antd';
import { useState } from 'react';
import { Outlet } from 'umi';
import styles from './index.less';

export default function Page() {
  const [current, setCurrent] = useState('interface');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const items: MenuProps['items'] = [
    {
      label: '接口',
      key: 'interface',
    },
    {
      label: '操作日志',
      key: 'operationlog',
    },
    {
      label: '数据导入',
      key: 'dataimport',
    },
    {
      label: '成员管理',
      key: 'membermanage',
    },
    {
      label: '信息管理',
      key: 'infomanage',
    },
    {
      label: '环境配置',
      key: 'enviromentconfig',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles['container-breadcrumb']}>
        <Breadcrumb
          items={[
            {
              href: '',
              title: (
                <>
                  <EnvironmentFilled />
                  <span>项目管理</span>
                </>
              ),
            },
            {
              title: '项目详情',
            },
          ]}
        />
        <div className={styles['container-info']}>
          <Button className={styles['signout-button']} type="primary">
            退出登录
          </Button>
          <span className={styles['username']}>张三</span>
        </div>
      </div>
      <div>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          className={styles['container-menu']}
        />
      </div>
      <Outlet />
    </div>
  );
}
