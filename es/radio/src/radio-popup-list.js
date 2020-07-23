import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import OptionsBasedComponent from '../../mixins/options-based-component';
import List from '../../list';
import Popup from '../../popup';
import RadioList from './radio-list';
var MRadioPopupList = (_dec = Component({
  name: 'MRadioPopupList'
}), _dec2 = Prop({
  type: [String, Object]
}), _dec3 = Prop({
  type: String
}), _dec4 = Prop({
  type: Boolean,
  default: false
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_OptionsBasedComponen) {
  _inheritsLoose(MRadioPopupList, _OptionsBasedComponen);

  function MRadioPopupList() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _OptionsBasedComponen.call.apply(_OptionsBasedComponen, [this].concat(args)) || this, _initializerDefineProperty(_this, "title", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "placeholder", _descriptor2, _assertThisInitialized(_this)), _this.popupVisible = false, _initializerDefineProperty(_this, "clearable", _descriptor3, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = MRadioPopupList.prototype;

  _proto.onCancel = function onCancel() {
    this.closePopup();
  };

  _proto.onChange = function onChange(value) {
    this.stateValue = value;
    this.popupVisible = false;
  };

  _proto.onClick = function onClick() {
    if (!this.disabled && !this.readOnly) {
      this.popupVisible = true;
    }
  };

  _proto.onClear = function onClear() {
    this.$emit('clear');
    this.$emit('input', null);
    this.closePopup();
  };

  _proto.render = function render() {
    var h = arguments[0];

    var listProps = _extends({}, this.$attrs, this.$props, {
      options: this.getOptions()
    });

    listProps.title = undefined;
    var cancelButton = h("div", {
      "on": {
        "click": this.onClear
      },
      "class": "am-popup-item am-popup-header-left"
    }, ["\u6E05\u9664"]);
    var optionText = this.optionText,
        placeholder = this.placeholder,
        stateValue = this.stateValue,
        closePopup = this.closePopup,
        title = this.title,
        clearable = this.clearable,
        onClick = this.onClick,
        readOnly = this.readOnly,
        isDisabled = this.isDisabled,
        disabled = this.disabled;
    return h(List.Item, {
      "on": {
        "click": onClick
      },
      "attrs": {
        "text": !!optionText,
        "required": this.required,
        "touchFeedback": !readOnly && !disabled,
        "disabled": isDisabled
      }
    }, [h(Popup, {
      "attrs": {
        "value": isDisabled ? false : this.popupVisible,
        "showCancel": clearable,
        "cancelButton": cancelButton,
        "title": title
      },
      "on": {
        "ok": closePopup,
        "cancel": closePopup
      }
    }, [// @ts-ignore
    h(RadioList, _mergeJSXProps([{}, {
      "attrs": listProps
    }, {
      "attrs": {
        "maxHeightPercentage": 0.7
      },
      "on": {
        "change": this.onChange
      }
    }]))]), h("span", {
      "slot": "extra"
    }, [stateValue !== undefined && stateValue !== null ? optionText : placeholder]), h("span", [title])]);
  };

  _proto.closePopup = function closePopup() {
    this.popupVisible = false;
  };

  _createClass(MRadioPopupList, [{
    key: "optionText",
    get: function get() {
      var options = this.getOptions();
      var value = this.stateValue;
      var selectedOption = options.find(function (it) {
        return value === it.value;
      });
      return selectedOption && selectedOption.label;
    }
  }]);

  return MRadioPopupList;
}(OptionsBasedComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "placeholder", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "clearable", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { MRadioPopupList as default };