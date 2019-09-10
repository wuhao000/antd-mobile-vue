import MPullRefresh from './src/index';
import './style';
var Plugin = MPullRefresh;

Plugin.install = function (Vue) {
  Vue.component('MPullRefresh', MPullRefresh);
};

export default Plugin;