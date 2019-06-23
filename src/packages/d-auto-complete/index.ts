import './style';
import DAutoComplete from './src';

DAutoComplete.install = Vue => {
  Vue.component('DAutoComplete', DAutoComplete);
};

export default DAutoComplete;
