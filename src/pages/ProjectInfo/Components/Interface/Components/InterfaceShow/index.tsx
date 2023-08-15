import InterfaceDetail from "@/components/InterfaceDetail";
import MockService from "@/components/MockService";

const InterfaceShow =()=>{
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: '接口详情',
          children: <InterfaceDetail />,
        },
        {
          key: '2',
          label: '编辑',
        },
        {
          key: '3',
          label: '测试',
        },
        {
          key: '4',
          label: 'Mock服务',
          children: <MockService />,
        },
      ];
    return (
    <>
    <div>如果是按就展示接口详情</div>
    </>)
}

export default InterfaceShow;