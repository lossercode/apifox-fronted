import { Tabs, message } from 'antd';
import style from './index.less';
import InterfaceDetail from './Components/InterfaceDetail';
// import InterfaceEdit from './Components/InterfaceEdit';
import MockService from './Components/MockService';
import InterfaceEdit from '@/components/InterfaceEdit';
import { addInterface } from '@/services/demo/interfaceController';
import { useParams } from '@umijs/max';
import { useState } from 'react';
import { InterfaceProps } from '@/models/interfaceModel';
import InterfaceTest from '@/components/InterfaceTest';

// 要展示的接口id
const InterfaceShow = ({id}: {id: string}) => {
  const path = useParams()
  const [activeKey, setActiveKey] = useState('1')
  // 保存的时候是更新接口信息
  const save = async (value: InterfaceProps) => {
    console.log(value)
    // const result = await addInterface(path.id as string, value);
    // if(result.code === 200){
    //   message.success('保存成功')
    // } else {
    //   message.error(result.msg)
    // }
  }
  // 跳到接口测试页面
  const run = () => {
    setActiveKey('3')
  }
  const items = [
    {key: '1', label: '接口详情', children: <InterfaceDetail id={id}/>},
    {key: '2', label: '编辑接口', children: <InterfaceEdit id={id} onSave={save} onRun={run}/>},
    {key: '3', label: '接口测试', children: <InterfaceTest id={id} />},
    {key: '4', label: '高级mock', children: <MockService />},
  ]
  return (
    <div className={style.container}>
      <Tabs activeKey={activeKey} items={items} onChange={setActiveKey}/>
    </div>
  )
};

export default InterfaceShow;
