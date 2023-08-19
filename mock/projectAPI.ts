import { defineMock } from 'umi';
import { mock } from 'mockjs';
export default defineMock({
  'GET /project/getAll': (req: any, res: any) => {
    if(req.query.type === '0'){
    res.json({
      data: [
        {
          id: 1,
          projectName: '项目1 siengiu',
          projectDesc: '项目1的简介',
          createdAt: '2021-08-01',
        },
        {
          id: 2,
          projectName: '项目2 jksngi',
          projectDesc: '项目2的简介',
          createdAt: '2021-08-01',
        },
      ]
    })}
    else{
      res.json({
        data: [
          {
            id: 624748504,
            projectName: '项目1 kkk',
            projectDesc: '项目1的简介',
            projectCreator: '张三',
            joinedAt: '2021-08-01',
          },
          {
            id: 624748505,
            projectName: '项目2 eeee',
            projectDesc: '项目2的简介',
            projectCreator: '李四',
            joinedAt: '2021-08-02',
          },
        ]
      })
    }
  },

  'POST /project/create': (req: any, res: any) => {
    // console.log("req",req);
    res.json({
      code: 200,
      msg: '创建成功',
      data: {
        projectId: 1,
        projectName:req.query.projectName
      },
    });
  },

  'POST /project/update': (req: any, res: any) => {
    res.json({
      code: 200,
      msg: '修改成功',
      data: {},
    });
  },
});
