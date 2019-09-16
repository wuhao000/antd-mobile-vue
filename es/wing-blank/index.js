import MWingBlank from './src';
import './style';

MWingBlank.install = function (Vue) {
  Vue.component('MWingBlank', MWingBlank);
};

export default MWingBlank;