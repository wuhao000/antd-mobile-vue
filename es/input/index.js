import MInput from './src';
import './style';

MInput.install = function (Vue) {
  Vue.component('MInput', MInput);
};

export default MInput;