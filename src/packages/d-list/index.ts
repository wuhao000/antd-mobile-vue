import DList from './src';

DList.install = Vue => {
  Vue.component('DList', DList);
  Vue.component('DListItem', DList.Item);
  Vue.component('DListItemMeta', DList.Item.Meta);
};

export default DList;
