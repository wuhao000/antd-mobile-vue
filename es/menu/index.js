import './style';
import Menu from './src';

Menu.install = function (Vue) {
  Vue.component('MMenu', Menu);
};

export default Menu;