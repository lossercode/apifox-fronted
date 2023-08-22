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
    path: '/main',
    component: './Main',
    layout: false,
  },
  {
    path: '/project/:id',
    component: './Project',
    layout: false,
  }
];

export default routes;
