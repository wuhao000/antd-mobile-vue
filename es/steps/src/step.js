import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12;

import classNames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
import Icon from '../../icon';

function isString(str) {
  return typeof str === 'string';
}

var statusIcon = {
  finish: 'check-circle',
  error: 'cross-circle-o',
  wait: 'ellipsis'
};
var Step = (_dec = Component({
  name: 'Step'
}), _dec2 = Prop({
  type: String,
  default: 'am-step'
}), _dec3 = Prop(), _dec4 = Prop([Number, String]), _dec5 = Prop(String), _dec6 = Prop({
  type: String,
  default: 'ant'
}), _dec7 = Prop(String), _dec8 = Prop([Number, String]), _dec9 = Prop(Number), _dec10 = Prop(String), _dec11 = Prop(String), _dec12 = Prop(), _dec13 = Inject('steps'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Step, _Vue);

  function Step() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "wrapperStyle", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "itemWidth", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "status", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "iconPrefix", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "icon", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "adjustMarginRight", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "stepNumber", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "description", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "title", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "progressDot", _descriptor11, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "steps", _descriptor12, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Step.prototype;

  _proto.renderIconNode = function renderIconNode() {
    var _classNames;

    var h = this.$createElement;
    var prefixCls = this.prefixCls,
        progressDot = this.progressDot,
        stepNumber = this.stepNumber,
        status = this.status,
        title = this.title,
        description = this.description,
        icon = this.icon,
        iconPrefix = this.iconPrefix;

    if (this.$slots.icon) {
      return h("span", {
        "class": prefixCls + "-icon"
      }, [this.$slots.icon]);
    }

    var iconNode;
    var iconClassName = classNames(prefixCls + "-icon", iconPrefix + "icon", (_classNames = {}, _classNames[iconPrefix + "icon-" + icon] = icon && isString(icon), _classNames[iconPrefix + "icon-check"] = !icon && status === 'finish', _classNames[iconPrefix + "icon-cross"] = !icon && status === 'error', _classNames));
    var iconStyle = {
      position: 'relative',
      left: '-1px'
    };
    var iconDot = h("span", {
      "class": prefixCls + "-icon-dot"
    }); // `progressDot` enjoy the highest priority

    if (progressDot) {
      if (typeof progressDot === 'function') {
        iconNode = h("span", {
          "class": prefixCls + "-icon"
        }, [progressDot(iconDot, {
          index: stepNumber - 1,
          status: status,
          title: title,
          description: description
        })]);
      } else {
        iconNode = h("span", {
          "class": prefixCls + "-icon"
        }, [iconDot]);
      }
    } else if (icon && isString(icon)) {
      iconNode = h("span", {
        "class": prefixCls + "-icon"
      }, [h(Icon, {
        "style": iconStyle,
        "attrs": {
          "size": this.iconSize,
          "type": icon
        }
      })]);
    } else if (icon || status === 'finish' || status === 'error') {
      iconNode = h("span", {
        "class": iconClassName
      });
    } else {
      iconNode = h("span", {
        "class": prefixCls + "-icon"
      }, [stepNumber]);
    }

    return iconNode;
  };

  _proto.render = function render() {
    var _classNames2;

    var h = arguments[0];

    var prefixCls = this.prefixCls,
        itemWidth = this.itemWidth,
        _this$status = this.status,
        status = _this$status === void 0 ? 'wait' : _this$status,
        iconPrefix = this.iconPrefix,
        icon = this.icon,
        wrapperStyle = this.wrapperStyle,
        adjustMarginRight = this.adjustMarginRight,
        stepNumber = this.stepNumber,
        description = this.description,
        title = this.title,
        progressDot = this.progressDot,
        restProps = _objectWithoutPropertiesLoose(this, ["prefixCls", "itemWidth", "status", "iconPrefix", "icon", "wrapperStyle", "adjustMarginRight", "stepNumber", "description", "title", "progressDot"]);

    var classString = classNames(prefixCls + "-item", prefixCls + "-item-" + status, (_classNames2 = {}, _classNames2[prefixCls + "-item-custom"] = icon, _classNames2));
    var stepItemStyle = {};

    if (itemWidth) {
      stepItemStyle.width = itemWidth;
    }

    if (adjustMarginRight) {
      stepItemStyle.marginRight = adjustMarginRight;
    }

    return h("div", _mergeJSXProps([{}, restProps, {
      "class": classString,
      "style": stepItemStyle
    }]), [h("div", {
      "class": prefixCls + "-item-tail"
    }), h("div", {
      "class": prefixCls + "-item-icon"
    }, [this.renderIconNode()]), h("div", {
      "class": prefixCls + "-item-content"
    }, [h("div", {
      "class": prefixCls + "-item-title"
    }, [this.$slots.title ? this.$slots.title : title]), (description || this.$slots.description) && h("div", {
      "class": prefixCls + "-item-description"
    }, [this.$slots.description ? this.$slots.description : description])])]);
  };

  _createClass(Step, [{
    key: "iconSize",
    get: function get() {
      if (this.steps.size === 'small') {
        return 18;
      } else {
        return 22;
      }
    }
  }]);

  return Step;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "wrapperStyle", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "itemWidth", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "status", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "iconPrefix", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "icon", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "adjustMarginRight", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "stepNumber", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "description", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "progressDot", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "steps", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Step as default };