import { PageContainer } from '@ant-design/pro-components';
import Interface from './Components/Interface';
import { useState } from 'react';
import ProjectConfig from './Components/ProjectConfig';
import OperationLog from './Components/OperationLog';
import { history, useLocation } from '@umijs/max';
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
    }];
const contentList = {
    interface: <Interface />,
    projectConfig:<ProjectConfig/>,
    operationLog: <OperationLog />,
};

const ProjectInfo = ()=> {
  const [activeTab, setActiveTab] = useState('interface');
  const handleTabChange = (key) => {
      setActiveTab(key);
  };
  let location = useLocation();
  const title = decodeURIComponent(location.search.split('=')[2])
  return (
    <>
      <PageContainer        
        title={title}
        onBack={() => window.history.back()}
        tabList={tabList}
        onTabChange={handleTabChange}
        >
      </PageContainer>
      {contentList[activeTab]}
    </>
  );
}

export default ProjectInfo;