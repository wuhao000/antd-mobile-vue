import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { getOptionProperty } from '../utils/option';
import BaseFormComponent from './base-input-component';
var OptionsBasedComponent = (_dec = Component({
  name: 'OptionsBasedComponent'
}), _dec2 = Prop({
  type: [String, Function],
  default: 'label'
}), _dec3 = Prop({
  type: Array
}), _dec4 = Prop({
  type: [String, Function],
  default: 'value'
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_mixins) {
  _inheritsLoose(OptionsBasedComponent, _mixins);

  function OptionsBasedComponent() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _mixins.call.apply(_mixins, [this].concat(args)) || this, _initializerDefineProperty(_this, "labelProperty", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "options", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "valueProperty", _descriptor3, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = OptionsBasedComponent.prototype;

  _proto.beforeUpdate = function beforeUpdate() {
    this.setProps();
  };

  _proto.created = function created() {
    this.setProps();
  };

  _proto.getOptions = function getOptions() {
    return this.getResolvedOptions(this.options);
  };

  _proto.getResolvedOptions = function getResolvedOptions(options) {
    var _this2 = this;

    if (options) {
      return options.map(function (option) {
        var op = _extends({}, option);

        op.label = getOptionProperty(option, _this2.labelProperty);
        op.value = getOptionProperty(option, _this2.valueProperty);
        return op;
      });
    } else {
      return null;
    }
  };

  _proto.setProps = function setProps() {
    var _this3 = this;

    if (this.$slots.default) {
      this.$slots.default.forEach(function (node) {
        if (node.componentOptions && node.componentOptions.propsData['disabled'] === undefined) {
          node.componentOptions.propsData['disabled'] = _this3['isDisabled'];
        }

        if (node.componentOptions && node.componentOptions.propsData['readonly'] === undefined) {
          node.componentOptions.propsData['readonly'] = _this3['isReadonly'];
        }
      });
    }
  };

  return OptionsBasedComponent;
}(mixins(BaseFormComponent)), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "labelProperty", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "options", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "valueProperty", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { OptionsBasedComponent as default };