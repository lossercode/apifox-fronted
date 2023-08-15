import { defineConfig } from '@umijs/max';
import routes from './routes';
export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'HTTP接口管理平台',
  },
  dva: {},
  routes,
  npmClient: 'npm',
});
