import MProgress from './src';
import './style';

MProgress.install = Vue => {
  Vue.component('MProgress', MProgress);
};

export default MProgress;
