import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _class, _class2, _descriptor;

import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BaseInputComponent from '../../mixins/base-input-component';
import List from '../../list';
import DatePicker from './index';
var DatePickerItem = (_dec = Component({
  name: 'DatePickerItem'
}), _dec2 = Prop({
  type: [String, Object]
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_BaseInputComponent) {
  _inheritsLoose(DatePickerItem, _BaseInputComponent);

  function DatePickerItem() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _BaseInputComponent.call.apply(_BaseInputComponent, [this].concat(args)) || this, _initializerDefineProperty(_this, "title", _descriptor, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = DatePickerItem.prototype;

  _proto.render = function render() {
    var h = arguments[0];
    return h(DatePicker, _mergeJSXProps([{}, {
      "attrs": this.$attrs
    }, {
      "attrs": {
        "disabled": this.isDisabled,
        "editable": !this.isReadonly,
        "value": this.stateValue,
        "slots": this.slots
      },
      "scopedSlots": this.$scopedSlots
    }, {
      "on": this.listeners
    }, {
      "style": this.cssStyle
    }]), [h(List.Item, {
      "attrs": {
        "title": this.title,
        "required": this.required,
        "disabled": this.isDisabled,
        "error": this.error,
        "errorDisplayType": this.errorDisplayType,
        "errorMessage": this.errorMessage,
        "arrow": "horizontal"
      }
    })]);
  };

  return DatePickerItem;
}(BaseInputComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { DatePickerItem as default };