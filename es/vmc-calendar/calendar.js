import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";

var _dec, _dec2, _class, _class2;

import CalendarBase from './calendar-base';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import Popup from '../popup';
var Calendar = (_dec = Component({
  name: 'Calendar'
}), _dec2 = Watch('visible'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_CalendarBase) {
  _inheritsLoose(Calendar, _CalendarBase);

  function Calendar() {
    return _CalendarBase.apply(this, arguments) || this;
  }

  var _proto = Calendar.prototype;

  _proto.visibleChanged = function visibleChanged(visible) {
    this.state.visible = visible;
    var defaultValue = this.defaultValue;

    if (visible && defaultValue) {
      this.shortcutSelect(defaultValue[0], defaultValue[1]);
    }
  };

  _proto.render = function render() {
    var h = arguments[0];
    var height = document.body.clientHeight;
    var width = document.body.clientWidth;
    return h(Popup, _mergeJSXProps([{
      "on": {
        "close": this.onClose
      }
    }, {
      "attrs": {
        height: height + "px",
        width: height + "px",
        value: this.state.visible,
        placement: this.enterDirection === 'vertical' ? 'bottom' : 'right'
      }
    }]), [this.renderCalendar()]);
  };

  return Calendar;
}(CalendarBase), (_applyDecoratedDescriptor(_class2.prototype, "visibleChanged", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "visibleChanged"), _class2.prototype)), _class2)) || _class);
export default Calendar;