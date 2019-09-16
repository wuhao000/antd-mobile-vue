import MTextarea from './src';
import './style';
var Plugin = MTextarea;

Plugin.install = function (Vue) {
  Vue.component('MTextarea', MTextarea);
};

export default Plugin;