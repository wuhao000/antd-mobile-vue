import MCarousel from './src';
import './style';

const Plugin: any = MCarousel;

Plugin.install = Vue => {
  Vue.component('MCarousel', MCarousel);
};

export default Plugin;
