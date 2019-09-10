import MCarousel from './src';
import './style';
var Plugin = MCarousel;

Plugin.install = function (Vue) {
  Vue.component('MCarousel', MCarousel);
};

export default Plugin;