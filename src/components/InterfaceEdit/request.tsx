import { Segmented, Tabs, TabsProps } from 'antd';
import { useContext } from 'react';
import Context from './context';
import ReqForm from './reqForm';
import { ReqType } from './types';

export default function Request({
  reqBodyType,
    setReqBodyType,
    reqBody,
    setReqBody,
    reqCookie,
    setReqCookie,
    reqHeader,
    setReqHeader,
    reqParams,
    setReqParams,
}: {
  reqBodyType: string;
  setReqBodyType: (value: string) => void;
  reqBody: readonly ReqType[];
  setReqBody: (value: readonly ReqType[]) => void;
  reqCookie: readonly ReqType[]
  setReqCookie: (value: readonly ReqType[]) => void;
  reqHeader: readonly ReqType[]
  setReqHeader: (value: readonly ReqType[]) => void;
  reqParams: readonly ReqType[]
  setReqParams: (value: readonly ReqType[]) => void;
}) {
  const {
    
  } = useContext(Context);
  const reqItems: TabsProps['items'] = [
    {
      key: '1',
      label: `Params`,
      children: (
        <ReqForm data={reqParams} setData={setReqParams} isBody={false} />
      ),
    },
    {
      key: '2',
      label: `Body`,
      children: (
        <>
          <Segmented
            options={['form-data', 'x-www-form-urlencoded', 'json', 'xml']}
            style={{ margin: '0 0 20px 20px' }}
            onChange={(value) => setReqBodyType(value as string)}
            defaultValue={reqBodyType}
          />
          <ReqForm data={reqBody} setData={setReqBody} isBody={true} />
        </>
      ),
    },
    {
      key: '3',
      label: `Header`,
      children: (
        <ReqForm data={reqHeader} setData={setReqHeader} isBody={false} />
      ),
    },
    {
      key: '4',
      label: `Cookie`,
      children: (
        <ReqForm data={reqCookie} setData={setReqCookie} isBody={false} />
      ),
    },
  ];

  return (
    <>
      <h3>请求参数</h3>
      <Tabs
        defaultActiveKey="1"
        items={reqItems}
        destroyInactiveTabPane={true}
      />
    </>
  );
}
