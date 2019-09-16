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
import Icon from '../../icon';
var NavBar = (_dec = Component({
  name: 'NavBar'
}), _dec2 = Prop({
  type: String,
  default: 'am-navbar'
}), _dec3 = Prop({
  type: String
}), _dec4 = Prop({
  default: 'dark'
}), _dec5 = Prop({}), _dec6 = Prop({}), _dec7 = Prop({}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(NavBar, _Vue);

  function NavBar() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "className", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "mode", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "icon", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "leftContent", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "rightContent", _descriptor6, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = NavBar.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var h = arguments[0];
    var prefixCls = this.prefixCls,
        className = this.className,
        mode = this.mode,
        icon = this.icon;
    var rightContent = this.$slots.rightContent || this.$slots['right-content'] || this.rightContent;
    var leftContent = this.$slots.leftContent || this.$slots['left-content'] || this.leftContent;
    return h("div", {
      "class": classnames(className, prefixCls, prefixCls + "-" + mode)
    }, [h("div", {
      "class": prefixCls + "-left",
      "attrs": {
        "role": "button"
      },
      "on": {
        "click": function click(e) {
          _this2.$emit('left-click', e);

          _this2.$emit('leftClick', e);
        }
      }
    }, [icon ? h("span", {
      "class": prefixCls + "-left-icon",
      "attrs": {
        "aria-hidden": "true"
      }
    }, [typeof icon === 'string' ? h(Icon, {
      "attrs": {
        "type": icon
      }
    }) : icon]) : this.$slots.icon, leftContent]), h("div", {
      "class": prefixCls + "-title"
    }, [this.$slots.default]), h("div", {
      "class": prefixCls + "-right"
    }, [rightContent])]);
  };

  return NavBar;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "className", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "mode", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "icon", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "leftContent", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "rightContent", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default NavBar;