import MGrid from './src';
import './style';

const Plugin: any = MGrid;

Plugin.install = Vue => {
  Vue.component('MGrid', MGrid);
};

export default Plugin;
