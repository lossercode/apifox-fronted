// import { JsonSchemaEditor } from '@quiet-front-end/json-schema-editor-antd';
import { ResInfo } from '@/models/interfaceModel';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { Body } from './body';
import styles from './index.less';
import { useContext } from 'react';
import Context from './context';
import deepCopy from '@/utils/deepCopy';

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

  const { resInfo, setResInfo, resCurrentIndex, setResCurrentIndex, resBodyProxy, setResBodyProxy } = useContext(Context)
  
  // 更新响应体的基本信息
  const updateInfo = (value: string, key: string) => {
    const info = { ...resInfo[resCurrentIndex] };
    info[key] = value;
    setResInfo([
      ...resInfo.slice(0, resCurrentIndex),
      info,
      ...resInfo.slice(resCurrentIndex + 1),
    ]);
  };
  //添加一个响应体
  const addResInfo = () => {
    const info = { ...resInfo[resCurrentIndex] };
    // 把代理body的值赋值给当前选中的res
    info.body = resBodyProxy;
    setResInfo((resInfo) => [
      ...resInfo.slice(0, resCurrentIndex),
      info,
      {
        code: 400,
        type: 'json',
        name: '失败',
        body: [],
      },
    ]);
    setResCurrentIndex(resCurrentIndex + 1);
    // 新建的时候body为空
    setResBodyProxy([])
  };
  // 切换
  const handleSwitch = (index: number) => {
    
    if(index === resCurrentIndex){
      return
    }

    const prevData = deepCopy(resInfo);
    // 切换的时候更新代理body的值为要切换的位置的值
    // 把代理数组的值赋值给当前数组
    prevData[resCurrentIndex].body = resBodyProxy 
    console.log('prevdata',prevData)
    setResInfo(prevData);
    setResBodyProxy(prevData[index].body)
    setResCurrentIndex(index);

  }
  return (
    <>
      <h3>返回响应</h3>
      <Row style={{ height: '40px', position: 'relative' }}>
        {resInfo.map((item: ResInfo, index: number) => (
          <Col
            span={3}
            key={index}
            className={`${styles['res-head']} ${
              index === resCurrentIndex ? styles['res-head-selected'] : ''
            }`}
            onClick={() => handleSwitch(index)}
          >
            <span>{`${item.name} ${item.code}`}</span>
          </Col>
        ))}
        <Button icon={<PlusOutlined />} onClick={addResInfo}>
          添加
        </Button>
      </Row>

      <Form
        layout="inline"
        style={{
          border: '1px solid #f2f2f2',
          padding: '10px 10px',
          borderBottom: 0,
        }}
      >
        <Form.Item label="HTTP状态码" name="code">
          <Input
            onBlur={(e) => updateInfo(e.target.value, 'code')}
            placeholder={resInfo[resCurrentIndex].code + ''}
          />
        </Form.Item>
        <Form.Item label="名称" name="name">
          <Input
            onBlur={(e) => updateInfo(e.target.value, 'name')}
            placeholder={resInfo[resCurrentIndex].name}
          />
        </Form.Item>
        <Form.Item label="内容格式">
          <Select
            defaultValue={resInfo[resCurrentIndex]?.type}
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
      
      {/* 如果是更新需要赋初始值，否则就为空 */}
      <Body value={resBodyProxy} setValue={setResBodyProxy}/>
    </>
  );
};
