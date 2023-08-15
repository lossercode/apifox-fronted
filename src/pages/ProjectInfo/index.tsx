import { PageContainer } from '@ant-design/pro-components';
import { useState } from 'react';
import ProjectConfig from './ProjectConfig';
import OperationLog from './OperationLog';
import { history, useLocation } from '@umijs/max';
import InterfaceSelect from './InterfaceSelect';
import InterfaceShow from './InterfaceShow';
import s from './index.less';
import DataImport from './DataImport';
//由于Interface列表组件比较复杂 所以单独写一个组件
const Interface = () => {
  return (
    <div className={s.container}>
      <div className={s.leftContent}>
        <InterfaceSelect/>
      </div>
      <div className={s.rightContent}> 
        <InterfaceShow/>
      </div>
    </div>
  );
}

const ProjectInfo = ()=> {
  const [activeTab, setActiveTab] = useState('interface');
  const handleTabChange = (key:string) => {
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
  }];
  const contentList = {
    interface: <Interface />,
    projectConfig:<ProjectConfig/>,
    operationLog: <OperationLog />,
    dataImport:<DataImport/>  
  };
  let location = useLocation();
  const title = decodeURIComponent(location.search.split('=')[2])
  return (
    <>
      <PageContainer        
        title={title}
        onBack={() => history.back()}
        tabList={tabList}
        onTabChange={handleTabChange}
        >
      </PageContainer>
      {contentList[activeTab]}
    </>
  );
}

export default ProjectInfo;