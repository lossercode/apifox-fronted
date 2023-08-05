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
];

export default routes;
