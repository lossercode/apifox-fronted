import { defineMock } from 'umi';

export default defineMock({
  'POST /project/create': (req: any, res: any) => {
    res.json({
      code: 200,
      data: {
        projectId: 1,
      },
      msg: '创建成功',
    });
  },

  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'PUT /api/v1/login': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
});
