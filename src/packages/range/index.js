import MRange from './src';
import Item from './src/item';
import './style';
MRange.Item = Item;
MRange.install = Vue => {
    Vue.component('MRange', MRange);
    Vue.component('MRangeItem', Item);
};
export default MRange;
//# sourceMappingURL=index.js.map