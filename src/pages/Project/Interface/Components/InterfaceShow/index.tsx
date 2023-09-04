import { Tabs, message } from 'antd';
import InterfaceDetail from './Components/InterfaceDetail';
import style from './index.less';
// import InterfaceEdit from './Components/InterfaceEdit';
import InterfaceEdit from '@/components/InterfaceEdit';
import InterfaceTest from '@/components/InterfaceTest';
import { InterfaceProps } from '@/models/interfaceModel';
import { updateInterfaceInfo } from '@/services/demo/interfaceController';
import { useModel, useParams } from '@umijs/max';
import { useState } from 'react';
import Mock from './Components/Mock';

// 要展示的接口id
const InterfaceShow = ({ id }: { id: string }) => {
  // 设置是否刷新
  const { needFlush } = useModel('interfaceShowModel', (model) => model);
  const [activeKey, setActiveKey] = useState('1');
  const items = [
    {
      key: '1',
      label: '接口详情',
      children: <InterfaceDetail id={id} needFlush={needFlush} />,
    },
    {
      key: '2',
      label: '编辑接口',
      children: <InterfaceEdit id={id} />,
    },
    { key: '3', label: '接口测试', children: <InterfaceTest id={id} needFlush={needFlush} /> },
    { key: '4', label: '高级mock', children: <Mock id={id} /> },
  ];
  return (
    <div className={style.container}>
      <Tabs activeKey={activeKey} items={items} onChange={setActiveKey} />
    </div>
  );
};

export default InterfaceShow;
