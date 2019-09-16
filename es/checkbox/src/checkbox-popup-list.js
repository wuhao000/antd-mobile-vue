import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import OptionsBasedComponent from '../../mixins/options-based-component';
import List from '../../list';
import Popup from '../../popup';
import CheckboxList from './checkbox-list';
var MCheckboxPopupList = (_dec = Component({
  name: 'MCheckboxPopupList'
}), _dec2 = Prop({
  type: String
}), _dec3 = Prop({
  type: String
}), _dec4 = Prop({
  type: Boolean,
  default: false
}), _dec5 = Prop({
  type: String,
  default: '、'
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_OptionsBasedComponen) {
  _inheritsLoose(MCheckboxPopupList, _OptionsBasedComponen);

  function MCheckboxPopupList() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _OptionsBasedComponen.call.apply(_OptionsBasedComponen, [this].concat(args)) || this, _initializerDefineProperty(_this, "title", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "placeholder", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "clearable", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "separator", _descriptor4, _assertThisInitialized(_this)), _this.popupVisible = false, _temp) || _assertThisInitialized(_this);
  }

  var _proto = MCheckboxPopupList.prototype;

  _proto.onChange = function onChange(value) {
    this.stateValue = value;
    this.$emit('input', this.stateValue);
    this.$emit('change', this.stateValue);
  };

  _proto.onClick = function onClick() {
    if (!this.disabled && !this.readOnly) {
      this.popupVisible = true;
    }
  };

  _proto.onClear = function onClear() {
    this.$emit('clear');
    this.$emit('input', []);
    this.closePopup();
  };

  _proto.render = function render() {
    var h = arguments[0];

    var listProps = _extends({}, this.$attrs, this.$props, {
      options: this.getOptions()
    });

    var stateValue = this.stateValue,
        optionText = this.optionText,
        placeholder = this.placeholder;
    listProps.title = undefined;
    var cancelButton = h("div", {
      "on": {
        "click": this.onClear
      },
      "class": "am-popup-item am-popup-header-left"
    }, ["\u6E05\u9664"]);
    return h(List.Item, {
      "on": {
        "click": this.onClick
      },
      "attrs": {
        "touchFeedback": !this.readOnly && !this.disabled,
        "text": !!optionText,
        "disabled": this.isDisabled,
        "extraStyle": {
          flexBasis: '60%'
        }
      }
    }, [h(Popup, {
      "attrs": {
        "value": this.isDisabled ? false : this.popupVisible,
        "showCancel": this.clearable,
        "disabled": this.disabled || this.isReadonly,
        "cancelButton": cancelButton,
        "title": this.title
      },
      "on": {
        "ok": this.closePopup,
        "cancel": this.closePopup
      }
    }, [h(CheckboxList, _mergeJSXProps([{}, {
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
    }, [stateValue && stateValue.length ? optionText : placeholder]), h("span", [this.title])]);
  };

  _proto.closePopup = function closePopup() {
    this.popupVisible = false;
  };

  _createClass(MCheckboxPopupList, [{
    key: "optionText",
    get: function get() {
      var _this2 = this;

      var options = this.getOptions(); // @ts-ignore

      var value = this.stateValue;
      var array = [];

      if (value) {
        value.forEach(function (v, index) {
          var option = options.find(function (it) {
            return it.value === v;
          });

          if (option) {
            array.push(option.label);
          } else {
            array.push(v);
          }

          if (index < value.length - 1) {
            array.push(_this2.separator);
          }
        });
      }

      return array;
    }
  }]);

  return MCheckboxPopupList;
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
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "separator", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { MCheckboxPopupList as default };