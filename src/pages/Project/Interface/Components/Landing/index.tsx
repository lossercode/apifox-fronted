/*
 * @Author: lossercoder
 * @Date: 2023-08-20 09:17:16
 * @LastEditors: lossercode 
 * @LastEditTime: 2023-08-24 22:03:46
 * @Description: 进入项目后的空白落地页
 */

import InterfaceEdit from '@/components/InterfaceEdit';
import { NodeIndexOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Col, Row } from 'antd';
import styles from './index.less';
import InterfaceTest from '@/components/InterfaceTest';

export default function Landing() {
  const {
    setTabItems,
    tabItems,
    setActiveTab,
  } = useModel('interfaceShowModel', (model) => model);

  const add = () => {
    setTabItems([...tabItems, {key: `${tabItems.length+1}`, label: '未命名接口', children: <InterfaceEdit />}])
    setActiveTab(`${tabItems.length+1}`)
  }

  const test = () => {
    setTabItems([...tabItems, {key: `${tabItems.length+1}`, label: '未命名接口', children: <InterfaceTest />}])
    setActiveTab(`${tabItems.length+1}`)
  }
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

          <Col span={6} className={styles.item} onClick={test}>
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
