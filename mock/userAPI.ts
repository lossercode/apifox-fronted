import { defineMock } from 'umi';
import { mock } from 'mockjs';
export default defineMock({
  'POST /user/login': (req: any, res: any) => {
    res.json({
      code: 200,
      data: {
        token: 'dghbwikefbnklwef',
        userName: '123' ,
        userAvatar: 'jysdbfiyubwilfb',
        userRole: 1
      },
      msg: '登录成功',
    });
    // res.json({
    //   code : 400,
    //   data:null,
    //   msg:'账号或密码错误，请重试'
    // })
  },
});
