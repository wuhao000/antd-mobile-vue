import MActivityIndicator from './src';
import './style';

MActivityIndicator.install = Vue => {
  Vue.component('MActivityIndicator', MActivityIndicator);
};

export default MActivityIndicator;
