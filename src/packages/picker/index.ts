import MPicker from './src';
import './style';

const Plugin: any = MPicker;

Plugin.install = Vue => {
  Vue.component('MPicker', MPicker);
};

export default Plugin;
