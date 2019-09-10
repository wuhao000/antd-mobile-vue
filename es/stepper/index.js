import MStepper from './src';
import './style';

MStepper.install = function (Vue) {
  Vue.component('MStepper', MStepper);
};

export default MStepper;