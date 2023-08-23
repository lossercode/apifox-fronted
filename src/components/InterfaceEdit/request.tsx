import { Segmented, Tabs, TabsProps } from 'antd';
import ReqForm from './reqForm';
import { ReqType } from '@/models/interfaceModel';
import { Dispatch, SetStateAction } from 'react';
export default function Request({reqParams,
  setReqParams,
  reqCookie,
  setReqCookie,
  reqHeader,
  setReqHeader,
  reqBodyType,
  setReqBodyType,
  reqBody,
  setReqBody}: {
    reqCookie: readonly ReqType[],
    reqParams: readonly ReqType[],
    reqHeader: readonly ReqType[],
    reqBody: readonly ReqType[],
    reqBodyType: string,
    setReqBodyType: Dispatch<SetStateAction<string>>,
    setReqParams: Dispatch<SetStateAction<readonly ReqType[]>>,
    setReqBody: Dispatch<SetStateAction<readonly ReqType[]>>,
    setReqHeader: Dispatch<SetStateAction<readonly ReqType[]>>,
    setReqCookie: Dispatch<SetStateAction<readonly ReqType[]>>,

  }) {
  
  const reqItems: TabsProps['items'] = [
    {
      key: '1',
      label: `Params`,
      children: (
        <ReqForm data={ reqParams } setData={setReqParams} isBody={false} />
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
        <ReqForm data={ reqHeader } setData={setReqHeader} isBody={false} />
      ),
    },
    {
      key: '4',
      label: `Cookie`,
      children: (
        <ReqForm data={ reqCookie } setData={setReqCookie} isBody={false} />
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
