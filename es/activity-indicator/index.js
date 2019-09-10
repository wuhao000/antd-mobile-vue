import MActivityIndicator from './src';
import './style';

MActivityIndicator.install = function (Vue) {
  Vue.component('MActivityIndicator', MActivityIndicator);
};

export default MActivityIndicator;