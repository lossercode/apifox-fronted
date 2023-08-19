import { Button, Col, Form, Input, Row, Select } from 'antd';
import { useModel } from 'umi';
import styles from './index.less';
import Request from '../../../InterfaceShow/Components/InterfaceEdit/request';
import { Response } from '../../../InterfaceShow/Components/InterfaceEdit/res';

const OperationDetail = () => {
    const [basicInfoRef] = Form.useForm();
    const methods = [
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'TRACE',
        'CONNECT',
        'OPTIONS',
    ];

    const {
        method,
        setMethod,
        basicInfo,
        setBasicInfo,
        reqParams,
        reqBody,
        reqCookie,
        reqHeader,
        resInfo,
        setResInfo,
        resBodyProxy,
        setResBodyProxy,
        resIndex,
    } = useModel('interfaceModel', (model) => model);

    const save = async () => {
        // 设置基本信息, 直接发送getFieldsValue
        setBasicInfo(() => basicInfoRef.getFieldsValue());
        // 将代理数组赋值给resbody
        const currentBody = { ...resInfo[resIndex] };
        currentBody.body = resBodyProxy;
        setResInfo([
            ...resInfo.slice(0, resIndex),
            currentBody,
            ...resInfo.slice(resIndex),
        ]);
        setResBodyProxy([]);

        // setResInfo在后面取不到更新后的值,重新开一个值
        const tempBody = resInfo;
        tempBody[resIndex].body = resBodyProxy;
        // 发送所有数据到后端
        const data = {
            method: method,
            ...basicInfoRef.getFieldsValue(),
            reqBody: reqBody,
            reqCookie: reqCookie,
            reqHeader: reqHeader,
            reqParams: reqParams,
            res: tempBody,
        };
        console.log(data);
        // const result = await updateInterfaceInfo(id)
    };

    return (<div className={styles['info-container']}>
            <div className={styles['log-time']}>xxx <span>编辑于2023年8月18日14:00:00</span></div>
            <div className={styles['basic-info']}>
                <Form form={basicInfoRef} initialValues={basicInfo}>
                    <Row>
                        <Col span={17}>
                            <Form.Item name="url">
                                <Input
                                    addonBefore={
                                        <Select
                                            defaultValue={method || 'GET'}
                                            popupMatchSelectWidth={120}
                                            onChange={setMethod}
                                        >
                                            {methods.map((method) => (
                                                <Select.Option value={method} key={method}>
                                                    {method}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={2} offset={1} className={styles.right}>
                            <Button type="primary" onClick={save}>
                                保存
                            </Button>
                        </Col>
                        <Col span={2} className={styles.right}>
                            <Button>运行</Button>
                        </Col>
                        <Col span={2} className={styles.right}>
                            <Button danger type="primary">
                                删除
                            </Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={8}>
                            <Form.Item label="接口名称" name="name">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6} offset={2}>
                            <Form.Item label="接口状态" name="statu">
                                <Select>
                                    <Select.Option value="open">开发中</Select.Option>
                                    <Select.Option value="closed">已发布</Select.Option>
                                    <Select.Option value="test">测试中</Select.Option>
                                    <Select.Option value="abolish">已废弃</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6} offset={2}>
                            <Form.Item label="责任人" name="director">
                                <Select>
                                    <Select.Option value="developing">YOU</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="详细描述" name="des">
                        <Input.TextArea />
                    </Form.Item>
                </Form>

                <Request />
                <Response />
            </div>
        </div>
    );
}

export default OperationDetail