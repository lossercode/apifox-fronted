import { ResBodyType } from './types';
import {
  CaretDownOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Col, Input, Popover, Row, Select } from 'antd';
import styles from './index.less';
import { useEffect } from 'react';

export const Body = ({ value, setValue }: { value: ResBodyType[] , setValue?: (value: ResBodyType[]) => void}) => {
  useEffect(() => {
    return () => {
      if(setValue){
        setValue([])
      }
    };
  }, []);

  // 生成下一行数据
  const nextInfo = () => {
    const info = {
      id: 1,
      type: '',
      element: '',
      mock: '',
      name: '',
      des: '',
      indent: 0,
      child: false,
      // 是否能展示添加/删除按钮，当类型为数组时不运行
      showAction: true,
    }
    return info;
  }
  // 添加一行数据
  const addField = (index: number, type: string) => {
    if(!setValue){
      return
    }
    // 如果当前为空
    if (value.length === 0) {
      const temp = nextInfo()
      setValue([temp]);
      return;
    }

    const current = { ...value[index] };
    const newInfo = nextInfo();
    // 如果是通过操作栏添加
    if(!newInfo.id){
      newInfo.indent = 0
    }
    newInfo.id = value.length + 1;
    newInfo.indent = current.indent
    if (type === 'child') {
      current.child = true;
      newInfo.indent = current.indent + 1;
      setValue([
        ...value.slice(0, index),
        current,
        newInfo,
        ...value.slice(index + 1),
      ]);
    } else {
      // 找到和当前元素平级的元素
      let i = index + 1;
      while (i < value.length) {
        if (value[i].indent > current.indent) {
          i++;
        } else {
          break;
        }
      }
      if (i < value.length) {
        // 在中间插入数据
        setValue([
          ...value.slice(0, i),
          newInfo,
          ...value.slice(i),
        ]);
      } else {
        setValue([...value, newInfo]);
      }
    }
  };

  // 改变某一个字段的值
  const fieldChange = (newValue: string | number, index: number, key: string) => {
    if(!setValue){
      return
    }
    const current = { ...value[index] };
    const next = nextInfo();
    current[key] = newValue;
    // 如果是数组需要特别处理
    if (key === 'type' && newValue === 'array') {
      next.id = value.length + 1;
      next.indent = current.indent + 1;
      current.child = true;
      current.showAction = false;
      setValue([
        ...value.slice(0, index),
        current,
        next,
        ...value.slice(index + 1),
      ]);
    } else {
      setValue([
        ...value.slice(0, index),
        current,
        ...value.slice(index + 1),
      ]);
    }
  };

  // 删除指定的行
  const deleteField = (index: number) => {
    if(!setValue){
      return
    }
    const current = { ...value[index] };
    if (!current.child) {
      setValue([
        ...value.slice(0, index),
        ...value.slice(index + 1),
      ]);
      return;
    }
    let i = index + 1;
    while (i < value.length) {
      if (value[i].indent <= value[index].indent) {
        break;
      } else {
        i++;
      }
    }
    setValue([
      ...value.slice(0, index),
      ...value.slice(i),
    ]);

    // todo：有child的时候收起
  };
  const addContent = (index: number) => {
    return (
      <>
        { index === 0 || (index > 0 && value[index-1].type !== 'array') ? (
          <p
            className={styles.addContent}
            onClick={() => addField(index, 'sibling')}
          >
            添加相邻节点
          </p>
          ) : null
        }
        {value[index].type === 'object'  ? (
          <p
            className={styles.addContent}
            onClick={() => addField(index, 'child')}
          >
            添加子节点
          </p>
        ) : null}
      </>
    );
  };
  return (
    <>
      <Row className={styles['req-json']} align="middle">
        <Col span={10}>
          <span>参数名</span>
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
          <PlusCircleOutlined
            style={{ color: 'green', cursor: 'pointer' }}
            onClick={() => addField(value.length, 'sibling')}
          />
        </Col>
      </Row>

      {value?.map((item: ResBodyType, index:number) => (
        <Row
          key={item.id}
          style={{
            height: '50px',
            padding: '10px 0',
            borderBottom: '1px solid #f2f2f2',
          }}
          align="middle"
        >
          <Col span={10}>
            <Row
              align="middle"
              style={{ marginLeft: `${20 * item.indent + 11}px` }}
            >
              <Col style={{ display: 'flex' }}>
                {item.child ? <CaretDownOutlined /> : null}
                <Input
                  bordered={false}
                  placeholder="字段名"
                  onBlur={(e) => fieldChange(e.target.value, index, 'element')}
                  style={{ padding: '4px 0' }}
                  disabled={index > 0 && value[index-1].type === 'array'}
                  defaultValue={item.element}
                />
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Select
              onChange={(value) => fieldChange(value, index, 'type')}
              style={{ width: '90%' }}
              defaultValue={item.type}
            >
              <Select.Option value="string">string</Select.Option>
              <Select.Option value="number">number</Select.Option>
              <Select.Option value="boolean">boolean</Select.Option>
              <Select.Option value="object">object</Select.Option>
              <Select.Option value="array">array</Select.Option>
            </Select>
          </Col>
          <Col span={3}>
            <Input
              placeholder={value[index].type === 'array' ? '请输入个数' : 'mock语法'}
              bordered={false}
              name="mock"
              disabled={
                value[index].type === 'object' 
                  ? true
                  : false
              }
              onBlur={(e) => fieldChange(e.target.value, index, 'mock')}
              defaultValue={item.mock}
            />
          </Col>
          <Col span={3}>
            <Input
              placeholder="中文名"
              bordered={false}
              name="title"
              onBlur={(e) => fieldChange(e.target.value, index, 'name')}
              defaultValue={item.name}
            />
          </Col>
          <Col span={3}>
            <Input
              placeholder="描述"
              bordered={false}
              name="des"
              onBlur={(e) => fieldChange(e.target.value, index, 'des')}
              defaultValue={item.des}
            />
          </Col>
          <Col span={2} style={{ position: 'relative', paddingLeft: '10px' }}>
            <Popover content={addContent(index)}>
              <PlusCircleOutlined
                style={{ color: 'green', cursor: 'pointer' }}
              />
            </Popover>
            <MinusCircleOutlined
              style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}
              onClick={() => deleteField(index)}
            />
          </Col>
        </Row>
      ))}
    </>
  );
};
