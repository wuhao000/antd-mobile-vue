import MSegmentedControl from './src';
import './style';

MSegmentedControl.install = function (Vue) {
  Vue.component('MSegmentedControl', MSegmentedControl);
};

export default MSegmentedControl;