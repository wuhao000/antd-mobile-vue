import MCarousel from './src';
import './style';
const Plugin = MCarousel;
Plugin.install = Vue => {
    Vue.component('MCarousel', MCarousel);
};
export default Plugin;
//# sourceMappingURL=index.js.map