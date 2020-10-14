import MCard from './src';
import './style';
const Plugin = MCard;
Plugin.install = Vue => {
    Vue.component('MCard', MCard);
    Vue.component('MCardBody', MCard.Body);
    Vue.component('MCardHeader', MCard.Header);
    Vue.component('MCardFooter', MCard.Footer);
};
export default Plugin;
//# sourceMappingURL=index.js.map