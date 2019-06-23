import MRadio from './src';
import MRadioList from './src/radio-list';
import MRadioPopupList from './src/radio-popup-list';
import './style';

MRadio.install = Vue => {
  Vue.component('MRadio', MRadio);
  Vue.component('MRadioItem', MRadio.RadioItem);
  Vue.component('MRadioPopupList', MRadioPopupList);
  Vue.component('MRadioList', MRadioList);
};

export default MRadio;
