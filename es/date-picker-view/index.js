import './style';
import DatePickerView from './src';

DatePickerView.install = function (Vue) {
  Vue.component('MDatePickerView', DatePickerView);
};

export default DatePickerView;