import 'antd-mobile/es/menu/style/index.css';
import Menu from './src';

Menu.install = Vue => {
  Vue.component('MMenu', Menu);
};

export default Menu;
