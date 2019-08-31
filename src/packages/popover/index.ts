import Popover from './src';
import Item from './src/item';
import './style';

Popover.Item = Item;
const Plugin: any = Popover;

Plugin.install = Vue => {
  Vue.component('MPopover', Popover);
};

export default Plugin;
