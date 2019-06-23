import DDescriptionList from './src';
import './style/index.less';

DDescriptionList.install = Vue => {
  Vue.component('DDescriptionList', DDescriptionList);
  Vue.component('DDescription', DDescriptionList.Description);
};

export default DDescriptionList;
