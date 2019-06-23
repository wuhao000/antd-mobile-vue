import codemirror from './src';

export default {
  install(Vue) {
    Vue.directive('codemirror', codemirror);
  }
};
