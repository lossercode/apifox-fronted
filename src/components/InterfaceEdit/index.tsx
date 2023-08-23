import { InterfaceProps } from '@/models/interfaceModel';
import { useEffect, useState } from 'react';
import { useModel } from '@umijs/max';
import BasicInfo from './BasinInfo';
import styles from './index.less';
import Request from './request';
import { Response } from './res';
import { getInterfaceInfo } from '@/services/demo/interfaceController';
import { message } from 'antd';

/*
 * id: 接口id，如果不传，表示该组件在新建接口时使用，如果有值，表示是在更新操作
 * onSave: 点击保存按钮时要执行的操作, 必传
 * onDelete: 点击删除按钮时要执行的操作，新建接口的时候没有该选项，可不传
 * onRun: 点击运行按钮时要执行的操作，必传
 */
export default function InterfaceEdit({
  id,
  onSave,
  onDelete,
  onRun,
}: {
  id?: string
  onSave: (value: InterfaceProps) => void;
  onDelete?: () => void;
  onRun: () => void;
}) {
  const [showDelete, setShowDelete] = useState(true);

  const { init, destroy, reqBody, setReqBody, reqParams, setReqParams, reqCookie, setReqCookie, reqHeader, setReqHeader, reqBodyType, setReqBodyType } = useModel('interfaceModel', (model) => model);
  const props = {reqBody, setReqBody, reqParams, setReqParams, reqCookie, setReqCookie, reqHeader, setReqHeader, reqBodyType, setReqBodyType}
  useEffect(() => {
    const mount = async () => {
      if (typeof id === 'undefined') {
        setShowDelete(false);
      } else {
        const result = await getInterfaceInfo(id)
        if(result.code === 200) {
          const data = result.data
          init(data);
        }else{
          message.error(result.msg)
        }
      }
    }
    mount()

    // 组件卸载的时候回到最初值
    return () => {
      destroy();
    };
  }, [id]);

  return (
    <div className={styles['container']}>
      <BasicInfo
        showDelete={showDelete}
        onSave={onSave}
        onDelete={onDelete}
        onRun={onRun}
      />
      <Request  {...props} />
      <Response />
    </div>
  );
}
