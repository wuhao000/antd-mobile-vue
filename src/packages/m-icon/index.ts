import MIcon from './src';
import './style';

const Plugin: any = MIcon;

Plugin.install = Vue => {
  Vue.component('MIcon', MIcon);
};

export default Plugin;
