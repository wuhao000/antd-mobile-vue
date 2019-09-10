import MBadge from './src';
import './style';
var Plugin = MBadge;

Plugin.install = function (Vue) {
  Vue.component('MBadge', MBadge);
};

export default Plugin;