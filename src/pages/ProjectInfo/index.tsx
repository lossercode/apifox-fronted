import { PageContainer } from '@ant-design/pro-components';
import Interface from './Components/Interface';
import Overview from './Components/Overview';
import React,{ useState } from 'react';
import { useModel } from 'umi';
const tabList = [{
    tab: '项目概览',
      key: 'overview',
    },
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
    overview: <Overview />, // 对应标签页的内容组件
    interface: <Interface />,
};

  const ProjectInfo = ()=> {
    const [activeTab, setActiveTab] = useState('interface');
    const {selectedProject} = useModel('projectModel', (model) => ({
      selectedProject: model.selectedProject
    }));
    const handleTabChange = (key) => {
        setActiveTab(key);
  };
  return (
    <>
      <PageContainer        
        title={selectedProject?.projectName}
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