import MButton from './src';
import './style';

MButton.install = function (Vue) {
  Vue.component('MButton', MButton);
};

export default MButton;