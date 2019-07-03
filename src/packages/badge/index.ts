import MBadge from './src';
import './style';

const Plugin: any = MBadge;

Plugin.install = Vue => {
  Vue.component('MBadge', MBadge);
};

export default Plugin;
