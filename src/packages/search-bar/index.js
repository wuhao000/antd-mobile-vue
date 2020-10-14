import MSearchBar from './src';
import './style';
const Plugin = MSearchBar;
Plugin.install = Vue => {
    Vue.component('MSearchBar', MSearchBar);
};
export default Plugin;
//# sourceMappingURL=index.js.map