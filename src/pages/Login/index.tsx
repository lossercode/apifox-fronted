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
<<<<<<< HEAD

const LoginPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      const msg = await login(values);
      if (msg.success) {
        messageApi.open({
          type: 'success',
          content: '登录成功',
        });
        // await fetchUserInfo();
        // const urlParams = new URL(window.location.href).searchParams;
        // history.push(urlParams.get('redirect') || '/');
        //跳转到project页面
        history.push('/projects');
        return;
      }
      //   setUserLoginState(msg);
    } catch (error) {
      //   message.error(登录失败，请重试！);
    }
  };

  return (
    <ProConfigProvider hashed={false}>
      {contextHolder}
      <div style={{ backgroundColor: 'white' }}>
=======
import s from './index.less';
const LoginPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const handleSubmit = async (values: API.LoginParams) => {
      const res = await login(values);
      if (res.code === 200) {
        localStorage.setItem('token', res.data.token);
        messageApi.open({
          type: 'success',
          content: res.msg,
        });
        history.push('/main');
      }else{
        messageApi.open({
          type: 'error',
          content: res.msg,
        })
      }
    };

  return (
    <div className={s.container}>
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: 'white' }}>
      {contextHolder}
>>>>>>> fy
        <LoginForm
          logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
          title="HTTP接口管理平台"
          subTitle="高效的接口管理平台"
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <ProFormText
<<<<<<< HEAD
            name="username"
=======
            name="userAccount"
>>>>>>> fy
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
<<<<<<< HEAD
            placeholder={'用户名: admin or user'}
=======
            placeholder={'请输入用户名'}
>>>>>>> fy
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <ProFormText.Password
<<<<<<< HEAD
            name="password"
=======
            name="userPassword"
>>>>>>> fy
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
<<<<<<< HEAD
            placeholder={'密码: ant.design'}
=======
            placeholder={'请输入密码'}
>>>>>>> fy
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
<<<<<<< HEAD
=======
    </div>
>>>>>>> fy
  );
};

export default LoginPage;
