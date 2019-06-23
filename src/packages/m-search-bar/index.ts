import MSearchBar from './src';
import './style';

const Plugin: any = MSearchBar;

Plugin.install = Vue => {
  Vue.component('MSearchBar', MSearchBar);
};

export default Plugin;
