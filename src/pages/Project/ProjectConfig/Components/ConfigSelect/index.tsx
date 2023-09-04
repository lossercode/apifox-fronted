import {
  SettingOutlined,
  ShareAltOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import style from './index.less';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('成员管理', 'member', <UsergroupAddOutlined style={{fontSize: '18px'}}/>),
  getItem('邀请协作', 'invite', <ShareAltOutlined style={{fontSize: '18px'}}/>),
  getItem('项目设置', 'setting', <SettingOutlined style={{fontSize: '18px'}}/>),

];

export default function ConfigSelect() {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <div className={style['config-container']}>
      <Menu
        onClick={onClick}
        style={{ width: '100%', borderInlineEnd: 'none' }}
        defaultSelectedKeys={['member']}
        mode="inline"
        items={items}
      />
    </div>
  );
}
