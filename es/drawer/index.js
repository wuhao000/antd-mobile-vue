import MDrawer from './src';
import './style';

MDrawer.install = function (Vue) {
  Vue.component('MDrawer', MDrawer);
};

export default MDrawer;