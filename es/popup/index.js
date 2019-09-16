import './style';
import MPopup from './src';

MPopup.install = function (Vue) {
  Vue.component('MPopup', MPopup);
};

export default MPopup;