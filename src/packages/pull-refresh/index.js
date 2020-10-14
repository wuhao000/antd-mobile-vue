import MPullRefresh from './src/index';
import './style';
const Plugin = MPullRefresh;
Plugin.install = Vue => {
    Vue.component('MPullRefresh', MPullRefresh);
};
export default Plugin;
//# sourceMappingURL=index.js.map