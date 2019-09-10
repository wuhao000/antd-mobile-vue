import LoadingDirective from './src';
export default {
  install: function install(Vue) {
    Vue.directive('loading', LoadingDirective);
  }
};