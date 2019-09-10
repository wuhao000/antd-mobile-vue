import MCard from './src';
import './style';
var Plugin = MCard;

Plugin.install = function (Vue) {
  Vue.component('MCard', MCard);
  Vue.component('MCardBody', MCard.Body);
  Vue.component('MCardHeader', MCard.Header);
  Vue.component('MCardFooter', MCard.Footer);
};

export default Plugin;