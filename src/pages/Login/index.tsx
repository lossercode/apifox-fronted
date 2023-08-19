import { login } from '@/services/demo/UserController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { history } from 'umi';
import s from './index.less';
import { API } from '@/services/demo/typings';
const LoginPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const handleSubmit = async (values: API.loginParams) => {
    const res = await login(values);
    if (res.code === 200) {
      localStorage.setItem('token', res.data.token);
      messageApi.open({
        type: 'success',
        content: res.msg,
      });
      history.push('/main');
    } else {
      messageApi.open({
        type: 'error',
        content: res.msg,
      });
    }
  };

  return (
    <div className={s.container}>
      <ProConfigProvider hashed={false}>
        <div style={{ backgroundColor: 'white' }}>
          {contextHolder}
          <LoginForm
            logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
            title="HTTP接口管理平台"
            subTitle="高效的接口管理平台"
            onFinish={async (values) => {
              await handleSubmit(values as API.LoginParams);
            }}
          >
            <ProFormText
              name="userAccount"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'请输入用户名'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="userPassword"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'请输入密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
            <div
              style={{
                marginBlockEnd: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                忘记密码
              </a>
            </div>
          </LoginForm>
        </div>
      </ProConfigProvider>
    </div>
  );
};

export default LoginPage;
