import MSearchBar from './src';
import './style';
var Plugin = MSearchBar;

Plugin.install = function (Vue) {
  Vue.component('MSearchBar', MSearchBar);
};

export default Plugin;