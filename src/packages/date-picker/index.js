import MDatePicker from './src';
import Item from './src/item';
import './style';
MDatePicker.Item = Item;
MDatePicker.install = Vue => {
    Vue.component('MDatePicker', MDatePicker);
    Vue.component('MDatePickerItem', MDatePicker.Item);
};
export default MDatePicker;
//# sourceMappingURL=index.js.map