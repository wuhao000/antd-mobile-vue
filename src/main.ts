import App from '@/views/app.vue';
import 'highlight.js/styles/atelier-cave-dark.css';
import zhCn from './packages/moment-zh_CN';
import Vue from 'vue';
import router from './router';
import store from './store';
import AegisUI from './packages/index';
moment.updateLocale('zh-cn', zhCn);

Vue.use(AegisUI);
/**
 * 注册全局指令，hljs在router跳转时被清除
 */
Vue.directive('hljs', el => {
  const blocks = el.querySelectorAll('pre code');
  Array.prototype.forEach.call(blocks, hljs.highlightBlock);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
