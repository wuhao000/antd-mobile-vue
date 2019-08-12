import './style';
import DatePickerView from './src';

DatePickerView.install = Vue => {
  Vue.component('MDatePickerView', DatePickerView);
};

export default DatePickerView;
