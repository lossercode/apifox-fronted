import { useModel} from '@umijs/max';
import { Tabs } from 'antd';
import { useEffect } from 'react';
import InterfaceSelect from './Components/InterfaceSelect';
import Landing from './Components/Landing';
import styles from './index.less';
import { TabsProps } from '@/models/interfaceShowModel';
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const Interface = () => {
  const { tabItems, setTabItems, activeTab, setActiveTab } = useModel(
    'interfaceShowModel',
    (model) => model,
  );

  const { needFlush } = useModel('interfaceShowModel', (model) => model);

  // 初始时默认选中落地页
  useEffect(() => {
    setTabItems([{ key: '1', label: '引导页', children: <Landing /> }]);
    setActiveTab(`1`);

    return () => {
      setTabItems([]);
      setActiveTab('');
    };
  }, []);
  const add = () => {
    const newActiveKey = `${tabItems.length + 1}`;
    setTabItems([...tabItems, { label: '引导页', children: <Landing /> , key: newActiveKey }]);
    setActiveTab(newActiveKey);
  };
  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeTab;
    let lastIndex = -1;
    tabItems.forEach((item: TabsProps, i:number) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = tabItems.filter((item: TabsProps) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setTabItems(newPanes);
    setActiveTab(newActiveKey);
  }
  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'remove') {
      remove(targetKey);
    } else {
      add()
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftContent}>
        <InterfaceSelect  needFlush={needFlush}/>
      </div>
      <div className={styles.rightContent}>
        <Tabs
          activeKey={activeTab}
          // 类型设置太麻烦了直接any
          items={tabItems as any}
          type="editable-card"
          style={{ height: '100%' }}
          onChange={(key) => setActiveTab(key)}
          onEdit={onEdit}
        />
      </div>
    </div>
  );
};

export default Interface;
