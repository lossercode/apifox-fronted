import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Row, Col, Button, Tooltip } from "antd";
import s from "./index.less";

const TreeNode = () =>{
    return (<>
        123
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
            <TreeNode/>
          </Col>  
        </Row>         
        </>
    )
}



export default InterfaceSelect;