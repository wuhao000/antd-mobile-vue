import MFlex from './src';
const Plugin = MFlex;
Plugin.install = Vue => {
    Vue.component('MFlex', MFlex);
    Vue.component('MFlexItem', MFlex.Item);
};
export default Plugin;
//# sourceMappingURL=index.js.map