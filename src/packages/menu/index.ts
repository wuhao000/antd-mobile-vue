import './style';
import Menu from './src';

Menu.install = Vue => {
  Vue.component('MMenu', Menu);
};

export default Menu;
