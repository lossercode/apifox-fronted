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
    setDirectory,
  } = useModel('interfaceShowModel', (model) => model);

  const getTreeNode = async () => {
    console.log(params.id)
    const result = await getAllInterface(params.id as string);
    console.log('文件数据为', result.data)
    if (result.code === 200) {
      setTreeData(result.data);
    } else {
      message.error('获取文件夹失败，请重试');
    }
  };


  useEffect(() => {
    getTreeNode()
  }, [needFlush]);

  const addFiles = () => {
    setOpenType('add');
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOk = () => {
    // 添加文件夹时直接展示在前端，不放入后端
    form.validateFields().then(async (values) => {
      setTreeData([...treeData || [], {title: values.filesName, key: values.filesName, children: []}])
      setIsModalVisible(false)
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

  
  // 点击新建接口按钮
  const newInterface = (node: any) => {
    setDirectory(node.key);
    setTabItems([
      ...tabItems,
      {
        key: `${tabItems.length + 1}`,
        label: '未命名接口',
        children: <InterfaceEdit />,
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
