// import React, { Component } from 'react'
// import {Tree,Tooltip,Modal,Form,Input,message} from 'antd';
// import {PlusCircleOutlined,EditOutlined,MinusCircleOutlined}from '@ant-design/icons';
// import { reqGetTreeNode,reqAddTreeNode,reqUpdateTreeNode,reqDeleteTreeNode,reqGetPageInfo} from '../../api';
// const { DirectoryTree } = Tree;
// export default class TreeNode extends Component {
//     formRef = React.createRef();
//     state={
//           role:0,
//           treeData:[],
//           defaultExpandedKeys:'',
//           NodeTreeItem: null, //右键菜单
//           visible: false,     
//           isModalVisible:false,//是否显示modal 新建组织或者修改组织
//           isHideAdd:'',      //是否展示添加按钮
//           isHideUpdate:'',   //是否展示修改按钮
//           isHideDelete:'',  //是否展示删除按钮
//           operType:'',      //区别Modal弹出框的类型，(添加，修改，删除用的是一个Modal)
//           text:'',
//           isLoading:true
//     }
//     getTreeNode = async() => {
//         const result = await reqGetTreeNode();
//         this.addIsLeaf(result.value)
//         this.setState({treeData:[{
//             title: '信息管理',
//             key: '1',
//             children: [...result.value],
//       }], 
//       defaultExpandedKeys:result.value[0].key,
//       isLoading:false
//      })
//     }
//     addIsLeaf = (treenode) =>{
//       treenode.forEach((item)=>{
//         if(item.children.length === 0 ){
//           item.isLeaf =true
//         }else{
//           this.addIsLeaf(item.children)
//         }
//       })
//     }
//     componentDidMount(){
//         this.getTreeNode();
//     }
//     onSelect =async (keys,info) =>{
//       this.setState({NodeTreeItem:null});
//       const {key,pos} = info.node;
//       //这里写点击tree节点的事件逻辑
//     }
//     //右键点击事件(注意，这里的右键的Tooltip位置不是很精确，需要微调)
//     onRightClick = ({event,node}) => {
//       var x = -75;                
//       var y = event.clientY - 112 ;
//       const pos = node.pos.split('-').length - 1; 
//       if(pos === 1){
//         this.setState({
//           NodeTreeItem: {
//             pageX: x,
//             pageY: y,
//             key: node.key,
//             name: node.title,
//             pos:pos
//           },
//           isHideUpdate:'none',
//           isHideDelete:'none'
//         });
//       }else if(pos === 3){
//         this.setState({
//           NodeTreeItem: {
//             pageX: x,
//             pageY: y,
//             key: node.key,
//             name: node.title,
//             pos:pos
//           },
//           isHideAdd:'none'
//         });
//       }else{
//         this.setState({
//           NodeTreeItem: {
//             pageX: x,
//             pageY: y,
//             key: node.key,
//             name: node.title,
//             pos:pos
//           },
//           isHideAdd:'',
//           isHideUpdate:'',
//           isHideDelete:''
//         });
//       }
//     }
//     //增删改组件
//     getNodeTreeMenu() {
//       const {pageX, pageY} = {...this.state.NodeTreeItem};
//       const tmpStyle = {
//         position: 'absolute',
//         maxHeight: 40,
//         textAlign: 'center',
//         left: `${pageX}px`,
//         top: `${pageY}px`,
//         display: 'flex',
//         flexDirection: 'row',
//       };
//       const menu = (
//         <div
//           style={tmpStyle}
//         >
//           <div style={{alignSelf: 'center', marginLeft: 10,display:this.state.isHideAdd}} onClick={this.handleAddSub}>
//             <Tooltip placement="bottom" title="添加子节点" >
//             <PlusCircleOutlined />
//             </Tooltip>
//           </div>
//           <div style={{alignSelf: 'center', marginLeft: 10,display:this.state.isHideUpdate}} onClick={this.handleEditSub}>
//             <Tooltip placement="bottom" title="修改节点">
//             <EditOutlined />
//             </Tooltip>
//           </div>
//           {this.state.NodeTreeItem.category === 1?'':(
//             <div style={{alignSelf: 'center', marginLeft: 10,display:this.state.isHideDelete}} onClick={this.handleDeleteSub}>
//             <Tooltip placement="bottom" title="删除该节点">
//             <MinusCircleOutlined />
//             </Tooltip>
//           </div>
//           )}
//         </div>
//       );
//       return (this.state.NodeTreeItem == null) ? '' : this.state.role ===
//       0 ? menu : '';
//     }
//     //添加按钮弹出添加Modal
//     handleAddSub = () =>{
//       this.setState({isModalVisible:true,operType:'add'})
//     }
//     //修改按钮弹出修改Modal
//     handleEditSub = () => {
//       const {NodeTreeItem} = this.state;
//       this.setState({isModalVisible:true,operType:'update'})
//       this.formRef.current.setFieldsValue({name:NodeTreeItem.name});
//     }
//     //删除按钮弹出删除Modal
//     handleDeleteSub = () => {
//       this.setState({isModalVisible:true,operType:'delete'})
//     }

