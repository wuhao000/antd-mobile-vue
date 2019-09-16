import MTabBar from './src';
import './style';
var Plugin = MTabBar;

Plugin.install = function (Vue) {
  Vue.component('MTabBar', MTabBar);
  Vue.component('MTabBarItem', MTabBar.Item);
};

export default Plugin;