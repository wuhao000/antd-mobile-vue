import './style';
import MPopup from './src';

MPopup.install = Vue => {
  Vue.component('MPopup', MPopup);
};

export default MPopup;
