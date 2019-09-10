import _createClass from "@babel/runtime/helpers/createClass";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _class4, _class5, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _class6, _temp3;

/* tslint:disable:jsx-no-multiline-js */
import classNames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
import TouchFeedback from '../../vmc-feedback';
export var Brief = (_dec = Component({
  name: 'Brief'
}), _dec2 = Prop(), _dec3 = Prop(), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Brief, _Vue);

  function Brief() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "role", _descriptor2, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Brief.prototype;

  _proto.render = function render() {
    var h = arguments[0];
    return h("div", {
      "class": "am-list-brief"
    }, [this.$slots.default]);
  };

  return Brief;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "role", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
var Item = (_dec4 = Component({
  name: 'ListItem'
}), _dec5 = Prop({
  type: Boolean,
  default: false
}), _dec6 = Prop({
  default: 'am-list'
}), _dec7 = Prop({
  type: String
}), _dec8 = Prop({
  type: String,
  default: 'iOS'
}), _dec9 = Prop({
  type: [String, Object]
}), _dec10 = Prop([String, Object]), _dec11 = Prop({
  type: String,
  default: 'right'
}), _dec12 = Prop({
  type: Object
}), _dec13 = Prop({
  type: Boolean,
  default: false
}), _dec14 = Prop({
  type: Boolean,
  default: false
}), _dec15 = Prop({
  type: String
}), _dec16 = Prop({
  type: Boolean,
  default: false
}), _dec17 = Prop({
  type: String,
  default: 'middle'
}), _dec18 = Prop({
  type: Boolean
}), _dec19 = Prop({
  type: String
}), _dec20 = Prop({
  type: [String, Object],
  default: ''
}), _dec21 = Prop({
  type: String,
  default: 'left'
}), _dec22 = Inject({
  from: 'list',
  default: undefined
}), _dec23 = Prop({
  type: Object,
  default: function _default() {
    return {};
  }
}), _dec24 = Prop({
  type: Object,
  default: function _default() {
    return {};
  }
}), _dec25 = Prop({
  type: Boolean,
  default: true
}), _dec26 = Prop(), _dec27 = Prop({
  type: String,
  default: 'text'
}), _dec4(_class4 = (_class5 = (_temp3 = _class6 =
/*#__PURE__*/
function (_Vue2) {
  _inheritsLoose(Item, _Vue2);

  function Item() {
    var _temp2, _this2;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return (_temp2 = _this2 = _Vue2.call.apply(_Vue2, [this].concat(args)) || this, _initializerDefineProperty(_this2, "text", _descriptor3, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "prefixCls", _descriptor4, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "role", _descriptor5, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "platform", _descriptor6, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "thumb", _descriptor7, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "extra", _descriptor8, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "extraPosition", _descriptor9, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "activeStyle", _descriptor10, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "multipleLine", _descriptor11, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "error", _descriptor12, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "errorMessage", _descriptor13, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "disabled", _descriptor14, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "align", _descriptor15, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "wrap", _descriptor16, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "arrow", _descriptor17, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "title", _descriptor18, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "labelPosition", _descriptor19, _assertThisInitialized(_this2)), _this2.coverRippleStyle = {
      display: 'none'
    }, _this2.rippleClicked = false, _initializerDefineProperty(_this2, "list", _descriptor20, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "contentStyle", _descriptor21, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "extraStyle", _descriptor22, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "touchFeedback", _descriptor23, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "suffix", _descriptor24, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "errorDisplayType", _descriptor25, _assertThisInitialized(_this2)), _this2.showErrorPopover = false, _temp2) || _assertThisInitialized(_this2);
  }

  var _proto2 = Item.prototype;

  _proto2.beforeDestroy = function beforeDestroy() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = null;
    }
  };

  _proto2.onClick = function onClick(ev) {
    var _this3 = this;

    var isAndroid = this.platform === 'android';

    if (isAndroid) {
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = null;
      }

      var _Item = ev.currentTarget;
      var RippleWidth = Math.max(_Item.offsetHeight, _Item.offsetWidth);
      var ClientRect = ev.currentTarget.getBoundingClientRect();
      var pointX = ev.clientX - ClientRect.left - _Item.offsetWidth / 2;
      var pointY = ev.clientY - ClientRect.top - _Item.offsetWidth / 2;
      this.coverRippleStyle = {
        width: RippleWidth + "px",
        height: RippleWidth + "px",
        left: pointX + "px",
        top: pointY + "px"
      };
      this.rippleClicked = true;
      this.debounceTimeout = setTimeout(function () {
        _this3.coverRippleStyle = {
          display: 'none'
        };
        _this3.rippleClicked = false;
      }, 1000);
    }

    this.$emit('click');
  };

  _proto2.render = function render() {
    var _classNames,
        _classNames2,
        _classNames3,
        _classNames4,
        _this4 = this;

    var h = arguments[0];
    var _this$$props = this.$props,
        prefixCls = _this$$props.prefixCls,
        activeStyle = _this$$props.activeStyle,
        align = _this$$props.align,
        wrap = _this$$props.wrap,
        disabled = _this$$props.disabled,
        multipleLine = _this$$props.multipleLine,
        arrow = _this$$props.arrow;
    var coverRippleStyle = this.coverRippleStyle,
        rippleClicked = this.rippleClicked;
    var section = this.$parent['section'];
    var actualError = this.actualError;
    var wrapCls = classNames(prefixCls + "-item", prefixCls + "-item-label-" + this.labelPosition, (_classNames = {}, _classNames[prefixCls + "-item-disabled"] = this.actualDisabled, _classNames[prefixCls + "-item-error"] = actualError, _classNames[prefixCls + "-item-error-text"] = actualError && this.actualErrorDisplayType === 'text', _classNames[prefixCls + "-item-top"] = align === 'top', _classNames[prefixCls + "-item-middle"] = align === 'middle', _classNames[prefixCls + "-item-bottom"] = align === 'bottom', _classNames[prefixCls + "-item-section"] = section, _classNames[prefixCls + "-item-extra-left"] = this.extraPosition === 'left', _classNames[prefixCls + "-item-extra-center"] = this.extraPosition === 'center', _classNames[prefixCls + "-item-extra-right"] = this.extraPosition === 'right', _classNames));
    var rippleCls = classNames(prefixCls + "-ripple", (_classNames2 = {}, _classNames2[prefixCls + "-ripple-animate"] = rippleClicked, _classNames2));
    var lineCls = classNames(prefixCls + "-line", (_classNames3 = {}, _classNames3[prefixCls + "-line-multiple"] = multipleLine, _classNames3[prefixCls + "-line-wrap"] = wrap, _classNames3));
    var arrowCls = classNames(prefixCls + "-arrow", (_classNames4 = {}, _classNames4[prefixCls + "-arrow-horizontal"] = arrow === 'horizontal', _classNames4[prefixCls + "-arrow-vertical"] = arrow === 'down' || arrow === 'up', _classNames4[prefixCls + "-arrow-vertical-up"] = arrow === 'up', _classNames4));
    var content = h("div", {
      "on": {
        "click": this.onClick
      },
      "class": wrapCls
    }, [this.renderThumb(), h("div", {
      "class": lineCls
    }, [this.renderLabel(), this.renderExtra(), arrow && h("div", {
      "class": arrowCls,
      "attrs": {
        "aria-hidden": "true"
      }
    }), this.actualError && this.errorDisplayType !== 'text' ? h("div", {
      "class": prefixCls + "-error-extra",
      "on": {
        "click": function click(e) {
          if (_this4.actualErrorMessage) {
            if (_this4.$toast && _this4.actualErrorDisplayType === 'toast') {
              _this4.$toast.fail(_this4.actualErrorMessage);
            }

            if (_this4.actualErrorDisplayType === 'popover' && !_this4.showErrorPopover) {
              _this4.showErrorPopover = true;
            }
          }

          _this4.$emit('error-click', e);

          _this4.$emit('errorClick', e);
        }
      }
    }, [h("m-popover", {
      "attrs": {
        "mask": false
      },
      "model": {
        value: _this4.showErrorPopover,
        callback: function callback($$v) {
          _this4.showErrorPopover = $$v;
        }
      }
    }, [h("m-popover-item", {
      "slot": "content"
    }, [this.errorMessage])])]) : null, this.$slots.suffix || this.suffix ? h("div", {
      "class": this.prefixCls + '-suffix'
    }, [this.$slots.suffix || this.suffix]) : null]), h("div", {
      "style": coverRippleStyle,
      "class": rippleCls
    })]);
    return (// @ts-ignore
      h(TouchFeedback, {
        "attrs": {
          "disabled": disabled || !this.$listeners.click || !this.touchFeedback || this.list && !this.list.touchFeedback,
          "activeStyle": activeStyle,
          "activeClassName": prefixCls + "-item-active"
        }
      }, [content])
    );
  };

  _proto2.renderExtra = function renderExtra() {
    var _classNames5;

    var h = this.$createElement;
    return this.$slots.extra !== undefined || this.extra ? h("div", {
      "style": this.extraStyle,
      "class": classNames(this.prefixCls + "-extra", (_classNames5 = {}, _classNames5[this.prefixCls + '-extra-text'] = this.text, _classNames5))
    }, [this.$slots.extra || this.extra, this.errorDisplayType === 'text' && this.actualError && this.actualErrorMessage ? h("div", [this.actualErrorMessage]) : null]) : null;
  };

  _proto2.renderThumb = function renderThumb() {
    var h = this.$createElement;
    var thumb = this.thumb,
        prefixCls = this.prefixCls;

    if (this.$slots.thumb) {
      return h("div", {
        "class": prefixCls + "-thumb"
      }, [this.$slots.thumb]);
    } else if (thumb) {
      return h("div", {
        "class": prefixCls + "-thumb"
      }, [typeof thumb === 'string' ? h("img", {
        "attrs": {
          "src": thumb
        }
      }) : thumb]);
    } else {
      return null;
    }
  };

  _proto2.renderLabel = function renderLabel() {
    var h = this.$createElement;

    if (this.$slots.default !== undefined) {
      return h("div", {
        "class": this.prefixCls + "-content",
        "style": this.contentStyle
      }, [this.$slots.default]);
    } else if (this.title) {
      return h("div", {
        "class": this.prefixCls + "-content",
        "style": this.contentStyle
      }, [this.title]);
    } else {
      return null;
    }
  };

  _createClass(Item, [{
    key: "actualError",
    get: function get() {
      return this.error || this.$parent['error'];
    }
  }, {
    key: "actualErrorMessage",
    get: function get() {
      return this.errorMessage || this.$parent['errorMessage'];
    }
  }, {
    key: "actualDisabled",
    get: function get() {
      return this.disabled;
    }
  }, {
    key: "actualErrorDisplayType",
    get: function get() {
      return this.errorDisplayType && this.$parent['errorDisplayType'];
    }
  }]);

  return Item;
}(Vue), _class6.Brief = Brief, _temp3), (_descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "text", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "prefixCls", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "role", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "platform", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "thumb", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "extra", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class5.prototype, "extraPosition", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class5.prototype, "activeStyle", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class5.prototype, "multipleLine", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class5.prototype, "error", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class5.prototype, "errorMessage", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class5.prototype, "disabled", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class5.prototype, "align", [_dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class5.prototype, "wrap", [_dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class5.prototype, "arrow", [_dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class5.prototype, "title", [_dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class5.prototype, "labelPosition", [_dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class5.prototype, "list", [_dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor21 = _applyDecoratedDescriptor(_class5.prototype, "contentStyle", [_dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor22 = _applyDecoratedDescriptor(_class5.prototype, "extraStyle", [_dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor23 = _applyDecoratedDescriptor(_class5.prototype, "touchFeedback", [_dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor24 = _applyDecoratedDescriptor(_class5.prototype, "suffix", [_dec26], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor25 = _applyDecoratedDescriptor(_class5.prototype, "errorDisplayType", [_dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class5)) || _class4);
export default Item;