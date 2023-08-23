import { useModel } from '@umijs/max';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import styles from './index.less';
import { InterfaceProps } from '@/models/interfaceModel';
import { useEffect } from 'react';

export default function BasicInfo({
  showDelete,
  onSave,
  onDelete,
  onRun,
}: {
  showDelete: boolean;
  onSave: (value: InterfaceProps) => void;
  onDelete?: () => void;
  onRun: () => void;
}) {
  const methods = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'TRACE',
    'CONNECT',
    'OPTIONS',
  ];
  const {
    method,
    setMethod,
    url,
    setUrl,
    statu,
    setStatu,
    des,
    setDes,
    name,
    setName,
    getValue
  } = useModel('interfaceModel', (model) => model);

  const handleSave = () => {
    const data = getValue()
    onSave(data)
  };

  useEffect(() => {
    console.log(url)
    console.log(name )
    console.log(des )

  }, [])
  return (
    <>
      <Form>
        <Row>
          <Col span={17}>
            <Form.Item>
              <Input
                addonBefore={
                  <Select
                    defaultValue={method || 'GET'}
                    popupMatchSelectWidth={120}
                    onChange={setMethod}
                  >
                    {methods.map((method) => (
                      <Select.Option value={method} key={method}>
                        {method}
                      </Select.Option>
                    ))}
                  </Select>
                }
                onBlur={(e) => setUrl(e.target.value)}
                placeholder={url}
              />
            </Form.Item>
          </Col>
          <Col span={2} offset={1} className={styles.right}>
            <Button type="primary" onClick={handleSave}>
              保存
            </Button>
          </Col>
          <Col span={2} className={styles.right}>
            <Button onClick={onRun}>运行</Button>
          </Col>
          {showDelete ? (
            <Col span={2} className={styles.right}>
              <Button danger type="primary" onClick={onDelete}>
                删除
              </Button>
            </Col>
          ) : null}
        </Row>

        <Row>
          <Col span={8}>
            <Form.Item label="接口名称">
              <Input
                placeholder={name}
                onBlur={(e) => setName(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={6} offset={2}>
            <Form.Item label="接口状态">
              <Select onChange={setStatu} defaultValue={statu}>
                <Select.Option value="open">开发中</Select.Option>
                <Select.Option value="closed">已发布</Select.Option>
                <Select.Option value="test">测试中</Select.Option>
                <Select.Option value="abolish">已废弃</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="接口描述">
          <Input.TextArea
            onBlur={(e) => setDes(e.target.value)}
            placeholder={des}
          />
        </Form.Item>
      </Form>
    </>
  );
}
