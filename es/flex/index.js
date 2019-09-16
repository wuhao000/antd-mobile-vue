import MFlex from './src';
var Plugin = MFlex;

Plugin.install = function (Vue) {
  Vue.component('MFlex', MFlex);
  Vue.component('MFlexItem', MFlex.Item);
};

export default Plugin;