import 'antd-mobile/es/date-picker-view/style/index';
import DatePickerView from './src';

DatePickerView.install = Vue => {
  Vue.component('MDatePickerView', DatePickerView);
};

export default DatePickerView;
