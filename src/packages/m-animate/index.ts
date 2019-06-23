import MAnimate from './src/index.vue';

const Plugin: any = MAnimate;

Plugin.install = Vue => {
  Vue.component('MAnimate', MAnimate);
};

export default Plugin;
