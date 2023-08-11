import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Form, Input, Modal } from 'antd';
import CreatedProject from './components/CreatedProject';
import s from './index.less';

import { createProject } from '@/services/demo/ProjectsController';
import { useState } from 'react';
import { history } from 'umi';
import JoinedProject from './components/JoinedProject';

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: API.createProjectInfo) => void;
  onCancel: () => void;
}
//项目创建表单
const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  // const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title="新建项目"
      okText="创建"
      cancelText="取消"
      onCancel={onCancel}
      // confirmLoading={confirmLoading}
      onOk={() => {
        form
          .validateFields() //通过校验
          .then((values) => {
            form.resetFields(); //重置表单
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="projectInfo"
        // initialValues={{ modifier: 'public' }}
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
        {/* <Form.Item name="modifier" className="collection-create-form_last-form-item">
        </Form.Item> */}
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
  const contentList = {
    created: <CreatedProject />, // 对应标签页的内容组件
    joined: <JoinedProject />,
  };
  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  const onCreate = async (values: API.createProjectInfo) => {
    //拿到这个表单的值 发送给后端
    console.log(values);
    // setConfirmLoading(true);
    const res = await createProject(values);
    if (res.code === 200) {
      // message.success(res.msg);
      history.push(`/projects/${res.data.projectId}`);
      // setConfirmLoading(false);
    } else {
      message.error(res.msg);
    }

    setOpen(false);
  };
  return (
    <div className={s.container}>
      <PageContainer
        header={{
          title: '项目列表',
          extra: [
            <Button key="1" icon={<PlusOutlined />} onClick={() => {}}>
              导入项目
            </Button>,
            <Button
              key="2"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setOpen(true);
              }}
            >
              新建项目
            </Button>,
          ],
        }}
        // tabBarExtraContent={tabBarExtraContent}
        tabList={tabList}
        onTabChange={handleTabChange}
      >
        {contentList[activeTab]}
        {/* <div className = {s.containerContent}>123 </div> */}
      </PageContainer>
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
