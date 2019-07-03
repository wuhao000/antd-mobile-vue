import MTextarea from './src';
import './style';

const Plugin: any = MTextarea;

Plugin.install = Vue => {
  Vue.component('MTextarea', MTextarea);
};

export default Plugin;
