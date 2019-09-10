import MTabs from './src';
import './style';
var Plugin = MTabs;

Plugin.install = function (Vue) {
  Vue.component('MTabs', MTabs);
};

export default Plugin;