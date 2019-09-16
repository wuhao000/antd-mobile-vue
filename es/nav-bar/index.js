import './style';
import MNavBar from './src';

MNavBar.install = function (Vue) {
  Vue.component('MNavBar', MNavBar);
};

export default MNavBar;