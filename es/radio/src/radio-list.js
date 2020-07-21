import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3;

import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import OptionsBasedComponent from '../../mixins/options-based-component';
import List from '../../list';
import RadioItem from './radio-item';
var MRadioList = (_dec = Component({
  name: 'MRadioList'
}), _dec2 = Prop({}), _dec3 = Prop({
  type: String
}), _dec4 = Prop({
  type: Number
}), _dec5 = Watch('value'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_OptionsBasedComponen) {
  _inheritsLoose(MRadioList, _OptionsBasedComponen);

  function MRadioList() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _OptionsBasedComponen.call.apply(_OptionsBasedComponen, [this].concat(args)) || this, _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this)), _this.stateValue = _this.value !== undefined ? _this.value : null, _initializerDefineProperty(_this, "title", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "maxHeightPercentage", _descriptor3, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = MRadioList.prototype;

  _proto.valueChanged = function valueChanged(value) {
    this.stateValue = value;
  };

  _proto.mounted = function mounted() {
    if (this.maxHeightPercentage) {
      var windowHeight = document.body.clientHeight;
      var maxHeight = this.maxHeightPercentage;

      if (this.$el.clientHeight > windowHeight * maxHeight) {
        this.$el.style.height = windowHeight * maxHeight + 'px';
      }
    }
  };

  _proto.render = function render() {
    var h = arguments[0];
    return h(List, {
      "attrs": {
        "required": this.required,
        "title": this.title
      }
    }, [this.renderOptions()]);
  };

  _proto.renderOptions = function renderOptions() {
    var _this2 = this;

    var h = this.$createElement;
    var options = this.getOptions();

    if (options) {
      return options.map(function (option) {
        return h(RadioItem, _mergeJSXProps([{}, {
          "attrs": {
            disabled: option.disabled || _this2.isDisabled
          }
        }, {
          "attrs": {
            "value": _this2.stateValue === option.value
          },
          "on": {
            "change": function change(checkState) {
              _this2.onChange(checkState, option.value);
            }
          }
        }]), [option.label]);
      });
    } else {
      return [];
    }
  };

  _proto.onChange = function onChange(checkState, value) {
    if (checkState) {
      this.stateValue = value;
    }

    this.$emit('input', value);
    this.$emit('change', value);
  };

  return MRadioList;
}(OptionsBasedComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "maxHeightPercentage", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype)), _class2)) || _class);
export { MRadioList as default };