//     //节点添加方法
//     toAdd = async (values) => {
//         const {NodeTreeItem} = this.state;
//         const result = await reqAddTreeNode(values.name,NodeTreeItem.key);
//         if(result.msg === 'success'){
//           message.success('节点添加成功')
//         }else{
//           message.error('节点添加失败，请重试')
//         }
//         this.setState({isModalVisible:false})
//         this.getTreeNode();
//     }

//     //节点更新方法
//     toUpdate = async (values) => {
//       const {NodeTreeItem} = this.state;
//       const result = await reqUpdateTreeNode(NodeTreeItem.key,values.name,NodeTreeItem.pos);
//       if(result.msg === 'success'){
//         message.success('节点修改成功')
//       }else{
//         message.error('节点修改失败，请重试')
//       }
//       this.setState({isModalVisible:false})
//       this.getTreeNode();
//     }

//     //节点删除方法
//     toDelete = async () => {
//       const {NodeTreeItem} = this.state;
//       const result = await reqDeleteTreeNode(NodeTreeItem.key,NodeTreeItem.pos);
//       if(result.msg === 'success'){
//         message.success('节点删除成功')
//       }else{
//         message.error('节点删除失败，请重试')
//       }
//       this.setState({isModalVisible:false,NodeTreeItem:null})
//       this.getTreeNode();
//     }

//     //Modal确定的回调
//     handleOk = () => {
//           const {operType} = this.state;
//           this.formRef.current.validateFields().then(values=>{
//             if(operType==='add'){
//               this.toAdd(values);
//             }else if(operType==='update'){
//               this.toUpdate(values);
//             }else{
//               this.toDelete();
//             }
//       }).catch(reason=>{
//         message.warning('表单输入不允许为空，请检查');
//       })
//     }


//     //Modal取消的回调
//     handleCancel=(e)=>{
//       this.formRef.current.resetFields();
//       this.setState(()=>{
//         return({isModalVisible:false})
//       });
//     }

    
//     render() {
//       const {isModalVisible,operType,treeData,isLoadin} = this.state;
//       if(isLoading == true){
//           return null
//       }else{
//           return (
//             <>
//             <div style={{display: 'flex',marginRight:'20px'}}>
//               <DirectoryTree
//               multiple
//               defaultExpandAll
//               onSelect={this.onSelect}
//               treeData={treeData}
//               onRightClick={this.onRightClick}
//               style={{width:'250px'}}
//               />
//                 <div style={{position:'relative',}}>
//                   {this.state.NodeTreeItem != null ? this.getNodeTreeMenu() : ""}
//               </div>
//             </div>
            
              
          // <Modal 
          //   title={operType === 'add' ? '添加节点' : operType === 'delete' ? '删除节点' : '修改节点'} 
          //   visible={isModalVisible} 
          //   onOk={this.handleOk} 
          //   okText="确定"
          //   onCancel={this.handleCancel}
          //   cancelText="取消"
          //   forceRender={true}
          //   >
          //     {operType === 'add' ? '请输入要添加节点的名称' : operType === 'delete' ? '您确定要删除该节点吗？' : '请输入要修改节点的名称'}
          //       <Form
          //       name="normal"
          //       ref={this.formRef}
          //       style={{display:operType === 'delete' ? 'none' : ''}}
          //       >
          //         <Form.Item
          //         name="name"
          //         rules={[
          //         {required: operType === 'delete'? false : true,message: '节点名称不允许为空'},
          //         ]}
          //         >
          //             <Input placeholder="请输入节点名称" />
          //         </Form.Item>
          //       </Form>
          //   </Modal>
//             </>
//         )
//       }
        
//     }
// }


