import React, { Component } from 'react'
import {Tree,Tooltip,Modal,Form,Input,message, Space, Button} from 'antd';
import {EditOutlined, PlusOutlined, MinusOutlined, PlusCircleOutlined, DownOutlined}from '@ant-design/icons';
import { reqAddTreeNode, reqDeleteTreeNode, reqGetTreeNode, reqUpdateTreeNode } from '@/services/demo/interfaceController';
const { DirectoryTree } = Tree;
import s from './index.less';
export default class TreeNode extends Component {
    formRef = React.createRef();
    state={
          role:0,
          treeData:[],
          defaultExpandedKeys:'',
        //   NodeTreeItem: null, //右键菜单
          visible: false,     
          isModalVisible:false,//是否显示modal 新建组织或者修改组织
          isHideAdd:'',      //是否展示添加按钮
          isHideUpdate:'',   //是否展示修改按钮
          isHideDelete:'',  //是否展示删除按钮
          operType:'',      //区别Modal弹出框的类型，(添加，修改，删除用的是一个Modal)
          text:'',
          isLoading:true
    }
    getTreeNode = async() => {
        const result = await reqGetTreeNode();
        // this.addIsLeaf(result.value)
        this.setState({treeData:[...result.data.treeData]});
        // this.setState({treeData:[{
        //     title: '文件夹A',
        //     key: '1',
        //     children: [...result.value],
        // }], 
        // defaultExpandedKeys:result.value[0].key,
        // isLoading:false
    //  })
    }
    // addIsLeaf = (treenode) =>{
    //     console.log("treenode",treenode);
    //   treenode.forEach((item)=>{
    //     if(item.children.length === 0 ){
    //       item.isLeaf =true
    //     }else{
    //       this.addIsLeaf(item.children)
    //     }
    //   })
    // }
    componentDidMount(){
        this.getTreeNode();
    }

    onSelect =async (keys,info) =>{
      this.setState({NodeTreeItem:null});
      const {key,pos} = info.node;
      //这里写点击tree节点的事件逻辑
    }

    //右键点击事件(注意，这里的右键的Tooltip位置不是很精确，需要微调)
    // onRightClick = ({event,node}) => {
    //   var x = -75;                
    //   var y = event.pageY-83 ;
    //   const pos = node.pos.split('-').length - 1; 
    //   if(pos === 1){
    //     this.setState({
    //       NodeTreeItem: {
    //         pageX: x,
    //         pageY: y,
    //         key: node.key,
    //         name: node.title,
    //         pos:pos
    //       },
    //       isHideUpdate:'none',
    //       isHideDelete:'none'
    //     });
    //   }else if(pos === 3){
    //     this.setState({
    //       NodeTreeItem: {
    //         pageX: x,
    //         pageY: y,
    //         key: node.key,
    //         name: node.title,
    //         pos:pos
    //       },
    //       isHideAdd:'none'
    //     });
    //   }else{
    //     this.setState({
    //       NodeTreeItem: {
    //         pageX: x,
    //         pageY: y,
    //         key: node.key,
    //         name: node.title,
    //         pos:pos
    //       },
    //       isHideAdd:'',
    //       isHideUpdate:'',
    //       isHideDelete:''
    //     });
    //   }
    // }

    setTreeTitle = (item) =>{
        return (
            <span>{item.name}
                <span
                key={item.id}
                style={{
                    zIndex:1,
                    width:'80px',
                    position: 'absolute',    
                }}
                >
                    <Space>
                    <Tooltip placement="bottom" title="添加接口" >
                        <PlusCircleOutlined onClick={(e)=>{}}/>
                    </Tooltip>
                    <Tooltip placement="bottom" title="修改文件名">
                        <EditOutlined 
                        onClick={(e)=>{}}/>
                    </Tooltip>
                    <Tooltip placement="bottom" title="删除文件夹">
                        <MinusOutlined 
                        onClick={(e)=>{}}/>
                    </Tooltip>
                </Space>
                </span>
            </span>
        )
    }

    //增删改组件
    // getNodeTreeMenu(item) {
    // //   const {pageX, pageY} = {...this.state.NodeTreeItem};
    //   const menu = (
    //     <span>
    //         {item.name}
    //         <span
    //             key={item.id}
    //             style={{
    //                 zIndex:1,
    //                 width:'80px',
    //                 position: 'absolute',
    //                 // display:treeEditDisplay,
    //             }}
    //         ></span>
    //         <div className={s.toolbar}>
    //             <Space>
    //                 <Tooltip placement="bottom" title="添加接口" >
    //                     <PlusCircleOutlined onClick={(e)=>{}}/>
    //                 </Tooltip>
    //                 <Tooltip placement="bottom" title="修改文件名">
    //                     <EditOutlined 
    //                         style={{marginLeft: 10}}
    //                         onClick={(e)=>{}}/>
    //                 </Tooltip>
    //                 <Tooltip placement="bottom" title="删除文件夹">
    //                     <MinusOutlined 
    //                         style={{marginLeft: 10}}
    //                         onClick={(e)=>{}}/>
    //                 </Tooltip>
    //             </Space>
    //         {/* <div className={s.toolbaritem} style={{display:this.state.isHideAdd}} onClick={this.handleAddSub}>
    //             <Tooltip placement="bottom" title="添加子节点" >
    //             <PlusCircleOutlined />
    //             </Tooltip>
    //         </div>
    //         <div className={s.toolbaritem} style={{display:this.state.isHideUpdate}} onClick={this.handleEditSub}>
    //             <Tooltip placement="bottom" title="修改节点">
    //             <EditOutlined />
    //             </Tooltip>
    //         </div> */}
    //         {/* {this.state.NodeTreeItem.category === 1?'':(
    //             <div style={{alignSelf: 'center', marginLeft: 10,display:this.state.isHideDelete}} onClick={this.handleDeleteSub}>
    //             <Tooltip placement="bottom" title="删除该节点">
    //             <MinusCircleOutlined />
    //             </Tooltip>
    //         </div>
    //         )} */}
    //         </div>
    //     </span>
    //   );
    // //   return (this.state.NodeTreeItem == null) ? '' : this.state.role ===
    // //   0 ? menu : '';
    //     return menu 
    // }

