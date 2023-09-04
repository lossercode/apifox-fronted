import { createExpect, getAllExpects, getExpectInfo, updateExpectInfo } from '@/services/demo/expectController';
import { EditableProTable, ProColumns } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Tabs,
  TabsProps,
  message,
} from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import style from './index.css';

type ExpectationType = {
  id: string;
  title?: string;
  address?: string;
  creator?: string;
  edited_at?: string;
};

type ReqDataSourceType = {
  id: React.Key;
  reqType?: string;
  reqName?: string;
  reqOperation?: string;
  reqValue?: string;
};

type ResHeaderDataSourceType = {
  id: React.Key;
  name: string;
  value: string;
};

export default function Mock({ id }: { id: string }) {
  const path = useParams();
  // 数据相关

  // 期望列表数据
  const [expectData, setExpectData] = useState<ExpectationType[]>([]);
  // 期望请求参数信息
  const [title, setTitle] = useState<string>('');
  const [reqInfo, setReqInfo] = useState<readonly ReqDataSourceType[]>([]);
  const [resBody, setResBody] = useState<string>('');
  const [resHeader, setResHeader] = useState<
    readonly ResHeaderDataSourceType[]
  >([]);
  const [resBodyType, setResBodyType] = useState<string>('json');
  const [resCode, setResCode] = useState<number>(200);

  const [modalOpen, setModalOpen] = useState(false);
  // 当前选中的期望id
  const [expectId, setExpectId] = useState<string>('');
  // 当前模式，修改或者新建，0表示新建，1为更新
  const [mode, setMode] = useState(0);
  // 是否需要刷新
  const [flush, setFlush] = useState(false);

  // 确定是否需要刷新
  useEffect(() => {
    const getExpectData = async () => {
      const res = await getAllExpects(id);
      if (res.code !== 200) {
        message.error(res.msg);
        return;
      }
      console.log('期望列表为：', res.data);
      setExpectData(res.data);
    };
    getExpectData();
  }, [flush]);

  // 根据期望id进行编辑
  useEffect(() => {
    console.log('我要用期望id获取数据');
    const init = async () => {
      if (!expectId) {
        return;
      }
      const res = await getExpectInfo(expectId);
      if (res.code !== 200) {
        message.error(res.msg);
        return;
      }
      const data = res.data;
      console.log('获取到的数据为', data);
      setTitle(data.title);
      setReqInfo(data.reqInfo);
      setResBodyType(data.resBodyType);
      setResBody(data.resBody);
      setResCode(data.resCode);
      setResHeader(data.resHeader);
    };
    init();
  }, [expectId]);

  // 点击编辑期望
  const editExpect = (id: string) => {
    setModalOpen(true);
    setMode(1);
    console.log(id);
    setExpectId(id);
  };

  // 点击新建期望按钮
  const addNewExpect = () => {
    setModalOpen(true);
    setMode(0);
  };

  const handleOk = async () => {
    // 根据当前模式分别请求不同的地址
    const data = {
      title: title,
      reqInfo: reqInfo,
      resBody: resBody,
      resHeader: resHeader,
      resCode: resCode,
      resBodyType: resBodyType,
    };
    console.log('要发送的数据为', data);
    let res = null;
    if (mode > 0) {
      res = await updateExpectInfo(path.id as string, expectId, data);
    } else {
      console.log('项目id', path.id, '接口id', id)
      res = await createExpect(path.id as string, id, data);
    }
    if (res.code === 200) {
      message.success(res.msg);
      // 关闭模态框
      setModalOpen(false);
      // 刷新
      setFlush(!flush);
    } else {
      message.error(res.msg);
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  // 组件配置项

  const mockColumns: ColumnsType<ExpectationType> = [
    {
      title: '期望简介',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '编辑时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      key: 'tags',
      render: (_, record) => (
        <Space size="middle" key="a">
          <a key="editable" onClick={() => editExpect(record.id)}>
            编辑
          </a>
          <a key="delete">删除</a>
        </Space>
      ),
    },
  ];

  const [dataSource, setDataSource] = useState<ResHeaderDataSourceType[]>([]);
  const columns: ProColumns<ReqDataSourceType>[] = [
    {
      title: '参数位置',
      key: 'reqType',
      dataIndex: 'reqType',
      valueType: 'select',
      valueEnum: {
        header: { text: 'header', status: 'header' },
        body: { text: 'body', status: 'body' },
        cookie: { text: 'cookie', status: 'cookie' },
        query: { text: 'query', status: 'query' },
      },
    },
    {
      title: '参数名',
      dataIndex: 'reqName',
      key: 'reqName',
    },
    {
      title: '比较',
      key: 'reqOperation',
      dataIndex: 'reqOperation',
      valueType: 'select',
      valueEnum: {
        $equal: { text: '等于', status: 'equal' },
        $notEqual: { text: '不等于', status: 'notEqual' },
        $gt: {
          text: '大于',
          status: '$gt',
        },
        $lt: {
          text: '小于',
          status: '$lt',
        },
        $gte: {
          text: '大于或等于',
          status: '$gte',
        },
        $lte: {
          text: '小于或等于',
          status: '$lte',
        },
        $in: {
          text: '存在',
          status: '$in',
        },
        $notIn: {
          text: '不存在',
          status: '$notIn',
        },
        $has: {
          text: '包含',
          status: '$has',
        },
        $notHas: {
          text: '不包含',
          status: '$notHas',
        },
      },
    },
    {
      title: '参数值',
      dataIndex: 'reqValue',
      key: 'reqValue',
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
            setReqInfo(reqInfo.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  const reqItems: TabsProps['items'] = [
    {
      key: '1',
      label: `Body`,
      children: (
        <AceEditor
          width="100%"
          mode={resBodyType}
          theme="monokai"
          name="blah2"
          fontSize={12}
          onChange={(value) => setResBody(value)}
          value={resBody}
          setOptions={{
            showLineNumbers: true,
            wrap: true,
            tabSize: 4,
            useWorker: false,
          }}
        />
      ),
    },
    {
      key: '2',
      label: `Header`,
      children: (
        <EditableProTable<ResHeaderDataSourceType>
          value={resHeader}
          onChange={(value) => setResHeader(value)}
          rowKey="id"
          toolBarRender={false}
          columns={[
            {
              title: '参数名',
              key: 'name',
              dataIndex: 'name',
            },
            {
              title: '参数值',
              key: 'value',
              dataIndex: 'value',
            },
            {
              title: '操作',
              valueType: 'option',
              width: 100,
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
                    setDataSource(dataSource.filter((item) => item.id !== record.id));
                  }}
                >
                  删除
                </a>,
              ],
            },
          ]}
          recordCreatorProps={{
            newRecordType: 'dataSource',
            position: 'bottom',
            record: () => ({
              id: Date.now(),
              name: '',
              value: '',
            }),
          }}
          editable={{
            type: 'multiple',

            actionRender: (row, _, dom) => {
              return [dom.delete];
            },
          }}
        />
      ),
    },
    {
      key: '3',
      label: `设置`,
      children: (
        <Form labelCol={{ span: 4 }} style={{ width: '70%', margin: '0 auto' }}>
          <Form.Item label="响应类型" name="resType">
            <Select
              defaultValue={resBodyType}
              onChange={setResBodyType}
              options={[
                { value: 'json', label: 'json' },
                { value: 'xml', label: 'xml' },
                { value: 'yaml', label: 'yaml' },
              ]}
              key={resBodyType}
            />
          </Form.Item>
          <Form.Item label="响应码" name="resCode">
            <Select
              defaultValue={resCode}
              onChange={setResCode}
              options={[
                { value: 200, label: '200' },
                { value: 304, label: '304' },
                { value: 404, label: '404' },
                { value: 500, label: '500' },
              ]}
              key={resCode}
            />
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div className={style.container}>
      <Button type="primary" className={style.header} onClick={addNewExpect}>
        新建期望
      </Button>
      <Table dataSource={expectData} columns={mockColumns} />
      <Modal
        title={mode > 1 ? '更新期望' : '新建期望'}
        open={modalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <p>期望名称</p>
        <Input
          defaultValue={title}
          onBlur={(e) => setTitle(e.target.value)}
          key={title}
        />
        <p style={{ marginTop: '20px' }}>期望参数</p>
        <EditableProTable<ReqDataSourceType>
          rowKey="id"
          toolBarRender={false}
          columns={columns}
          value={reqInfo}
          onChange={setReqInfo}
          recordCreatorProps={{
            position: 'bottom',
            record: () => ({ id: Date.now().toString() }),
          }}
        />

        <p>期望响应</p>
        <Tabs
          defaultActiveKey="1"
          items={reqItems}
          destroyInactiveTabPane={true}
        />
      </Modal>
    </div>
  );
}
