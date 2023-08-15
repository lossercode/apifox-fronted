import InterfaceDetail from '@/components/InterfaceDetail';
import MockService from '@/components/MockService';
import { SearchOutlined,PlusOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { Button, Tooltip,Row,Col } from 'antd';
import s from './index.less';
import TreeNode from '@/components/InterfaceTree';
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
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: '接口详情',
          children: <InterfaceDetail />,
        },
        {
          key: '2',
          label: '编辑',
        },
        {
          key: '3',
          label: '测试',
        },
        {
          key: '4',
          label: 'Mock服务',
          children: <MockService />,
        },
      ];
      return (
        <div className={s.container}>
            <Row gutter={16}>
            <Col className={s.gutterrow} span={5}>
                <InterfaceList/>
            </Col>
            <Col className={s.gutterrow} span={19}>
                <div className={s.gutter}>如果是按就展示接口详情</div>
            </Col>
            </Row>
        </div>
      );
}
export default Interface