    //添加按钮弹出添加Modal
    handleAddSub = () =>{
      this.setState({isModalVisible:true,operType:'add'})
    }
    //修改按钮弹出修改Modal
    handleEditSub = () => {
      const {NodeTreeItem} = this.state;
      this.setState({isModalVisible:true,operType:'update'})
      this.formRef.current.setFieldsValue({name:NodeTreeItem.name});
    }
    //删除按钮弹出删除Modal
    handleDeleteSub = () => {
      this.setState({isModalVisible:true,operType:'delete'})
    }

    //节点添加方法
    toAdd = async (values) => {
        const {NodeTreeItem} = this.state;
        const result = await reqAddTreeNode(values.name,NodeTreeItem.key);
        if(result.msg === 'success'){
          message.success('节点添加成功')
        }else{
          message.error('节点添加失败，请重试')
        }
        this.setState({isModalVisible:false})
        this.getTreeNode();
    }

    //节点更新方法
    toUpdate = async (values) => {
      const {NodeTreeItem} = this.state;
      const result = await reqUpdateTreeNode(NodeTreeItem.key,values.name,NodeTreeItem.pos);
      if(result.msg === 'success'){
        message.success('节点修改成功')
      }else{
        message.error('节点修改失败，请重试')
      }
      this.setState({isModalVisible:false})
      this.getTreeNode();
    }

    //节点删除方法
    toDelete = async () => {
      const {NodeTreeItem} = this.state;
      const result = await reqDeleteTreeNode(NodeTreeItem.key,NodeTreeItem.pos);
      if(result.msg === 'success'){
        message.success('节点删除成功')
      }else{
        message.error('节点删除失败，请重试')
      }
      this.setState({isModalVisible:false,NodeTreeItem:null})
      this.getTreeNode();
    }

    //Modal确定的回调
    handleOk = () => {
          const {operType} = this.state;
          this.formRef.current.validateFields().then(values=>{
            if(operType==='add'){
              this.toAdd(values);
            }else if(operType==='update'){
              this.toUpdate(values);
            }else{
              this.toDelete();
            }
      }).catch(reason=>{
        message.warning('表单输入不允许为空，请检查');
      })
    }

    //Modal取消的回调
    handleCancel=(e)=>{
      this.formRef.current.resetFields();
      this.setState(()=>{
        return({isModalVisible:false})
      });
    }
    setTree = (module_data: any) => {
        return module_data.map((item: any) => {
          let _json = { ...item };
          _json.name = this.setTreeTitle(item);
          _json.children = item.children ? this.setTree(item.children) : [];
          return _json;
        });
      };
     
    render() {
    //   const {isModalVisible,operType,treeData,isLoading,defaultExpandedKeys} = this.state;
    const {isModalVisible,operType,treeData,defaultExpandedKeys} = this.state;
  
    // if(isLoading == true){
    //       return null
    //   }else{
          return (
            <>
            {/* <div style={{display: 'flex'}}>
              <DirectoryTree
              multiple
              // defaultExpandedKeys={}
              onSelect={this.onSelect}
              treeData={setTree(treeData)}
              style={{width:'200px'}}
              />
              <div style={{position:'relative',}}>
                {this.getNodeTreeMenu()}
              </div>
            </div> */}
                <Tree
                    showLine
                    switcherIcon={<DownOutlined />}
                    // onSelect={onSelect}
                    treeData={this.setTree(treeData)}
                />
            
              <Modal 
                title={operType === 'add' ? '添加节点' : operType === 'delete' ? '删除节点' : '修改节点'} 
                open={isModalVisible} 
                onOk={this.handleOk} 
                okText="确定"
                onCancel={this.handleCancel}
                cancelText="取消"
                forceRender={true}
                >
                  {operType === 'add' ? '请输入要添加节点的名称' : operType === 'delete' ? '您确定要删除该节点吗？' : '请输入要修改节点的名称'}
                    <Form
                    name="normal"
                    ref={this.formRef}
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
                    </Form>
                </Modal>
            </>
        )
    //   }
        
    }
}
