import MSwitch from './src/switch';
import MSwitchItem from './src/switch-item';
import './style';
const Plugin = MSwitch;
Plugin.install = Vue => {
    Vue.component('MSwitch', MSwitch);
    Vue.component('MSwitchItem', MSwitchItem);
};
export default Plugin;
//# sourceMappingURL=index.js.map