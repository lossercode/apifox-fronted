import { defineMock } from 'umi';

export default defineMock({
  'get /interface/getInterfaceInfo': (req: any, res: any) => {
    res.json({
      code: 200,
      data: {
        method: 'post',
        basicInfo: {
          url: 'www.baidu.com',
          name: '我的任务完成了',
          statu: 'open',
          director: 'TFBoy',
        },
        reqParams: [
            {
                id: 123,
                name: '赵露思',
                type: 'string',
                des: '一个人',
                mock: [{label: 'to', id: 1}]
            }
        ],

        reqBody: [],

        reqCookie: [],

        reqHeader: [],
        resInfo: [
          {
            code: 404,
            type: 'xml',
            name: '我帅吗',
            body: []
          },
        ],
      },
    });
    // res.json({
    //   code : 400,
    //   data:null,
    //   msg:'账号或密码错误，请重试'
    // })
  },
});
