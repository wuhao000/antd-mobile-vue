import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Popup from '../../popup';
import TouchFeedback from '../../vmc-feedback';
var ActionSheet = (_dec = Component({
  name: 'ActionSheet'
}), _dec2 = Prop({
  type: String,
  default: 'am-action-sheet'
}), _dec3 = Prop({
  type: String,
  default: '取消'
}), _dec4 = Prop({
  type: Boolean,
  default: true
}), _dec5 = Prop({
  type: Boolean,
  default: true
}), _dec6 = Prop({
  type: [Object, Array],
  default: function _default() {
    return [];
  }
}), _dec7 = Prop({
  type: Boolean,
  default: true
}), _dec8 = Prop({
  type: String,
  default: 'ios'
}), _dec9 = Prop(Boolean), _dec10 = Prop({
  type: String,
  default: 'normal'
}), _dec11 = Prop({
  type: String
}), _dec12 = Watch('show'), _dec13 = Watch('value', {
  immediate: true
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(ActionSheet, _Vue);

  function ActionSheet() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "cancelText", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "closeOnClickingMask", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "closeOnClickingMenu", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "menus", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "showCancel", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "theme", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor8, _assertThisInitialized(_this)), _this.$tabbar = null, _this.hasHeaderSlot = false, _this.show = _this.value || false, _initializerDefineProperty(_this, "type", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "title", _descriptor10, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = ActionSheet.prototype;

  _proto.cancelClick = function cancelClick() {
    this.$emit('input', false);
    this.show = false;
  };

  _proto.showChanged = function showChanged(val) {
    var _this2 = this;

    this.$emit('input', val);

    if (val) {
      this.fixIos(-1);
    } else {
      setTimeout(function () {
        _this2.fixIos(100);
      }, 200);
    }
  };

  _proto.valueChanged = function valueChanged(val) {
    this.show = val;
  };

  _proto.mounted = function mounted() {
    var _this3 = this;

    this.hasHeaderSlot = !!this.$slots.header;
    this.$nextTick(function () {
      _this3.$tabbar = document.querySelector('.weui-tabbar');
      _this3.$refs.iOSMenu && _this3.$refs.iOSMenu.addEventListener('transitionend', _this3.onTransitionEnd);
    });
  };

  _proto.beforeDestroy = function beforeDestroy() {
    this.fixIos(100);
    this.$refs.iOSMenu && this.$refs.iOSMenu.removeEventListener('transitionend', this.onTransitionEnd);
  };

  _proto.emitEvent = function emitEvent(event, menu, item) {
    if (event === 'on-click-menu' && !/.noop/.test(menu)) {
      var _item = item;

      if (typeof _item === 'object') {
        _item = JSON.parse(JSON.stringify(_item));
      }

      this.$emit(event, menu, _item);
      this.$emit(event + "-" + menu);
      this.closeOnClickingMenu && (this.show = false);
    }
  };

  _proto.fixIos = function fixIos(zIndex) {
    if (this.$el.parentNode && this.$el.parentNode.className.indexOf('v-transfer-dom') !== -1) {
      return;
    }

    if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {
      this.$tabbar.style.zIndex = zIndex;
    }
  };

  _proto.onClickingMask = function onClickingMask() {
    this.$emit('click-mask');
    this.closeOnClickingMask && (this.show = false);
  };

  _proto.onMenuClick = function onMenuClick(text, key) {
    if (typeof text === 'string') {
      this.emitEvent('click-menu', key, text);
    } else {
      if (text.type !== 'disabled' && text.type !== 'info') {
        if (text.value || text.value === 0) {
          this.emitEvent('click-menu', text.value, text);
        } else {
          this.emitEvent('click-menu', '', text);
          this.show = false;
        }
      }
    }
  };

  _proto.onTransitionEnd = function onTransitionEnd() {
    this.$emit(this.show ? 'on-after-show' : 'on-after-hide');
  };

  _proto.renderSheet = function renderSheet() {
    var _this4 = this;

    var h = this.$createElement;

    if (this.theme === 'android') {
      return h("div", {
        "class": "weui-skin_android"
      }, [h("transition", {
        "attrs": {
          "name": "vux-android-actionsheet"
        },
        "on": {
          "afterEnter": function afterEnter() {
            _this4.$emit('after-show');
          },
          "afterLeave": function afterLeave() {
            _this4.$emit('after-hide');
          }
        }
      }, [h("div", {
        "style": this.showStyle,
        "class": "weui-actionsheet"
      }, [h("div", {
        "class": "weui-actionsheet__menu"
      }, [this.renderButtons()])])])]);
    } else {
      return h("div", {
        "ref": "iOSMenu"
      }, [h("div", {
        "class": "am-action-sheet-content"
      }, [h("div", {
        "class": "am-action-sheet-body"
      }, [h("div", [this.renderTitle(), this.renderButtons()])])])]);
    }
  };

  _proto.render = function render() {
    var h = arguments[0];
    var classes = 'am-action-sheet am-action-sheet-' + this.type; // @ts-ignore

    return h(Popup, {
      "attrs": {
        "value": this.show,
        "wrapClassName": classes
      },
      "on": {
        "cancel": this.cancelClick
      }
    }, [h("div", [this.renderSheet()])]);
  };

  _proto.renderButtons = function renderButtons() {
    var _this5 = this;

    var h = this.$createElement;
    return h("div", {
      "class": this.listClassPrefix,
      "attrs": {
        "role": "group"
      }
    }, [this.menus.map(function (it) {
      return _this5.renderMenu(it);
    }), this.showCancel ? this.renderCancelButton() : null]);
  };

  _proto.renderTitle = function renderTitle() {
    var h = this.$createElement;
    return this.title ? h("div", {
      "class": this.prefixCls + '-message'
    }, [this.title]) : null;
  };

  _proto.renderMenu = function renderMenu(menu) {
    var _classes;

    var h = this.$createElement;
    var MTouchFeedback = TouchFeedback;
    var itemClassPrefix = this.listClassPrefix + '-item';
    var classes = (_classes = {}, _classes[itemClassPrefix] = true, _classes[this.listClassPrefix + '-badge'] = menu.badge, _classes);
    return h(MTouchFeedback, {
      "attrs": {
        "activeClassName": itemClassPrefix + '-active'
      }
    }, [h("div", {
      "class": classes,
      "attrs": {
        "role": "button"
      }
    }, [h("span", {
      "class": itemClassPrefix + '-content'
    }, [menu.label]), this.renderBadge(menu.badge)])]);
  };

  _proto.renderBadge = function renderBadge(badge) {
    var h = this.$createElement;

    if (badge) {
      var supClass = typeof badge === 'boolean' ? 'am-badge-dot' : 'am-badge-text';
      return badge ? h("span", {
        "class": "am-badge am-badge-not-a-wrapper"
      }, [h("sup", {
        "class": supClass
      }, [typeof badge === 'boolean' ? null : badge])]) : null;
    }
  };

  _proto.renderCancelButton = function renderCancelButton() {
    var h = this.$createElement;
    var MTouchFeedback = TouchFeedback;
    var itemClassPrefix = this.listClassPrefix + '-item';
    var classes = itemClassPrefix + (" " + this.prefixCls + "-cancel-button");
    return h(MTouchFeedback, {
      "attrs": {
        "activeClassName": itemClassPrefix + '-active'
      }
    }, [h("div", {
      "class": classes,
      "attrs": {
        "role": "button"
      },
      "on": {
        "click": this.cancelClick
      }
    }, [h("span", {
      "class": itemClassPrefix + '-content'
    }, ["\u53D6\u6D88"]), h("span", {
      "class": this.prefixCls + '-cancel-button-mask'
    })])]);
  };

  _createClass(ActionSheet, [{
    key: "showStyle",
    get: function get() {
      var style = {};

      if (!this.show) {
        style.display = 'none';
      }

      return style;
    }
  }, {
    key: "listClassPrefix",
    get: function get() {
      return this.prefixCls + '-button-list';
    }
  }]);

  return ActionSheet;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "cancelText", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "closeOnClickingMask", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "closeOnClickingMenu", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "menus", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "showCancel", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "theme", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "showChanged", [_dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "showChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype)), _class2)) || _class);
export { ActionSheet as default };