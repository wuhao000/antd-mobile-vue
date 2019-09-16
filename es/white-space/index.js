import MWhiteSpace from './src';
import './style';
var Plugin = MWhiteSpace;

Plugin.install = function (Vue) {
  Vue.component('MWhiteSpace', MWhiteSpace);
};

export default Plugin;