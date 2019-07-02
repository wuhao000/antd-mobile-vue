import 'antd-mobile/es/tag/style/index.css';
import MTag from './src';

MTag.install = Vue => {
  Vue.component('MTag', MTag);
};

export default MTag;
