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
    path: '/project',
    component: './Projects',
    layout: false,
  },
  {
    path: '/project/interface',
    component: './ProjectInfo',
    layout: false,
  }
];

export default routes;
