import markdown from '@/components/markdown.vue';
import Antdm from '@/packages';
import App from '@/views/app.vue';
import {CopyOutlined, UserOutlined} from '@ant-design/icons-vue';
import Antd from 'ant-design-vue';
import 'highlight.js/styles/atelier-cave-dark.css';
import {createApp} from 'vue';
import zhCn from './packages/moment-zh_CN';
import router from './router';

moment.updateLocale('zh-cn', zhCn);
/**
 * 注册全局指令，hljs在router跳转时被清除
 */

const app = createApp(App);
// app.directive('hljs', el => {
//   const blocks = el.querySelectorAll('pre code');
//   Array.prototype.forEach.call(blocks, hljs.highlightBlock);
// });
app.config.warnHandler = () => {

};
app.use(Antd);
app.use(router);
app.component('markdown', markdown);
app.component('UserOutlined', UserOutlined);
app.component('CopyOutlined', CopyOutlined);
app.mount('#app');
app.use(Antdm);

if (location.pathname === '/') {
  router.push('/install');
}

export default app;
