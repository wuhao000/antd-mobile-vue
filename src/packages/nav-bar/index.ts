import 'antd-mobile/es/nav-bar/style/index.css';
import MNavBar from './src';

MNavBar.install = Vue => {
  Vue.component('MNavBar', MNavBar);
};

export default MNavBar;
