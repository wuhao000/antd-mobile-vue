import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _class, _class2, _descriptor;

import { MultiPickerProps } from '../vmc-picker/multi-picker-props';
import classnames from 'classnames';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { setListeners, setProps } from '../utils/vnode';
import MultiPickerMixin from './multi-picker-mixin';
var MultiPicker = (_dec = Component({
  name: 'MultiPicker'
}), _dec2 = Prop(), _dec(_class = (_class2 =
/*#__PURE__*/
function (_MultiPickerProps) {
  _inheritsLoose(MultiPicker, _MultiPickerProps);

  function MultiPicker() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _MultiPickerProps.call.apply(_MultiPickerProps, [this].concat(args)) || this, _initializerDefineProperty(_this, "getValue", _descriptor, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = MultiPicker.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var h = arguments[0];
    var prefixCls = this.$props.prefixCls;
    var selectedValue = this.getValue();
    var colElements = this.$slots.default.map(function (col, i) {
      setProps(col, {
        selectedValue: selectedValue[i]
      });
      setListeners(col, {
        input: function input() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          _this2.$emit.apply(_this2, ['input', i].concat(args));
        },
        scrollChange: function scrollChange() {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          _this2.$emit.apply(_this2, ['scroll-change', i].concat(args));
        }
      });
      return col;
    });
    return h("div", {
      "class": classnames(prefixCls)
    }, [colElements]);
  };

  return MultiPicker;
}(MultiPickerProps), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "getValue", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default MultiPickerMixin(MultiPicker);