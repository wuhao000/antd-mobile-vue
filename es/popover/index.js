import Popover from './src';
import Item from './src/item';
import './style';
Popover.Item = Item;

Popover.install = function (Vue) {
  Vue.component('MPopover', Popover);
  Vue.component('MPopoverItem', Popover.Item);
};

export default Popover;