import MResult from './src';
import './style';

MResult.install = function (Vue) {
  Vue.component('MResult', MResult);
};

export default MResult;