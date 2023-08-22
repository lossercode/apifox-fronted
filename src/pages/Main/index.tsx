import { PlusOutlined,CloudOutlined, UploadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Form, Input, Modal,Space, Upload, message } from 'antd';
import CreatedProject from './components/CreatedProject';


import { createProject } from '@/services/demo/ProjectsController';
import { useState } from 'react';
import { history } from 'umi';
import JoinedProject from './components/JoinedProject';
import { API } from '@/services/demo/typings';

interface collectionCreateFormProps {
  type:number;
  open: boolean;
  onCreate: (values: API.createProjectParams) => void;
  onCancel: () => void;
}

const CreateProjectForm: React.FC<collectionCreateFormProps> = ({type,open,onCreate,onCancel}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const onOk = () => {
    form.validateFields() //通过校验
      .then((values) => {
        form.resetFields(); //重置表单
        onCreate(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <Modal
      open={open}
      title="新建项目"
      okText="创建"
      cancelText="取消"
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      onOk={onOk}
    >
      <Form
        form={form}
        layout="vertical"
        name="projectInfo"
      >
        <Form.Item
          name="projectName"
          label="项目名"
          rules={[{ required: true, message: '请输入项目名!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="projectDesc" label="项目描述">
          <Input type="textarea" />
        </Form.Item>
        {type == 0 ? (<Form.Item
          name="projectFile"
          label="Swagger文档"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: '请上传接口文档!' }]}
        >
          <Upload 
            name="logo" 
            action="/upload.do" 
            listType="text"
            maxCount={1}
            >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>):''}
      </Form>
    </Modal>
  );
};

const ProjectsPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [activeTab, setActiveTab] = useState('created'); // 默认激活的标签页
  const tabList = [
    {
      tab: '我创建的',
      key: 'created',
    },
    {
      tab: '我加入的',
      key: 'joined',
    },
  ];
  const contentList = {
    created: <CreatedProject/>, // 对应标签页的内容组件
    joined: <JoinedProject />,
  };
  const tabBarExtraContent = ()=>{
    return (
      <>
      <Space>
        <Button 
              key="1" 
              icon={<CloudOutlined/>}
              onClick={() => {
                setType(0);
                setOpen(true);
              }}
              >
              Swagger导入
        </Button>
        <Button
              key="2"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setType(1);
                setOpen(true);
              }}
            >
              新建项目
        </Button>
      </Space>
      </>
    )
  }

  const onCreate = async (values: API.createProjectParams) => {
    const res = await createProject(values);
    console.log(res)
    if (res.code === 200) {
      message.success(res.msg);
      history.push({
        pathname: `/project/${res.data._id}`,
        // search: `?projectId=${res.data.id}&projectName=${encodeURIComponent(res.data.projectName)}`
      });
    } else {
      message.error(res.msg);
    }
    setOpen(false);
  };
  return (
    <div>
      <PageContainer
        title ='项目列表'
        tabList={tabList}
        tabBarExtraContent={tabBarExtraContent()}
        onTabChange={(key)=>{setActiveTab(key)}}
      >
      </PageContainer>
      {contentList[activeTab]}
      <CreateProjectForm
        type={type}
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default ProjectsPage;