import React, { useState, useRef } from 'react';
import { Tree, Tooltip, Modal, Form, Input, message, Row ,Col} from 'antd';
import { PlusCircleOutlined, EditOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { reqGetTreeNode, reqAddTreeNode, reqUpdateTreeNode, reqDeleteTreeNode } from '../../api';
import { DirectoryTreeProps } from 'antd/es/tree';
import s from './index.less';

const { DirectoryTree } = Tree;

export default function TreeNode() {
  const formRef = useRef(null);
  const [role, setRole] = useState(0);
  // const [treeData, setTreeData] = useState([]);
  const [defaultExpandedKeys, setDefaultExpandedKeys] = useState('');
  const [nodeTreeItem, setNodeTreeItem] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isHideAdd, setIsHideAdd] = useState('');
  const [isHideUpdate, setIsHideUpdate] = useState('');
  const [isHideDelete, setIsHideDelete] = useState('');
  const [operType, setOperType] = useState('');
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
    
     //增删改组件
    // const getNodeTreeMenu = () =>{
    //   const {pageX, pageY} = {...this.state.NodeTreeItem};
    //   const tmpStyle = {
    //     position: 'absolute',
    //     maxHeight: 40,
    //     textAlign: 'center',
    //     left: `${pageX}px`,
    //     top: `${pageY}px`,
    //     display: 'flex',
    //     flexDirection: 'row',
    //   };
    //   const menu = (
    //     <div
    //       style={tmpStyle}
    //     >
    //       <div style={{alignSelf: 'center', marginLeft: 10,display:this.state.isHideAdd}} onClick={this.handleAddSub}>
    //         <Tooltip placement="bottom" title="添加子节点" >
    //         <PlusCircleOutlined />
    //         </Tooltip>
    //       </div>
    //       <div style={{alignSelf: 'center', marginLeft: 10,display:this.state.isHideUpdate}} onClick={this.handleEditSub}>
    //         <Tooltip placement="bottom" title="修改节点">
    //         <EditOutlined />
    //         </Tooltip>
    //       </div>
    //       {this.state.NodeTreeItem.category === 1?'':(
    //         <div style={{alignSelf: 'center', marginLeft: 10,display:this.state.isHideDelete}} onClick={this.handleDeleteSub}>
    //         <Tooltip placement="bottom" title="删除该节点">
    //         <MinusCircleOutlined />
    //         </Tooltip>
    //       </div>
    //       )}
    //     </div>
    //   );
    //   return (this.state.NodeTreeItem == null) ? '' : this.state.role ===
    //   0 ? menu : '';
    // };
    const treeData: DataNode[] = [
      {
        title: '文件夹1',
        key: '0',
        children: [
          { title: '接口名1', key: '0-0', isLeaf: true },
          { title: '接口名2', key: '0-1', isLeaf: true },
        ],
      },
      {
        title: '文件夹2',
        key: '1',
        children: [
          { title: '接口1', key: '1-0', isLeaf: true },
          { title: '接口2', key: '1-1', isLeaf: true },
        ],
      },
    ];
    const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
      console.log('Trigger Select', keys, info);
    };
  
    const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
      console.log('Trigger Expand', keys, info);
    };
    //添加按钮弹出添加Modal
    const handleAddInterface = () =>{
      setOperType('add');
      setIsModalVisible(true);
    }

    const handleEditInterface = () =>{
      setOperType('update');
      setIsModalVisible(true);
    }

    const handleCancel = () =>{
      setIsModalVisible(false);
    }

const getNodeTreeMenu = () =>{
    return <div className={s.toolBarContainer}>
        <div className={s.toolBarItem}>
            <Tooltip placement="bottom" title="添加接口" onClick={handleAddInterface}>
          <PlusCircleOutlined />
            </Tooltip>
        </div>
          <div className={s.toolBarItem}>
          <Tooltip placement="bottom" title="修改文件名"  onClick={handleEditInterface}>
          <EditOutlined />
          </Tooltip>
        </div>
    </div>
  }
  return (
    <>
        <Row>
          <Col span={14}>
          <DirectoryTree
            multiple
            defaultExpandAll
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={treeData}
          /> 
          </Col>
          <Col span={4}>
            {getNodeTreeMenu()}
          </Col>
      </Row>

      <Modal 
        title={operType === 'add' ? '添加接口' : '修改名称'} 
        open ={isModalVisible} 
        // onOk={handleOk} 
        okText="确定"
        onCancel={handleCancel}
        cancelText="取消"
        forceRender={true}
        >
          {operType === 'add' ? '请输入要添加节点的名称' : '请输入要修改节点的名称'}
            {/* <Form
            name="normal"
            ref={formRef}
            style={{display:operType === 'delete' ? 'none' : ''}}
            >
              <Form.Item
              name="name"
              rules={[
              {required: operType === 'delete'? false : true,message: '节点名称不允许为空'},
              ]}
              >
                  <Input placeholder="请输入节点名称" />
              </Form.Item>
            </Form> */}
      </Modal>
    </>
  );
}




