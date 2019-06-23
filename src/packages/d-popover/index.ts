import DPopover from './src';

const Plugin: any = DPopover;

Plugin.install = Vue => {
  Vue.component('DPopover', DPopover);
};

export default Plugin;
