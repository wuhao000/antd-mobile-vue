import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import RcCheckbox from 'ant-design-vue/lib/vc-checkbox';
var Radio = (_dec = Component({
  name: 'MRadio'
}), _dec2 = Prop({
  type: String,
  default: 'am-radio'
}), _dec3 = Prop({
  type: String
}), _dec4 = Prop({
  type: Boolean,
  default: false
}), _dec5 = Prop({
  type: String
}), _dec6 = Prop({
  default: true
}), _dec7 = Prop({
  type: Boolean,
  default: false
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Radio, _Vue);

  function Radio() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "listPrefixCls", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "name", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "wrapLabel", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor6, _assertThisInitialized(_this)), _this.checked = _this.value || false, _temp) || _assertThisInitialized(_this);
  }

  var _proto = Radio.prototype;

  _proto.onClick = function onClick() {
    this.checked = !this.checked;
    this.$emit('change', this.checked);
  };

  _proto.render = function render() {
    var h = arguments[0];

    var restProps = _extends({}, this.$props);

    var prefixCls = restProps.prefixCls;
    var wrapCls = classnames(prefixCls + "-wrapper");

    if ('class' in restProps) {
      // Todo https://github.com/developit/preact-compat/issues/422
      delete restProps['class'];
    }

    var mark = h("label", {
      "class": wrapCls,
      "on": {
        "click": this.onClick
      }
    }, [h(RcCheckbox, _mergeJSXProps([{}, {
      "attrs": this.$props
    }, {
      "attrs": {
        "checked": this.value,
        "type": "radio"
      }
    }])), this.$slots.default]);

    if (this.wrapLabel) {
      return mark;
    }

    return h(RcCheckbox, _mergeJSXProps2([{
      "attrs": {
        "type": "radio",
        "checked": this.value
      }
    }, {
      "attrs": this.$props
    }]), [this.$slots.default]);
  };

  return Radio;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "listPrefixCls", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "name", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "wrapLabel", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default Radio;