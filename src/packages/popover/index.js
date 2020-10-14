import Popover from './src';
import Item from './src/item';
import './style';
Popover.Item = Item;
Popover.install = Vue => {
    Vue.component('MPopover', Popover);
    Vue.component('MPopoverItem', Popover.Item);
};
export default Popover;
//# sourceMappingURL=index.js.map