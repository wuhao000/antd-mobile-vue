import Icon from './src';

const Plugin: any = Icon;
Plugin.install = (Vue) => {
  Vue.component('AeIcon', Icon);
};

export default Plugin;
