import { PageContainer } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { useState } from 'react';
import DataImport from './DataImport';
import OperationLog from './OperationLog';
import ProjectConfig from './ProjectConfig';
import Interface from './Interface';


const ProjectInfo = () => {
  const [activeTab, setActiveTab] = useState('interface');
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };
  const tabList = [
    {
      tab: '接口列表',
      key: 'interface',
    },
    {
      tab: '操作日志',
      key: 'operationLog',
    },
    {
      tab: '数据导入',
      key: 'dataImport',
    },
    {
      tab: '项目管理',
      key: 'projectConfig',
    },
  ];
  const contentList = {
    interface: <Interface />,
    projectConfig: <ProjectConfig />,
    operationLog: <OperationLog />,
    dataImport: <DataImport />,
  };
  // let location = useLocation();
  // const title = decodeURIComponent(location.search.split('=')[2])
  return (
    <>
      <PageContainer
        title="返回主页"
        onBack={() => history.back()}
        tabList={tabList}
        onTabChange={handleTabChange}
      ></PageContainer>
      {contentList[activeTab]}
    </>
  );
};

export default ProjectInfo;
