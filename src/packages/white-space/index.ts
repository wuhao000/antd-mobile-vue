import MWhiteSpace from './src';
import './style';

const Plugin: any = MWhiteSpace;

Plugin.install = Vue => {
  Vue.component('MWhiteSpace', MWhiteSpace);
};

export default Plugin;
