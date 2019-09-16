import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import IconRes from '../../mixins/icon-res';
import Badge from '../../badge';
import { isVNode } from '../../utils/vnode';
var Tab = (_dec = Component({
  name: 'Tab'
}), _dec2 = Prop({
  type: Boolean
}), _dec3 = Prop({
  type: [String, Number]
}), _dec4 = Prop({
  type: Boolean
}), _dec5 = Prop(), _dec6 = Prop(), _dec7 = Prop({
  type: String
}), _dec8 = Prop({
  type: String,
  default: 'am-tab-item'
}), _dec9 = Prop({
  type: String
}), _dec10 = Prop({
  type: String
}), _dec11 = Prop(), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Tab, _Vue);

  function Tab() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "dot", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "badge", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "selected", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "selectedIcon", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "icon", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "title", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "unselectedTintColor", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tintColor", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "dataAttrs", _descriptor10, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Tab.prototype;

  _proto.renderIcon = function renderIcon() {
    var h = this.$createElement;
    var dot = this.dot,
        badge = this.badge,
        selected = this.selected,
        selectedIcon = this.selectedIcon,
        icon = this.icon,
        title = this.title,
        prefixCls = this.prefixCls;
    var realIcon = selected ? selectedIcon : icon;
    var iconDom = realIcon ? isVNode(realIcon) ? realIcon : h(IconRes, _mergeJSXProps([{
      "class": prefixCls + "-image"
    }, {
      "props": {
        type: realIcon
      }
    }])) : null;

    if (badge) {
      return h(Badge, {
        "attrs": {
          "text": badge
        },
        "class": prefixCls + "-badge tab-badge"
      }, [' ', iconDom, ' ']);
    }

    if (dot) {
      return h(Badge, {
        "attrs": {
          "dot": true
        },
        "class": prefixCls + "-badge tab-dot"
      }, [iconDom]);
    }

    return iconDom;
  };

  _proto.onClick = function onClick() {
    this.$emit('click');
  };

  _proto.render = function render() {
    var h = arguments[0];
    var title = this.title,
        prefixCls = this.prefixCls,
        selected = this.selected,
        unselectedTintColor = this.unselectedTintColor,
        tintColor = this.tintColor;
    var iconColor = selected ? tintColor : unselectedTintColor;
    return h("div", _mergeJSXProps2([{}, this.dataAttrs, {
      "on": {
        "click": this.onClick
      },
      "class": "" + prefixCls
    }]), [h("div", {
      "class": prefixCls + "-icon",
      "style": {
        color: iconColor
      }
    }, [this.renderIcon()]), h("p", {
      "class": prefixCls + "-title",
      "style": {
        color: selected ? tintColor : unselectedTintColor
      }
    }, [title])]);
  };

  return Tab;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "dot", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "badge", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "selected", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "selectedIcon", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "icon", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "unselectedTintColor", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "tintColor", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "dataAttrs", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default Tab;