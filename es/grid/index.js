import MGrid from './src';
import './style';
var Plugin = MGrid;

Plugin.install = function (Vue) {
  Vue.component('MGrid', MGrid);
};

export default Plugin;