import { DownOutlined, EditOutlined, MinusCircleOutlined, MinusOutlined, PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Space, Tooltip, Tree,Input, Row, Col, Button, Divider, Modal, Form, message } from "antd";
import s from "./index.less";
import { useEffect, useState } from "react";
import { interfaceAddFiles, getAllInterface } from "@/services/demo/interfaceController";
import { useLocation,useModel } from "@umijs/max";
import { API } from "@/services/demo/typings";
import { history } from 'umi';
const { Search } = Input;
const location = useLocation();
const [form] = Form.useForm();

const InterfaceSelect = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [treeData, setTreeData] = useState<API.InterfaceListItem[]>();
  const [openType, setOpenType] = useState('add');
  
  const { setAddInterfaceMode,setInterfaceId } = useModel('interfaceModel', (model) => model);
  const [projectId,setProjectId] = useState<number>(0);
  
  useEffect(()=>{
    setProjectId(parseInt( location.search.split('&')[0].split('=')[1]));
    getTreeNode();
  },[])

  const getTreeNode = async()=>{
    const result = await getAllInterface(projectId);
    if(result.code === 200){
      setTreeData(result.data);
    }else{
      message.error('获取文件夹失败，请重试')
    }
  }

  const addFiles = ()=>{
    setOpenType('add');
    setIsModalVisible(true);
  }
  const handleCancel = ()=>{
    setIsModalVisible(false);
  }
  const handleOk = ()=>{
    form.validateFields().then(async(values)=>{
      const res = await interfaceAddFiles(values);
      if(res.code === 200){
        message.success('文件夹添加成功');
        setIsModalVisible(false);
        getTreeNode();
      }else{
        message.error('文件夹添加失败，请重试')
      }
    })
  }

  const reqInfo = (_,e)=>{
    if(e.node.isLeaf == true){
      setInterfaceId(e.node.key);
      setAddInterfaceMode(false);//修改模式
    }else{
      // console.log('not leaf')
    }
  }

  const titleRender = (node)=>{
    // const { setAddInterfaceMode } = useModel('interfaceModel', (model) => model);
    return(
      <>   
        <div className={s.container}>
            <span>{node.title}</span>
            <span>{node.isLeaf ? null :
            <Space>
            <Tooltip placement="bottom" title="添加接口" >
                <PlusCircleOutlined onClick={addInterface}/>
            </Tooltip>
            <Tooltip placement="bottom" title="修改文件名">
                <EditOutlined 
                onClick={(e)=>{}}/>
            </Tooltip>
            <Tooltip placement="bottom" title="删除文件夹">
                <MinusCircleOutlined 
                onClick={(e)=>{}}/>
            </Tooltip>
        </Space>
        }
            </span>
        </div>
      </>
    )
  }
  const addInterface = ()=>{
    setAddInterfaceMode(true);
  }
  return (
      <>   
      <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        <Col span={18}>
        <Search  style={{ marginBottom: 16}}  placeholder="Search" />
        </Col>
        <Col span={5}>
        <Tooltip placement="bottom" title="添加文件夹" >
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
          onSelect={(_, e)=>{reqInfo(_,e)}}
          switcherIcon={<DownOutlined />}
          treeData={treeData}
          titleRender={titleRender}
          onExpand={()=>console.log('expand')}
          />
        </Col>
      </Row>
        <Modal
          title={openType === 'add' ? '添加文件夹' : '修改文件名'} 
          open={isModalVisible}
          onCancel={handleCancel}
          onOk={handleOk} 
          okText={openType === 'add' ? '添加' :  '修改'} 
          cancelText="取消"
          forceRender={true}
          >
            <Form
              form={form}
            >
              <Form.Item
              label="文件夹名"
              name="filesName"
              rules={[
                {required: openType === 'delete'? false : true,message: '文件夹名不允许为空'},
              ]}
              >
                  <Input placeholder="输入文件夹名" />
              </Form.Item>
            </Form>   
        </Modal>
      </>
  )
}
export default InterfaceSelect;