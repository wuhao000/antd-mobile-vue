import Anchor from './src';

export default {
  install(Vue) {
    Vue.component('DAnchor', Anchor);
    Vue.component('DAnchorLink', Anchor.Link);
  }
};
