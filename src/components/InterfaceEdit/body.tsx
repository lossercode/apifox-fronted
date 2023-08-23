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
    // 如果当前为空
    if (resBodyProxy.length === 0) {
      const temp = nextInfo()
      setResBodyProxy([temp]);
      return;
    }

    const current = { ...resBodyProxy[index] };
    const newInfo = nextInfo();
    // 如果是通过操作栏添加
    if(!newInfo.id){
      newInfo.indent = 0
    }
    newInfo.id = resBodyProxy.length + 1;
    newInfo.indent = current.indent
    if (type === 'child') {
      current.child = true;
      newInfo.indent = current.indent + 1;
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

  // 改变某一个字段的值
  const fieldChange = (value: string | number, index: number, key: string) => {
    const current = { ...resBodyProxy[index] };
    const next = nextInfo();
    current[key] = value;
    // 如果是数组需要特别处理
    if (key === 'type' && value === 'array') {
      next.id = resBodyProxy.length + 1;
      next.indent = current.indent + 1;
      current.child = true;
      current.showAction = false;
      setResBodyProxy([
        ...resBodyProxy.slice(0, index),
        current,
        next,
        ...resBodyProxy.slice(index + 1),
      ]);
    } else {
      setResBodyProxy([
        ...resBodyProxy.slice(0, index),
        current,
        ...resBodyProxy.slice(index + 1),
      ]);
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
        { index === 0 || (index > 0 && resBodyProxy[index-1].type !== 'array') ? (
          <p
            className={styles.addContent}
            onClick={() => addField(index, 'sibling')}
          >
            添加相邻节点
          </p>
          ) : null
        }
        {resBodyProxy[index].type === 'object'  ? (
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
            onClick={() => addField(resBodyProxy.length, 'sibling')}
          />
        </Col>
      </Row>

      {resBodyProxy.map((item: ResBodyType, index:number) => (
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
                  disabled={index > 0 && resBodyProxy[index-1].type === 'array'}
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
              placeholder={resBodyProxy[index].type === 'array' ? '请输入个数' : 'mock语法'}
              bordered={false}
              name="mock"
              disabled={
                resBodyProxy[index].type === 'object' 
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
