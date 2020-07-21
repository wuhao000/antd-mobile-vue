import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import List from '../../list';
import OptionsBasedComponent from '../../mixins/options-based-component';
import CheckboxItem from './checkbox-item';
var MCheckboxList = (_dec = Component({
  name: 'MCheckboxList'
}), _dec2 = Prop({
  type: Array
}), _dec3 = Prop({
  type: String
}), _dec4 = Prop({
  type: Number
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_OptionsBasedComponen) {
  _inheritsLoose(MCheckboxList, _OptionsBasedComponen);

  function MCheckboxList() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _OptionsBasedComponen.call.apply(_OptionsBasedComponen, [this].concat(args)) || this, _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this)), _this.stateValue = _this.value || [], _initializerDefineProperty(_this, "title", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "maxHeightPercentage", _descriptor3, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = MCheckboxList.prototype;

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
    // @ts-ignore
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
    return options.map(function (option) {
      return h(CheckboxItem, _mergeJSXProps([{
        "attrs": {
          "value": _this2.stateValue.includes(option.value),
          "disabled": option.disabled || _this2.isDisabled
        }
      }, {
        "on": {
          change: function change(checkState) {
            _this2.onChange(checkState, option.value);
          }
        }
      }]), [option.label]);
    });
  };

  _proto.onChange = function onChange(checkState, value) {
    if (checkState) {
      if (this.$props.value) {
        if (!this.$props.value.includes(value)) {
          var array = [].concat(this.$props.value);
          array.push(value);
          this.$emit('input', array);
          this.$emit('change', array);
        }
      } else {
        if (!this.stateValue.includes(value)) {
          this.stateValue.push(value);
        }
      }
    } else {
      if (this.$props.value) {
        if (this.$props.value.includes(value)) {
          var _array = [].concat(this.$props.value);

          _array.splice(_array.indexOf(value), 1);

          this.$emit('input', _array);
          this.$emit('change', _array);
        }
      } else {
        if (this.stateValue.includes(value)) {
          this.stateValue.splice(this.stateValue.indexOf(value), 1);
        }
      }
    }
  };

  return MCheckboxList;
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
})), _class2)) || _class);
export default MCheckboxList;