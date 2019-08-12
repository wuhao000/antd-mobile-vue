import MTextarea from './src';
import './style';
const Plugin = MTextarea;
Plugin.install = Vue => {
    Vue.component('MTextarea', MTextarea);
};
export default Plugin;
//# sourceMappingURL=index.js.map