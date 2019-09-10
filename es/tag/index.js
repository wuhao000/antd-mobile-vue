import MTag from './src';
import './style';

MTag.install = function (Vue) {
  Vue.component('MTag', MTag);
};

export default MTag;