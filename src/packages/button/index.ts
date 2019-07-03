import MButton from './src';
import './style';

MButton.install = (Vue) => {
  Vue.component('MButton', MButton);
};
export default MButton;
