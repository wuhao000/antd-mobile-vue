import MGrid from './src';
import './style';
const Plugin = MGrid;
Plugin.install = Vue => {
    Vue.component('MGrid', MGrid);
};
export default Plugin;
//# sourceMappingURL=index.js.map