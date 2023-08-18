import { ResBodyType } from '@/models/interfaceModel';
import {
  CaretDownOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Col, Input, Popover, Row, Select } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import styles from './index.less';

export const Body = ({ initValue }: { initValue: ResBodyType[] }) => {
  const { resBodyProxy, setResBodyProxy } = useModel(
    'interfaceModel',
    (model) => model,
  );

  useEffect(() => {
    setResBodyProxy(initValue);
    // 组件销毁的时候清空
    return () => {
      setResBodyProxy([]);
    };
  }, [initValue]);

  const fieldChange = (value: string | number, index: number, key: string) => {
    const info = { ...resBodyProxy[index] };
    info[key] = value;
    setResBodyProxy([
      ...resBodyProxy.slice(0, index),
      info,
      ...resBodyProxy.slice(index + 1),
    ]);
  };
  // 添加一行数据
  const addField = (index: number, type: string) => {
    const current = { ...resBodyProxy[index] };
    const newInfo = { ...resBodyProxy[index] };

    newInfo.child = false;
    newInfo.id = resBodyProxy.length + 1;
    if (type === 'child') {
      current.child = true;
      newInfo.indent += 1;
      setResBodyProxy(() => [
        ...resBodyProxy.slice(0, index),
        current,
        newInfo,
        ...resBodyProxy.slice(index + 1),
      ]);
    } else {
      // 找到和当前元素平级的元素
      let i = index + 1;
      while (i < resBodyProxy.length) {
        if (resBodyProxy[i].indent > current.indent) {
          i++;
        } else {
          break;
        }
      }
      if (i < resBodyProxy.length) {
        // 在中间插入数据
        setResBodyProxy([
          ...resBodyProxy.slice(0, i),
          newInfo,
          ...resBodyProxy.slice(i),
        ]);
      } else {
        setResBodyProxy([...resBodyProxy, newInfo]);
      }
    }
  };
  // 删除指定的行
  const deleteField = (index: number) => {
    const current = { ...resBodyProxy[index] };
    if (!current.child) {
      setResBodyProxy([
        ...resBodyProxy.slice(0, index),
        ...resBodyProxy.slice(index + 1),
      ]);
      return;
    }
    let i = index + 1;
    while (i < resBodyProxy.length) {
      if (resBodyProxy[i].indent <= resBodyProxy[index].indent) {
        break;
      } else {
        i++;
      }
    }
    setResBodyProxy([
      ...resBodyProxy.slice(0, index),
      ...resBodyProxy.slice(i),
    ]);

    // todo：有child的时候收起
  };
  const addContent = (index: number) => {
    return (
      <>
        <p
          className={styles.addContent}
          onClick={() => addField(index, 'sibling')}
        >
          添加相邻节点
        </p>
        <p
          className={styles.addContent}
          onClick={() => addField(index, 'child')}
        >
          添加子节点
        </p>
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
          <span>操作</span>
        </Col>
      </Row>

      {resBodyProxy.map((item, index) => (
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
                />
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Select
              onChange={(value) => fieldChange(value, index, 'type')}
              style={{ width: '90%' }}
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
              placeholder="mock"
              bordered={false}
              name="mock"
              disabled={
                resBodyProxy[index].type === 'object' ||
                resBodyProxy[index].type === 'array'
                  ? true
                  : false
              }
              onBlur={(e) => fieldChange(e.target.value, index, 'mock')}
            />
          </Col>
          <Col span={3}>
            <Input
              placeholder="中文名"
              bordered={false}
              name="title"
              onBlur={(e) => fieldChange(e.target.value, index, 'name')}
            />
          </Col>
          <Col span={3}>
            <Input
              placeholder="描述"
              bordered={false}
              name="des"
              onBlur={(e) => fieldChange(e.target.value, index, 'des')}
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
