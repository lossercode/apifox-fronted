import { EnvironmentFilled } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import type { MenuProps } from 'antd';
import { Breadcrumb, Menu } from 'antd';
import { useState } from 'react';
import { Outlet } from 'umi';

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
    <PageContainer ghost>
      <div>
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
      </div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <Outlet />
    </PageContainer>
  );
}
