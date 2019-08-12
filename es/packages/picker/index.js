import MPicker from './src';
import './style';
const Plugin = MPicker;
Plugin.install = Vue => {
    Vue.component('MPicker', MPicker);
};
export default Plugin;
//# sourceMappingURL=index.js.map