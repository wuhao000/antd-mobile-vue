import MPicker from './src';
import './style';
var Plugin = MPicker;

Plugin.install = function (Vue) {
  Vue.component('MPicker', MPicker);
};

export default Plugin;