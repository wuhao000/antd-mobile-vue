import MPagination from './src';
import './style';

MPagination.install = function (Vue) {
  Vue.component('MPagination', MPagination);
};

export default MPagination;