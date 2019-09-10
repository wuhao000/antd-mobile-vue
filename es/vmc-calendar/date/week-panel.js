import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _class, _class2, _descriptor;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
var WeekPanel = (_dec = Component({
  name: 'WeekPanel'
}), _dec2 = Prop({}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(WeekPanel, _Vue);

  function WeekPanel() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "locale", _descriptor, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = WeekPanel.prototype;

  _proto.render = function render() {
    var h = arguments[0];
    var locale = this.locale;
    var week = locale.week;
    return h("div", {
      "class": "week-panel"
    }, [h("div", {
      "class": "cell cell-grey"
    }, [week[0]]), h("div", {
      "class": "cell"
    }, [week[1]]), h("div", {
      "class": "cell"
    }, [week[2]]), h("div", {
      "class": "cell"
    }, [week[3]]), h("div", {
      "class": "cell"
    }, [week[4]]), h("div", {
      "class": "cell"
    }, [week[5]]), h("div", {
      "class": "cell cell-grey"
    }, [week[6]])]);
  };

  return WeekPanel;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "locale", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default WeekPanel;