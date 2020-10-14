import MAnimate from './src/index.vue';
const Plugin = MAnimate;
Plugin.install = Vue => {
    Vue.component('MAnimate', MAnimate);
};
export default Plugin;
//# sourceMappingURL=index.js.map