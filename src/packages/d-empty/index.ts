import DEmpty from './src';
import './style';

DEmpty.install = Vue => {
  Vue.component('DEmpty', DEmpty);
};

export default DEmpty;
