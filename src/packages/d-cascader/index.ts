import Cascader from './src';
import './style';

Cascader.install = (Vue) => {
  Vue.component('DCascader', Cascader);
};

export default Cascader;
