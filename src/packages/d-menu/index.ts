import Menu from './src';


export default {
  install(Vue) {
    Vue.component('DMenu', Menu);
    Vue.component('DMenuItem', Menu.Item);
    Vue.component('DSubMenu', Menu.SubMenu);
    Vue.component('DMenuDivider', Menu.Divider);
    Vue.component('DMenuItemGroup', Menu.ItemGroup);
  }
};
