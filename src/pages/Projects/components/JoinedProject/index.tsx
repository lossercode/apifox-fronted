import { EditableProTable } from '@ant-design/pro-components';

type DataSourceType = {
  id: React.Key;
  projectName: string;
  projectDesc: string;
  projectCreator: string;
  joinedAt: string;
  // children?: DataSourceType[];
};
const columns = [
  {
    title: '项目名',
    dataIndex: 'projectName',
    readonly: true,
    width: '20%',
  },
  {
    title: '项目描述',
    dataIndex: 'projectDesc',
    readonly: true,
    width: '20%',
  },
  {
    title: '创建者',
    dataIndex: 'projectCreator',
    readonly: true,
    width: '20%',
  },
  {
    title: '加入时间',
    dataIndex: 'joinedAt',
    readonly: true,
    width: '20%',
  },
];

const dataSource: DataSourceType[] = [
  {
    id: 624748504,
    projectName: '项目1',
    projectDesc: '项目1的简介',
    projectCreator: '张三',
    joinedAt: '2021-08-01',
  },
  {
    id: 624748505,
    projectName: '项目2',
    projectDesc: '项目2的简介',
    projectCreator: '李四',
    joinedAt: '2021-08-02',
  },
];
const JoinedProject = () => {
  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        columns={columns}
        value={dataSource}
        recordCreatorProps={false}
      />
    </>
  );
};

export default JoinedProject;
