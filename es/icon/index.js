import MIcon from './src';
import './style';
var Plugin = MIcon;

Plugin.install = function (Vue) {
  Vue.component('MIcon', MIcon);
};

export default Plugin;