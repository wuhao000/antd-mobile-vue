import MIcon from './src';
import './style';
const Plugin = MIcon;
Plugin.install = app => {
    app.component('MIcon', MIcon);
};
export default Plugin;
//# sourceMappingURL=index.js.map