import DTable from './src';
import './style';

DTable.install = Vue => {
  Vue.component('DTable', DTable);
};

export default DTable;
