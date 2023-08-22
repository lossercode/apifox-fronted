import { ReqType } from '@/models/interfaceModel';
import { MinusOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { EditableProTable, ProColumns } from '@ant-design/pro-components';
import { Button, Col, Input, Row, Tag, Upload } from 'antd';
import { useEffect, useState } from 'react';

// 当字段是数组时展示的组件
const ArrayInput = ({
  value,
  onChange,
}: {
  value?: { id: number; label: string }[];
  onChange?: (value: { id: number; label: string }[]) => void;
}) => {
  const initValue = [{ id: 1, label: '' }];
  const [data, setData] = useState<{ id: number; label: string }[]>([]);
  useEffect(() => {
    setData([...(value || initValue)]);
  }, [value]);
  const handleBlur = (e: string, index: number) => {
    const newData = [
      ...data.slice(0, index),
      { id: data[index].id, label: e },
      ...data.slice(index + 1),
    ];
    setData(newData);
    onChange?.(newData);
  };

  const handleAdd = () => {
    const newData = [...data, { id: data.length + 1, label: '' }];
    setData(newData);
    onChange?.(newData);
  };

  const handleDelete = (index: number) => {
    if (data.length > 1) {
      const newData = [...data.slice(0, index), ...data.slice(index + 1)];
      setData(newData);
      onChange?.(newData);
    }
  };
  return (
    <>
      {data.map((item: { id: number; label: string }, index: number) => (
        <Row
          justify="space-between"
          key={item.id}
          style={{ marginBottom: '10px' }}
        >
          <Col span={18}>
            <Input
              onBlur={(e) => handleBlur(e.target.value, index)}
              defaultValue={item.label}
            />
          </Col>
          <Col
            span={6}
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <PlusOutlined style={{ color: 'green' }} onClick={handleAdd} />
            <MinusOutlined
              style={{ color: 'red' }}
              onClick={() => handleDelete(index)}
            />
          </Col>
        </Row>
      ))}
    </>
  );
};

// 请求参数的公共表单组件
export default function ReqForm({
  data,
  setData,
  isBody
}: {
  data: readonly ReqType[];
  setData: (value: readonly ReqType[]) => void;
  isBody: boolean;
}) {
  // 是body时需要支持文件类型
  const valueEnum = (isBody: boolean) => {
    const value = {
      string: { text: 'string', status: 'string' },
      integer: { text: 'integer', status: 'integer' },
      number: { text: 'number', status: 'number' },
      array: { text: 'array', status: 'array' },
    };
    if (isBody) {
      return Object.assign({}, value, {
        file: { text: 'file', status: 'file' },
      });
    } else return value;
  };

  const columns: ProColumns<ReqType>[] = [
    {
      title: '参数名',
      dataIndex: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: valueEnum(isBody),
    },
    {
      title: '示例值',
      dataIndex: 'mock',
      renderFormItem: (_, { record }) =>
        record?.type === 'array' ? (
          <ArrayInput />
        ) : record?.type === 'file' ? (
          <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
            <Button icon={<UploadOutlined />}>点击上传</Button>
          </Upload>
        ) : (
          <Input />
        ),
      render: (_, row) =>
        Array.isArray(row?.mock)
          ? row.mock?.map((item) => <Tag key={item.id}>{item.label}</Tag>)
          : typeof row?.mock === 'object'
          ? 'file'
          : row?.mock,
    },
    {
      title: '描述',
      dataIndex: 'decs',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setData(data.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
    },
  ];
  return (
    <EditableProTable<ReqType>
      rowKey="id"
      columns={columns}
      recordCreatorProps={{
        position: 'bottom',
        record: () => ({ id: Date.now().toString() }),
      }}
      value={data}
      onChange={setData}
    />
  );
}
