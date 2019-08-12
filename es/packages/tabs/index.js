import MTabs from './src';
import './style';
const Plugin = MTabs;
Plugin.install = Vue => {
    Vue.component('MTabs', MTabs);
};
export default Plugin;
//# sourceMappingURL=index.js.map