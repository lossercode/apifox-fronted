import InterfaceDetail from '@/components/InterfaceDetail';
import MockService from '@/components/MockService';
import { SearchOutlined,PlusOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { Button, Tooltip,Row,Col } from 'antd';
import s from './index.less';
import TreeNode from '@/components/InterfaceTree';
import InterfaceSelect from './Components/InterfaceSelect';
import InterfaceShow from './Components/InterfaceShow';
const InterfaceList = () => {
  const text = "新建文件夹";
    return (
        <>
        <Row  style={{ marginBottom: 8 }} >
            <Col span={20}>
                <Button 
                  icon={<SearchOutlined />} 
                  className={s.search} 
                >接口名</Button>
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

const Interface = () => {

      return (
        <div className={s.container}>
          <div className={s.leftContent}>
            <InterfaceSelect/>
          </div>
          <div className={s.rightContent}> 
            <InterfaceShow/>
          </div>
        </div>
      );
}
export default Interface