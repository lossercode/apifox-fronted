import { Card, Col, Divider, Form, Input, Row, Select, Space, Tabs, TabsProps } from "antd";
import s from './index.less';
import InterfaceDetail from "./Components/InterfaceDetail";
import MockService from "./Components/MockService";
import { ProFormText, ProFormSelect, ProFormDateRangePicker, FooterToolbar, ProForm, ProFormTextArea } from "@ant-design/pro-components";

const InterfaceForm = () =>{
  const onFinish = ()=>{
    console.log('finish')
  }
  const onChange = (key: string) => {
    console.log(key);
  };
  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Params`,
      children: <></>,
    },
    {
      key: '2',
      label: `Body`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: '3',
      label: `Cookie`,
      children: `Content of Tab Pane 3`,
    },
    {
      key: '4',
      label: `Header`,
      children: `Content of Tab Pane 3`,
    },
  ];
  const fieldLabels = {
    method:'URL',
    name: '接口名称',
    status:'接口状态',
    owner: '仓库管理员',
    approver: '负责人',
    url2: '任务描述',
  };
  return (
    <div className={s.container}>
    <ProForm
      layout="horizontal"
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
    >  
    <Divider orientation="left" orientationMargin="0">基本信息</Divider>
      <Row gutter={[16,16]}>
        <Col span={20}>
          <Space.Compact block>
            <ProFormSelect
              name="method"
              label={fieldLabels.method}
              width="xs"
              rules={[{ required: true, message: '请选择请求方式' }]}
              placeholder="请求方式"
              valueEnum={{
                get: 'GET',
                post: 'POST',
              }}
              />
              <ProFormText
                name="text"
                width="md"
                rules={[{ required: true, message: '请输入接口名称' }]}
                placeholder="接口路径，开始"
              />
          </Space.Compact> 
        </Col>
      </Row>
      <Row gutter={[16,16]}> 
        <Col span={6}>
          <ProFormText
              label={fieldLabels.name}
              name="name"
              // rules={[{ required: true, message: '请输入接口名称' }]}
              placeholder="请输入接口名称"
            />
        </Col>
        <Col span={6}>
        <ProFormSelect
          name="status"
          label={fieldLabels.status}
          width="md"
        />
        </Col>
        <Col span={6}>
        <ProFormSelect
          name="status"
          label={fieldLabels.approver}
          width="md"
        />
        </Col>
      </Row>
      <Row gutter={[16,16]}>
        <Col span={12}>
          <ProFormText
          name="text"
          label="接口说明"
          placeholder="请输入接口说明"
          // fieldProps={inputTextAreaProps}
        />
      </Col>
      </Row>
    <Divider orientation="left" orientationMargin="0">请求参数</Divider>
        <Tabs size="small" defaultActiveKey="1" items={items} onChange={onChange} />
    
    <Divider orientation="left" orientationMargin="0">返回响应</Divider>

    </ProForm>
    </div>
  )
}
const InterfaceShow =()=>{

      
  const items: TabsProps['items'] = [
          {
            key: '1',
            label: '接口详情',
            children: <InterfaceDetail />,
          },
          {
            key: '2',
            label: '编辑',
            children: <InterfaceForm />,
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
        // onChange={onChange} 
        />
    </div>
    // <>
    //   <InterfaceForm/>
    // </>
    )
}

export default InterfaceShow;