import MTabBar from './src';
import './style';

const Plugin: any = MTabBar;

Plugin.install = Vue => {
  Vue.component('MTabBar', MTabBar);
  Vue.component('MTabBarItem', MTabBar.Item);
};

export default Plugin;
