import { Tabs, TabsProps } from 'antd';
import { useModel } from 'umi';
import ReqBody from './reqBody';
import ReqForm from './reqForm';
export default function Request() {
  const {
    reqParams,
    setReqParams,
    reqCookie,
    setReqCookie,
    reqHeader,
    setReqHeader,
  } = useModel('interfaceModel', (model) => model);
  const reqItems: TabsProps['items'] = [
    {
      key: '1',
      label: `Params`,
      children: <ReqForm data={reqParams} setData={setReqParams} />,
    },
    {
      key: '2',
      label: `Body`,
      children: <ReqBody />,
    },
    {
      key: '3',
      label: `Header`,
      children: <ReqForm data={reqHeader} setData={setReqHeader} />,
    },
    {
      key: '4',
      label: `Cookie`,
      children: <ReqForm data={reqCookie} setData={setReqCookie} />,
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