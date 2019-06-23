import time from './src';

export default {
  install(Vue) {
    Vue.directive('time', time);
  }
};
