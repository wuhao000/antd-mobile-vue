import MPullRefresh from './src/index';
import './style';

const Plugin: any = MPullRefresh;

Plugin.install = Vue => {
  Vue.component('MPullRefresh', MPullRefresh);
};

export default Plugin;
