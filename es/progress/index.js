import MProgress from './src';
import './style';

MProgress.install = function (Vue) {
  Vue.component('MProgress', MProgress);
};

export default MProgress;