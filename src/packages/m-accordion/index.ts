import MAccordion from './src';
import './style';

MAccordion.install = Vue => {
  Vue.component('MAccordion', MAccordion);
  Vue.component('MAccordionPanel', MAccordion.Panel);
};

export default MAccordion;
