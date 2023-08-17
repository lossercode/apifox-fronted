import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Form, Input, Modal,Space } from 'antd';
import CreatedProject from './components/CreatedProject';
import s from './index.less';
import { createProject } from '@/services/demo/ProjectsController';
import { useState } from 'react';
import { history } from 'umi';
import JoinedProject from './components/JoinedProject';

interface collectionCreateFormProps {
  open: boolean;
  onCreate: (values: API.createProjectParams) => void;
  onCancel: () => void;
}

//项目创建表单 导入多一个上传swagger文件的功能
const CollectionCreateForm: React.FC<collectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  // const [confirmLoading, setConfirmLoading] = useState(false);
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

  return (
    <Modal
      open={open}
      title="新建项目"
      okText="创建"
      cancelText="取消"
      onCancel={onCancel}
      // confirmLoading={confirmLoading}
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
      </Form>
    </Modal>
  );
};

const ProjectsPage: React.FC = () => {
  const [open, setOpen] = useState(false);
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
  const [dataFromChild, setDataFromChild] = useState([]);

  const handleDataFromChild = (data) => {
    console.log(data);
    // setDataFromChild(data);
  };
  const contentList = {
    created: <CreatedProject onDataUpdate={handleDataFromChild}/>, // 对应标签页的内容组件
    joined: <JoinedProject />,
  };
  const tabBarExtraContent = ()=>{
    return (
      <>
      <Space>
        <Button key="1" icon={<PlusOutlined />}>
              Swagger导入
        </Button>
        <Button
              key="2"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setOpen(true);
              }}
            >
              新建项目
        </Button>
      </Space>
      </>
    )
  }
  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const onCreate = async (values: API.createProjectParams) => {
    //拿到这个表单的值 发送给后端
    // setConfirmLoading(true);
    const res = await createProject(values);
    if (res.code === 200) {
      // message.success(res.msg);
      history.push(`/projects/${res.data.projectId}`);
      // setConfirmLoading(false);
    } else {
      console.log("创建失败")
    }
    setOpen(false);
  };
  return (
    <div>
      <PageContainer
        title ='项目列表'
        tabList={tabList}
        tabBarExtraContent={tabBarExtraContent()}
        onTabChange={handleTabChange}
      >
      </PageContainer>
      {contentList[activeTab]}
      <CollectionCreateForm
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
