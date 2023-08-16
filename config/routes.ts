const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: './Login',
    layout: false,
  },
  {
<<<<<<< HEAD
    path: '/projects',
    component: './Projects',
    layout: false,
  },
  {
    path: '/projects/:id',
    component: '@/layouts/index',
    layout: false,
    routes: [
      {
        path: '/projects/:id',
        component: './Detail/index',
      },
    ],
  },
=======
    path: '/main',
    component: './Main',
    layout: false,
  },
  {
    path: '/project/:id',
    component: './Project',
    layout: false,
  }
  // {
  //   path: '/projects/details',
  //   name: '接口列表',
  //   // layout: 
  //   //   {
  //   //     navTheme: "light",
  //   //     primaryColor: "#1890ff",
  //   //     layout: "side",
  //   //     contentWidth: "Fluid",
  //   //     fixedHeader: false,
  //   //     fixSiderbar: true,
  //   //     pwa: false,
  //   //     logo: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
  //   //     headerHeight: 48,
  //   //     splitMenus: false,
  //   //     footerRender: false,
  //   //     menuHeaderRender: false
  //   // },
  //   component: './Interfaces',
  //   icon: 'dashboard',
  //   // routes: [
  //   //   {
  //   //     path: '/projects/details',
  //   //     name: '接口列表',
  //   //     component: './Interfaces',
  //   //   }
  //   // ]
  // },
  // {
  //   path: '/projects/Log',
  //   name: '接口日志',
  //   component: './Log',
  // },
  // {
  //   path: '/projects/settings',
  //   name: '项目设置',
  //   component: './Settings',
  // }
  // {
  //   path: '/projects/:id',
  //   component: '@/layouts/index',
  //   layout: false,
  //   routes: [
  //     {
  //       path: '/projects/:id',
  //       component: './Detail/index',
  //     },
  //   ],
  // },
>>>>>>> fy
];

export default routes;
