import { Card, Col, Divider, Form, Input, Row, Select, Space, Tabs, TabsProps } from "antd";
import s from './index.less';
import InterfaceDetail from "./Components/InterfaceDetail";
import MockService from "./Components/MockService";
import InterfaceEdit from "./Components/InterfaceEdit";
<<<<<<< HEAD:src/pages/Project/InterfaceShow/index.tsx
const InterfaceShow =()=>{
    const onChange = (key: string) => {
        console.log(key);
      };
      
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: '接口详情',
          children: <InterfaceDetail id={1}/>,
        },
        {
          key: '2',
          label: '编辑',
          children: <InterfaceEdit id={1}/>
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
=======
import { ProFormText, ProFormSelect, ProFormDateRangePicker, FooterToolbar, ProForm, ProFormTextArea } from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import { useModel } from "@umijs/max";

const InterfaceShow =()=>{
  const items: TabsProps['items'] = [
          {
            key: '1',
            label: '接口详情',
            children: <InterfaceDetail/>,
          },
          {
            key: '2',
            label: '编辑',
            children: <InterfaceEdit />,
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
  
>>>>>>> 670d8cfce01649ceb37de5270ab45285dfb404d1:src/pages/ProjectInfo/InterfaceShow/index.tsx
    return (
    <div className={s.container}>
      <Tabs 
        defaultActiveKey="1"
        items={items} 
      />
    </div>
    )
}

export default InterfaceShow;