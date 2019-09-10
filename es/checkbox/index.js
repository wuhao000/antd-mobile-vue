import '../list/style';
import MCheckbox from './src';
import MCheckboxList from './src/checkbox-list';
import MCheckboxPopupList from './src/checkbox-popup-list';
import './style';
var Plugin = MCheckbox;

Plugin.install = function (Vue) {
  Vue.component('MCheckbox', MCheckbox);
  Vue.component('MCheckboxList', MCheckboxList);
  Vue.component('MCheckboxItem', MCheckbox.CheckboxItem);
  Vue.component('MAgreeItem', MCheckbox.AgreeItem);
  Vue.component('MCheckboxPopupList', MCheckboxPopupList);
};

export default Plugin;