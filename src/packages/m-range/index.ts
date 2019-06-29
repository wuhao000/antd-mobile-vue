import MRange from './src';
import 'antd-mobile/es/range/style/index.css';

MRange.install = Vue => {
  Vue.component('MRange', MRange);
};

export default MRange;
