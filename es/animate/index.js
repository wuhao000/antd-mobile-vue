import MAnimate from './src/index.vue';
var Plugin = MAnimate;

Plugin.install = function (Vue) {
  Vue.component('MAnimate', MAnimate);
};

export default Plugin;