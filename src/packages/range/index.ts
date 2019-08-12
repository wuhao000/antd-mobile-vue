import MRange from './src';
import './style';

MRange.install = Vue => {
  Vue.component('MRange', MRange);
};

export default MRange;
