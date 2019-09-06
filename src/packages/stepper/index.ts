import MStepper from './src';
import './style';

MStepper.install = Vue => {
  Vue.component('MStepper', MStepper);
};

export default MStepper;
