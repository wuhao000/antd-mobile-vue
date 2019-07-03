import MActivityIndicator from './src';
import 'antd-mobile/es/activity-indicator/style/index.css';

MActivityIndicator.install = Vue => {
  Vue.component('MActivityIndicator', MActivityIndicator);
};

export default MActivityIndicator;
