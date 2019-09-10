import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

import classNames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Provide } from 'vue-property-decorator';
var Steps = (_dec = Component({
  name: 'Step'
}), _dec2 = Prop(String), _dec3 = Prop({
  type: String,
  default: 'am-steps'
}), _dec4 = Prop({
  type: String,
  default: 'ant'
}), _dec5 = Prop({
  type: String,
  default: 'vertical'
}), _dec6 = Prop({
  type: String,
  default: 'vertical'
}), _dec7 = Prop({
  type: String,
  default: 'process'
}), _dec8 = Prop({
  type: String,
  default: ''
}), _dec9 = Prop({
  type: Boolean,
  default: false
}), _dec10 = Prop({
  type: Number,
  default: 0
}), _dec11 = Provide('steps'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Steps, _Vue);

  function Steps() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "icon", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "iconPrefix", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "direction", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "labelPlacement", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "status", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "size", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "progressDot", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "current", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "steps", _descriptor10, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Steps.prototype;

  _proto.render = function render() {
    var _classNames,
        _this2 = this;

    var h = arguments[0];

    var prefixCls = this.prefixCls,
        direction = this.direction,
        labelPlacement = this.labelPlacement,
        iconPrefix = this.iconPrefix,
        status = this.status,
        size = this.size,
        current = this.current,
        progressDot = this.progressDot,
        restProps = _objectWithoutPropertiesLoose(this, ["prefixCls", "direction", "labelPlacement", "iconPrefix", "status", "size", "current", "progressDot"]);

    var adjustedlabelPlacement = !!progressDot ? 'vertical' : labelPlacement;
    var classString = classNames(prefixCls, prefixCls + "-" + direction, (_classNames = {}, _classNames[prefixCls + "-" + size] = size, _classNames[prefixCls + "-label-" + adjustedlabelPlacement] = direction === 'horizontal', _classNames[prefixCls + "-dot"] = !!progressDot, _classNames));
    return h("div", _mergeJSXProps([{
      "class": classString
    }, restProps]), [this.$slots.default.map(function (child, index) {
      if (!child) {
        return null;
      }

      var childProps = {
        stepNumber: index + 1,
        prefixCls: prefixCls,
        iconPrefix: iconPrefix,
        icon: child.componentOptions.propsData['icon'] || '',
        wrapperStyle: {},
        progressDot: progressDot,
        status: child.componentOptions.propsData['status'] || '',
        class: ''
      };
      var icon = _this2.icon;

      if (!icon) {
        if (index < current) {
          // 对应 state: finish
          icon = 'check-circle-o';
        } else if (index > current) {
          // 对应 state: wait
          icon = 'ellipsis';
          childProps.class = 'ellipsis-item';
        }

        if (status === 'error' && index === current || child.componentOptions.propsData['status'] === 'error') {
          icon = 'cross-circle-o';
        }
      }

      if (icon) {
        childProps.icon = icon;
      } // fix tail color


      if (status === 'error' && index === current - 1) {
        childProps.class = prefixCls + "-next-error";
      }

      if (!child.componentOptions.propsData['status']) {
        if (index === current) {
          childProps.status = status;
        } else if (index < current) {
          childProps.status = 'finish';
        } else {
          childProps.status = 'wait';
        }
      }

      Object.keys(childProps).forEach(function (key) {
        child.componentOptions.propsData[key] = childProps[key];
      });
      return child;
    })]);
  };

  return Steps;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "icon", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "iconPrefix", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "direction", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "labelPlacement", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "status", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "size", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "progressDot", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "current", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "steps", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return this;
  }
})), _class2)) || _class);
export { Steps as default };