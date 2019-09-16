import MCalendar from './src';
import Item from './src/item';
import View from './src/view';
import './style';
MCalendar.Item = Item;
MCalendar.View = View;

MCalendar.install = function (Vue) {
  Vue.component('MCalendar', MCalendar);
  Vue.component('MCalendarItem', MCalendar.Item);
  Vue.component('MCalendarView', MCalendar.View);
};

export default MCalendar;