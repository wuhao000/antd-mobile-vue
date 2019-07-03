import MTabs from './src';
import './style';

const Plugin: any = MTabs;

Plugin.install = Vue => {
  Vue.component('MTabs', MTabs);
};

export default Plugin;
