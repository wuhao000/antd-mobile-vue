import MBadge from './src';
import './style';
const Plugin = MBadge;
Plugin.install = Vue => {
    Vue.component('MBadge', MBadge);
};
export default Plugin;
//# sourceMappingURL=index.js.map