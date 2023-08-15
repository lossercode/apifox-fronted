import { SearchOutlined, PlusOutlined, PlusCircleOutlined, EditOutlined } from "@ant-design/icons";
import { Row, Col, Button, Tooltip } from "antd";
import s from "./index.less";
import Tree, { DataNode, DirectoryTreeProps } from "antd/es/tree";

const TreeTools = () => {
    const handleAddInterface = () =>{
        // setOperType('add');
        // setIsModalVisible(true);
      }
  
      const handleEditInterface = () =>{
        // setOperType('update');
        // setIsModalVisible(true);
      }
    return <>
    <div className={s.toolBarContainer}>
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
    </>
}


const InterfaceTree = () =>{
    const { DirectoryTree } = Tree;
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
    return (<>
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
            <Col span={5}>
                <TreeTools/>
            </Col>
        </Row>
    </>)
}

const InterfaceSelect = ()=>{
    const text = "新建文件夹";
    return (
        <>
        <Row style={{ marginBottom: 8 }} >
            <Col span={20}>
                <Button icon={<SearchOutlined />} className={s.search}>接口名</Button>
            </Col>
            <Col span={4}>
                <Tooltip placement="top" title={text}>
                    <Button type="primary" icon={<PlusOutlined />}/>
                </Tooltip>   
            </Col>
        </Row>   
        <Row>
          <Col span={24}>
            <InterfaceTree/>
          </Col>  
        </Row>         
        </>
    )
}



export default InterfaceSelect;