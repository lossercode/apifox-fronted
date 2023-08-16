import { ReqType } from '@/models/interfaceModel';
import { EditableProTable, ProColumns } from '@ant-design/pro-components';

// 请求参数的公共表单组件
export default function ReqForm({
  data,
  setData,
}: {
  data: readonly ReqType[];
  setData: (value: readonly ReqType[]) => void;
}) {
  const columns: ProColumns<ReqType>[] = [
    {
      title: '参数名',
      dataIndex: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        str: { text: 'string', status: 'string' },
        int: { text: 'integer', status: 'integer' },
        number: { text: 'number', status: 'number' },
        arr: { text: 'array', status: 'array' },
      },
    },
    {
      title: 'Mock',
      dataIndex: 'mock',
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
