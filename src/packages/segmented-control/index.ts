import MSegmentedControl from './src';
import './style';

MSegmentedControl.install = Vue => {
  Vue.component('MSegmentedControl', MSegmentedControl);
};

export default MSegmentedControl;
