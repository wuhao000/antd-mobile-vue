import MAccordion from './src';
import './style';

MAccordion.install = function (Vue) {
  Vue.component('MAccordion', MAccordion);
  Vue.component('MAccordionPanel', MAccordion.Panel);
};

export default MAccordion;