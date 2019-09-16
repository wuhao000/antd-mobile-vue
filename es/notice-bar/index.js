import MNoticeBar from './src';
import './style';

MNoticeBar.install = function (Vue) {
  Vue.component('MNoticeBar', MNoticeBar);
};

export default MNoticeBar;