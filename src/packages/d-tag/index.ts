import DTag from './src';
import './style';

DTag.install = Vue => {
  Vue.component('DTag', DTag);
};

export default DTag;
