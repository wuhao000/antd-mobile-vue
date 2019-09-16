import MList from './src';
import './style';

MList.install = function (Vue) {
  Vue.component('MList', MList);
  Vue.component('MListItem', MList.Item);
  Vue.component('MListItemBrief', MList.Item.Brief);
};

export default MList;