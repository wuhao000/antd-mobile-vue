import MActionSheet from './src';
import './style';

MActionSheet.install = function (Vue) {
  Vue.component('MActionSheet', MActionSheet);
};

export default MActionSheet;