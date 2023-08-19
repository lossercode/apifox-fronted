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
  },

  'get /interface/getAllInterface' : (req: any, res: any) => {
    res.json({
        code:200, 
        data:
            [{
                title: '文件夹A',
                key: 0,
                children:[ 
                    {title: '接口a', key: 1, isLeaf: true },
                    {title: '接口b key =2 ', key: 2, isLeaf: true },]
                },
                {
                    title: '文件夹B',
                    key: 4,
                    children:[ 
                         {title: 'leaf 0-0', key: 5, isLeaf: true },
                         {title: 'leaf 0-1', key: 6, isLeaf: true },]
                 }
            ]
        ,
        msg:''
    })
  },

  'post /interface/interfaceFilesAdd': (req: any, res: any) => {
    res.json({
        code:200,
        data:
        [{
            title: '文件夹A',
            key: '1',
            children:[ 
                {title: 'leaf 0-0', key: '1-0', isLeaf: true },
                {title: 'leaf 0-1', key: '1-1', isLeaf: true },]
            },
            {
                title: '文件夹B',
                key: '2',
                children:[ 
                    {title: 'leaf 0-0', key: '2-0', isLeaf: true },
                    {title: 'leaf 0-1', key: '2-1', isLeaf: true },]
            },
            {
                title: '文件夹c',
                key: '3',
                children:[]
            }
        ],
        msg:'添加成功'
    })
    },



});
