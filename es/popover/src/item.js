import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import TouchFeedback from '../../vmc-feedback';
var Item = (_dec = Component({
  name: 'PopoverItem'
}), _dec2 = Prop({
  type: String,
  default: 'am-popover'
}), _dec3 = Prop(), _dec4 = Prop({
  type: Boolean
}), _dec5 = Prop({
  type: String
}), _dec6 = Prop(), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Item, _Vue);

  function Item() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "icon", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "firstItem", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "activeStyle", _descriptor5, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Item.prototype;

  _proto.render = function render() {
    var _classnames,
        _this2 = this;

    var h = arguments[0];

    var prefixCls = this.prefixCls,
        icon = this.icon,
        disabled = this.disabled,
        firstItem = this.firstItem,
        activeStyle = this.activeStyle,
        restProps = _objectWithoutPropertiesLoose(this, ["prefixCls", "icon", "disabled", "firstItem", "activeStyle"]);

    var cls = classnames(prefixCls + "-item", (_classnames = {}, _classnames[prefixCls + "-item-disabled"] = disabled, _classnames));
    var activeClass = prefixCls + "-item-active";

    if (firstItem) {
      activeClass += prefixCls + "-item-fix-active-arrow";
    }

    return h(TouchFeedback, {
      "attrs": {
        "disabled": disabled,
        "activeClassName": activeClass,
        "activeStyle": activeStyle
      }
    }, [h("div", _mergeJSXProps([{
      "class": cls
    }, restProps, {
      "on": {
        "click": function click(e) {
          if (!_this2.disabled) {
            _this2.$emit('click', e);
          }
        }
      }
    }]), [h("div", {
      "class": prefixCls + "-item-container"
    }, [icon ? // tslint:disable-next-line:jsx-no-multiline-js
    h("span", {
      "class": prefixCls + "-item-icon",
      "attrs": {
        "aria-hidden": "true"
      }
    }, [icon]) : null, h("span", {
      "class": prefixCls + "-item-content"
    }, [this.$slots.default])])])]);
  };

  return Item;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "icon", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "firstItem", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "activeStyle", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Item as default };