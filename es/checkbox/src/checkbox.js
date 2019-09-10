import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _temp2;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import RcCheckbox from 'ant-design-vue/lib/vc-checkbox';
import AgreeItem from './agree-item';
import CheckboxItem from './checkbox-item';
var Checkbox = (_dec = Component({
  name: 'MCheckbox'
}), _dec2 = Prop({
  default: 'am-checkbox'
}), _dec3 = Prop({
  type: String
}), _dec4 = Prop({
  type: Boolean,
  default: true
}), _dec5 = Prop({
  type: Boolean,
  default: false
}), _dec6 = Prop({
  type: Boolean,
  default: false
}), _dec7 = Watch('value'), _dec8 = Watch('checked'), _dec(_class = (_class2 = (_temp2 = _class3 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Checkbox, _Vue);

  function Checkbox() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "name", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "wrapLabel", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor5, _assertThisInitialized(_this)), _this.checked = _this.value || false, _temp) || _assertThisInitialized(_this);
  }

  var _proto = Checkbox.prototype;

  _proto.onClick = function onClick(e) {
    // e.stopPropagation();
    // e.preventDefault();
    this.checked = !this.checked;
    this.$emit('change', this.checked);
    this.$emit('input', this.checked);
  };

  _proto.valueChanged = function valueChanged(value) {
    this.checked = value;
  };

  _proto.checkedChanged = function checkedChanged(checked) {
    this.$emit('input', checked);
  };

  _proto.render = function render() {
    var h = arguments[0];
    var prefixCls = this.prefixCls;
    var wrapCls = classnames(prefixCls + "-wrapper");
    var mark = h("label", {
      "class": wrapCls
    }, [h(RcCheckbox, _mergeJSXProps([{
      "on": {
        "click": this.onClick
      },
      "attrs": {
        "checked": this.value
      }
    }, {
      "props": this.$props
    }])), this.$slots.default]);

    if (this.wrapLabel) {
      return mark;
    }

    return h(RcCheckbox, _mergeJSXProps2([{
      "on": {
        "click": this.onClick
      },
      "attrs": {
        "checked": this.value
      }
    }, {
      "props": this.$props
    }]), [this.$slots.default]);
  };

  return Checkbox;
}(Vue), _class3.CheckboxItem = CheckboxItem, _class3.AgreeItem = AgreeItem, _temp2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "name", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "wrapLabel", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkedChanged", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "checkedChanged"), _class2.prototype)), _class2)) || _class);
export default Checkbox;