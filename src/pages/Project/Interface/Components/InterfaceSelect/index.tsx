import InterfaceEdit from '@/components/InterfaceEdit';
import InterfaceTest from '@/components/InterfaceTest';
import { InterfaceProps } from '@/models/interfaceModel';
import {
  addInterface,
  getAllInterface,
  interfaceAddFiles,
} from '@/services/demo/interfaceController';
import { API } from '@/services/demo/typings';
import {
  DownOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useModel, useParams } from '@umijs/max';
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Tooltip,
  Tree,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import InterfaceShow from '../InterfaceShow';
import s from './index.less';
const { Search } = Input;

const InterfaceSelect = ({ needFlush }: { needFlush: boolean }) => {
  const params = useParams();

  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [treeData, setTreeData] = useState<API.InterfaceListItem[]>();
  const [openType, setOpenType] = useState('add');

  // const { setAddInterfaceMode,setInterfaceId } = useModel('interfaceModel', (model) => model);
  // const [projectId,setProjectId] = useState<string>('');

  const {
    setCurrentInterfaceId,
    setTabItems,
    tabItems,
    setActiveTab,
    setNeedFlush,
  } = useModel('interfaceShowModel', (model) => model);

  const getTreeNode = async () => {
    const result = await getAllInterface(params.id as string);
    if (result.code === 200) {
      setTreeData(result.data);
    } else {
      message.error('获取文件夹失败，请重试');
    }
  };
  useEffect(() => {
    getTreeNode();
  }, []);

  useEffect(() => {
    if (!needFlush) {
      return;
    } else {
      getTreeNode();
    }
  }, [needFlush]);

  const addFiles = () => {
    setOpenType('add');
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOk = () => {
    form.validateFields().then(async (values) => {
      const res = await interfaceAddFiles(
        values.filesName,
        params.id as string,
      );
      if (res.code === 200) {
        message.success('文件夹添加成功');
        console.log(res.data);
        setIsModalVisible(false);
        getTreeNode();
      } else {
        message.error('文件夹添加失败，请重试');
      }
    });
  };

  const reqInfo = (_, e) => {
    if (e.node.isLeaf == true) {
      // setInterfaceId(e.node.key);
      // setAddInterfaceMode(false);//修改模式
      setCurrentInterfaceId(e.node.key);
      setTabItems([
        ...tabItems,
        {
          key: `${tabItems.length + 1}`,
          label: e.node.title,
          children: <InterfaceShow id={e.node.key} />,
        },
      ]);
      setActiveTab(`${tabItems.length + 1}`);
    } else {
      // console.log('not leaf')
    }
  };

  // 创建新接口返回的接口_id
  const [id, setId] = useState<string>('');
  // 创建新接口后返回的接口名称，因为要更新tabs标题
  const [name, setName] = useState<string>('');
  // 点击的文件的id
  const [fileId, setFileId] = useState<string>('');
  // 点击运行按钮时的操作
  const run = () => {
    if (!id) {
      message.error('请先保存');
      return;
    }
    // 跳到接口测试页面
    setTabItems([
      ...tabItems,
      {
        key: `${tabItems.length + 1}`,
        label: name,
        children: <InterfaceTest id={id} />,
      },
    ]);
  };
  // 未命名接口点击保存时提交到后台
  const save = async (value: InterfaceProps) => {
    const res = await addInterface(params.id as string, value, fileId);
    if (res.code !== 200) {
      message.error(res.msg);
    } else {
      setId(res.data._id);
      // 刷新文件目录
      setNeedFlush(true);
      setName(res.data.name);
      // 刷新当前接口
      setTabItems([
        ...tabItems.slice(0, tabItems.length - 1),
        {
          key: `${tabItems.length + 1}`,
          label: res.data.name,
          children: <InterfaceEdit id={res.data._id} onSave={save} onRun={run} />,
        },
      ]);
      message.success(res.msg);
    }
  };
  // 点击新建接口按钮
  const newInterface = (node: any) => {
    setFileId(node.key);
    setTabItems([
      ...tabItems,
      {
        key: `${tabItems.length + 1}`,
        label: '未命名接口',
        children: <InterfaceEdit onSave={save} onRun={run} />,
      },
    ]);
    setActiveTab(`${tabItems.length + 1}`);
  };

  const titleRender = (node:any) => {
    // const { setAddInterfaceMode } = useModel('interfaceModel', (model) => model);
    return (
      <>
        <div className={s.container}>
          <span>{node.title}</span>
          <span>
            {node.isLeaf ? null : (
              <Space>
                <Tooltip placement="bottom" title="添加接口">
                  <PlusCircleOutlined
                    onClick={() => newInterface(node)}
                    className={s.choice}
                  />
                </Tooltip>
                <Tooltip
                  placement="bottom"
                  title="修改文件名"
                  className={s.choice}
                >
                  <EditOutlined onClick={(e) => {}} />
                </Tooltip>
                <Tooltip
                  placement="bottom"
                  title="删除文件夹"
                  className={s.choice}
                >
                  <MinusCircleOutlined onClick={(e) => {}} />
                </Tooltip>
              </Space>
            )}
          </span>
        </div>
      </>
    );
  };

  return (
    <>
      <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        <Col span={18}>
          <Search style={{ marginBottom: 16 }} placeholder="Search" />
        </Col>
        <Col span={5}>
          <Tooltip placement="bottom" title="添加文件夹">
            <Button type="primary" onClick={addFiles}>
              <PlusOutlined />
            </Button>
          </Tooltip>
        </Col>
      </Row>
      <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        <Col span={24}>
          <Tree
            showLine
            onSelect={(_, e) => {
              reqInfo(_, e);
            }}
            switcherIcon={<DownOutlined />}
            treeData={treeData}
            titleRender={titleRender}
            onExpand={() => console.log('expand')}
          />
        </Col>
      </Row>
      <Modal
        title={openType === 'add' ? '添加文件夹' : '修改文件名'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        okText={openType === 'add' ? '添加' : '修改'}
        cancelText="取消"
        forceRender={true}
      >
        <Form form={form}>
          <Form.Item
            label="文件夹名"
            name="filesName"
            rules={[
              {
                required: openType === 'delete' ? false : true,
                message: '文件夹名不允许为空',
              },
            ]}
          >
            <Input placeholder="输入文件夹名" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default InterfaceSelect;
