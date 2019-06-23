import MCalendar from './src';
import Item from './src/item';
import './style';

MCalendar.Item = Item;

MCalendar.install = Vue => {
  Vue.component('MCalendar', MCalendar);
  Vue.component('MCalendarItem', MCalendar.Item);
};

export default MCalendar;
