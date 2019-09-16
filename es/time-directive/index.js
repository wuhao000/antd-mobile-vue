import time from './src';
export default {
  install: function install(Vue) {
    Vue.directive('time', time);
  }
};