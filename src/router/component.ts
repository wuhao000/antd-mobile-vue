import {RouteConfig} from 'vue-router';

export default [{
  path: 'ae-codemirror',
  name: 'AeCodemirror 代码编辑',
  component: () => import('@/generated/ae-codemirror/index.vue')
}] as RouteConfig[];
