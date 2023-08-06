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
];

export default routes;
