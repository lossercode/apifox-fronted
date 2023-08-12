import { EnvironmentFilled } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Dropdown, Menu } from 'antd';
import { useState } from 'react';
import { Outlet, history } from 'umi';
import styles from './index.less';

export default function Page() {
  const [current, setCurrent] = useState('interface');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const handleClick = () => {
    history.push('/projects');
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

  const menu = (
    <Menu>
      <Menu.Item onClick={handleClick}>个人空间</Menu.Item>
      <Menu.Item>退出登录</Menu.Item>
    </Menu>
  );

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
          <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
              <span className={styles['username']}>张三</span>
            </a>
          </Dropdown>
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
