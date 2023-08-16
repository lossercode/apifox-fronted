import { Tabs, TabsProps } from "antd";
import s from './index.less';
import InterfaceDetail from "./Components/InterfaceDetail";
import MockService from "./Components/MockService";
import InterfaceEdit from "./Components/InterfaceEdit";
const InterfaceShow =()=>{
    const onChange = (key: string) => {
        console.log(key);
      };
      
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: '接口详情',
          children: <InterfaceDetail />,
        },
        {
          key: '2',
          label: '编辑',
          children: <InterfaceEdit />
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
    <div className={s.container}>
        <Tabs 
        defaultActiveKey="1" 
        items={items} 
        onChange={onChange} />
    </div>)
}

export default InterfaceShow;