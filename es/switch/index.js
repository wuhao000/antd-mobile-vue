import MSwitch from './src/switch';
import MSwitchItem from './src/switch-item';
import './style';
var Plugin = MSwitch;

Plugin.install = function (Vue) {
  Vue.component('MSwitch', MSwitch);
  Vue.component('MSwitchItem', MSwitchItem);
};

export default Plugin;