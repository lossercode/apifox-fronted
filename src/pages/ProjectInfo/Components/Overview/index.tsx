import { Card,Row, Col} from "antd";
import type { FC } from 'react';
import React from 'react';
import styles from './index.less';

const Info: FC<{
    title: React.ReactNode;
    value: React.ReactNode;
    bordered?: boolean;
  }> = ({ title, value, bordered }) => (
    <div className={styles.headerInfo}>
      <span>{title}</span>
      <p>{value}</p>
      {bordered && <em />}
    </div>
  );
const Overview = () => {
    return (
        <div>
            <Card bordered={false}>
                <Row>
                    <Col sm={8} xs={24}>
                        <Info title="接口总数" value="8" bordered />
                    </Col>
                    <Col sm={8} xs={24}>
                        <Info title="本周任务平均处理时间" value="32分钟" bordered />
                    </Col>
                    <Col sm={8} xs={24}>
                        <Info title="本周完成任务数" value="24个任务" />
                    </Col>
                </Row>
            </Card>
        </div>
    )
}
export default Overview;