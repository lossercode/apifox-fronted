/*
 * @Author: lossercoder
 * @Date: 2023-08-20 09:17:16
 * @LastEditors: lossercode 
 * @LastEditTime: 2023-08-21 15:58:15
 * @Description: 进入项目后的空白落地页
 */

import InterfaceEdit from '@/components/InterfaceEdit';
import { InterfaceProps } from '@/models/interfaceModel';
import { addInterface } from '@/services/demo/interfaceController';
import { NodeIndexOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useModel, useParams } from '@umijs/max';
import { Col, Row, message } from 'antd';
import styles from './index.less';
import MockService from '../InterfaceShow/Components/MockService';
// import InterfaceEdit from '../InterfaceShow/Components/InterfaceEdit';

export default function Landing() {
  const path = useParams();
  const { tabItems, setTabItems, setActiveTab } = useModel(
    'interfaceShowModel',
    (model) => model,
  );
  const save = async (value: InterfaceProps) => {
    const res = await addInterface(path.id as string, value);
    if (res.code !== 200) {
      message.error(res.msg);
    } else {
      message.success('成功');
    }
  };
  const run = () => {
    // 跳到接口测试页面
    setTabItems([...tabItems, {
      key: `${tabItems.length + 1}`,
      label: '未命名接口',
      children: <MockService />,
    },])
  };

  const add = () => {
    // 跳到接口编辑页面
    setTabItems([
      ...tabItems,
      {
        key: `${tabItems.length + 1}`,
        label: '未命名接口',
        children: <InterfaceEdit onSave={save} onRun={run} />,
      },
    ]);
    // 活动窗口更新
    setActiveTab(`${tabItems.length + 1}`);
  };
  return (
    <>
      <div className={`${styles.box} ${styles.center}`}>
        <Row className={styles.items} justify="space-around">
          <Col span={6} className={styles.item} onClick={add}>
            <div className={`${styles.icons} ${styles.center}`}>
              <NodeIndexOutlined
                style={{ fontSize: '36px', color: '#1184ff' }}
              />
            </div>
            <div className={`${styles.text} ${styles.center}`}>新建接口</div>
          </Col>

          <Col span={6} className={styles.item}>
            <div className={`${styles.icons} ${styles.center}`}>
              <ThunderboltOutlined
                style={{ fontSize: '36px', color: '#1184ff' }}
              />
            </div>
            <div className={`${styles.text} ${styles.center}`}>快捷请求</div>
          </Col>
        </Row>
      </div>
    </>
  );
}
