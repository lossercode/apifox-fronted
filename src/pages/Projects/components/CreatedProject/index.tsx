import { EditableProTable } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { history } from 'umi';
type DataSourceType = {
  id: React.Key;
  projectName: string;
  projectDesc: string;
  createdAt: string;
  updateAt: string;
  // children?: DataSourceType[];
};
const dataSource: DataSourceType[] = [
  {
    id: 1,
    projectName: '项目1',
    projectDesc: '项目1的简介',
    createdAt: '2021-08-01',
    updateAt: '2021-09-01',
  },
  {
    id: 2,
    projectName: '项目2',
    projectDesc: '项目2的简介',
    createdAt: '2021-08-01',
    updateAt: '2021-09-01',
  },
];

const columns: ProColumns<DataSourceType>[] = [
  {
    title: '项目名',
    dataIndex: 'projectName',
    // editable: (text, record, index) => {
    //   return index !== 0;
    // },
    editable: true,
    width: '20%',
  },
  {
    title: '项目描述',
    dataIndex: 'projectDesc',
    editable: true,
    width: '20%',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    readonly: true,
    width: '20%',
  },
  {
    title: '操作',
    valueType: 'option',
    width: '20%',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={(e) => {
          e.stopPropagation(); //阻止冒泡
          console.log(action);
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a
        key="invite"
        onClick={() => {
          console.log('111');
          // setDataSource(dataSource.filter((item) => item.id !== record.id));
        }}
      >
        邀请
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
];

const CreatedProject = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        onRow={(record) => {
          return {
            onClick: () => {
              history.push(`/projects/${record.id}`);
            }, // 点击行
          };
        }}
        columns={columns}
        value={dataSource}
        recordCreatorProps={false}
        editable={{
          type: 'single',
          editableKeys,
          onChange: setEditableRowKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
        }}
        pagination={{
          current: 1, // 当前页数
          pageSize: 10, // 每页显示条数
          // total: dataSource.length, // 数据总数
        }}
      />
    </>
  );
};

export default CreatedProject;
