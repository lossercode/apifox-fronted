/*
 * @Author: lossercoder
 * @Date: 2023-08-20 09:17:16
 * @LastEditors: lossercode 
 * @LastEditTime: 2023-08-22 23:13:48
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
import InterfaceTest from '@/components/InterfaceTest';
import { useState } from 'react';
// import InterfaceEdit from '../InterfaceShow/Components/InterfaceEdit';

export default function Landing() {
  
  return (
    <>
      <div className={`${styles.box} ${styles.center}`}>
        <Row className={styles.items} justify="center">
          {/* <Col span={6} className={styles.item} onClick={add}>
            <div className={`${styles.icons} ${styles.center}`}>
              <NodeIndexOutlined
                style={{ fontSize: '36px', color: '#1184ff' }}
              />
            </div>
            <div className={`${styles.text} ${styles.center}`}>新建接口</div>
          </Col> */}

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
