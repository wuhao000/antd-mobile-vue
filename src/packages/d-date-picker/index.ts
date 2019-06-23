import DatePicker from './src';

DatePicker.install = Vue => {
  Vue.component('DDatePicker', DatePicker);
  Vue.component('DRangePicker', DatePicker['RangePicker']);
};
export default DatePicker;
