import { PlusOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import styles from './index.less';
import { Body } from './body';
import { ResInfo } from '@/models/interfaceModel';


export const Response = () => {

  const contentType = [
    {
      id: 1,
      value: 'json',
      label: 'JSON',
    },
    {
      id: 2,
      value: 'xml',
      label: 'XML',
    },
  ];

  const { resInfo, setResInfo, resIndex} = useModel('interfaceModel', (model) => model);

  const updateInfo = (value: string, key: string) => {
    const info = {...resInfo[resIndex]}
    info[key] = value
    setResInfo([...resInfo.slice(0, resIndex), info, ...resInfo.slice(resIndex+1)])
  }

  return (
    <>
      <h3>返回响应</h3>
      <Row style={{ height: '40px', position: 'relative' }}>
        {resInfo.map((item: ResInfo, index:number) => (
          <Col
            span={3}
            key={index}
            className={`${styles['res-head']} ${
              index === resIndex ? styles['res-head-selected'] : ''
            }`}
          >
            <span>{`${item.name} ${item.code}`}</span>
          </Col>
        ))}
        <Col span={2} className={styles.right}>
          <Button icon={<PlusOutlined />}>添加</Button>
        </Col>
      </Row>

      <Form
        layout="inline"
        style={{
          border: '1px solid #f2f2f2',
          padding: '10px 10px',
          borderBottom: 0,
        }}
        initialValues={resInfo[resIndex]}
      >
        <Form.Item label="HTTP状态码" name='code'>
          <Input
            onBlur={(e) => updateInfo(e.target.value, 'code')}
          />
        </Form.Item>
        <Form.Item label="名称" name='name'>
          <Input
            onBlur={(e) => updateInfo(e.target.value, 'name')}
          />
        </Form.Item>
        <Form.Item label="内容格式">
          <Select
            defaultValue={resInfo[resIndex].type}
            onChange={(value) => updateInfo(value, 'type')}
          >
            {contentType.map((type) => (
              <Select.Option value={type.value} key={type.id}>
                {type.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>

      <Row className={styles['req-json']} align="middle">
        <Col span={10}>
          <span>节点</span>
        </Col>
        <Col span={3}>
          <span>类型</span>
        </Col>
        <Col span={3}>
          <span>Mock</span>
        </Col>
        <Col span={3}>
          <span>中文名</span>
        </Col>
        <Col span={3}>
          <span>说明</span>
        </Col>
        <Col span={2}>
          <span>操作</span>
        </Col>
      </Row>

      <Body initValue={resInfo[resIndex].body}/>
    </>
  );
};