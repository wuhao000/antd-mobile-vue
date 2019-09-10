import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";

var _dec, _class;

import CalendarBase from './calendar-base';
import Component from 'vue-class-component';
var CalendarView = (_dec = Component({
  name: 'CalendarView'
}), _dec(_class =
/*#__PURE__*/
function (_CalendarBase) {
  _inheritsLoose(CalendarView, _CalendarBase);

  function CalendarView() {
    return _CalendarBase.apply(this, arguments) || this;
  }

  var _proto = CalendarView.prototype;

  _proto.render = function render() {
    return this.renderCalendar();
  };

  return CalendarView;
}(CalendarBase)) || _class);
export { CalendarView as default };