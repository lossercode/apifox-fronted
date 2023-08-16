import { Segmented } from 'antd';
import ReqForm from './reqForm';
import { useModel } from 'umi';

// 请求参数中的body字段需要特殊对待
export default function ReqBody() {
    const {
        reqBody,
        setReqBody,
        setReqBodyType,
      } = useModel('interfaceModel', (model) => model);
  return (
    <>
      <Segmented
        options={[
          'form-data',
          'x-www-form-urlencoded',
          'json',
          'xml'
        ]}
        style={{margin: '0 0 20px 20px'}}
        onChange={setReqBodyType}
      />
      <ReqForm data={reqBody} setData={setReqBody} />
    </>
  );
}
