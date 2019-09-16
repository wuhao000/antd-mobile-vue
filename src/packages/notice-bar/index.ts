import MNoticeBar from './src';
import './style';

MNoticeBar.install = Vue => {
  Vue.component('MNoticeBar', MNoticeBar);
};

export default MNoticeBar;
