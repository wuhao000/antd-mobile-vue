import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import TouchFeedback from '../../vmc-feedback';

function onNextFrame(cb) {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(cb);
  }

  return window.setTimeout(cb, 1);
}

function clearNextFrameAction(nextFrameId) {
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(nextFrameId);
  } else {
    window.clearTimeout(nextFrameId);
  }
}

var SearchBar = (_dec = Component({
  name: 'SearchBar'
}), _dec2 = Prop({
  type: String,
  default: 'am-search'
}), _dec3 = Prop({
  type: String
}), _dec4 = Prop({
  type: String
}), _dec5 = Prop({
  type: String
}), _dec6 = Prop({
  type: Boolean
}), _dec7 = Prop({
  type: String
}), _dec8 = Prop({
  type: Boolean
}), _dec9 = Prop({
  type: Boolean
}), _dec10 = Prop({
  type: Boolean
}), _dec11 = Prop({
  type: Number
}), _dec12 = Watch('value'), _dec13 = Watch('state.value'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(SearchBar, _Vue);

  function SearchBar() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "defaultValue", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "placeholder", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "showCancelButton", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "cancelText", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "autoFocus", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "focused", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "maxLength", _descriptor10, _assertThisInitialized(_this)), _this.state = {
      value: _this.value || '',
      focus: false
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = SearchBar.prototype;

  _proto.mounted = function mounted() {
    if (this.rightBtnRef) {
      var initBtn = window.getComputedStyle(this.rightBtnRef);
      this.rightBtnInitMarginleft = initBtn.marginLeft;
    }

    this.update();
  };

  _proto.updated = function updated() {
    this.update();
  };

  _proto.update = function update() {
    if (this.syntheticPhRef) {
      if (this.inputContainerRef && this.inputContainerRef.className.indexOf(this.prefixCls + "-start") > -1) {
        // 检测是否包含名为 ${this.props.prefixCls}-start 样式，生成动画
        // offsetWidth 某些时候是向上取整，某些时候是向下取整，不能用
        if (this.syntheticPhContainerRef) {
          var realWidth = this.syntheticPhContainerRef.getBoundingClientRect().width; // 包含小数

          this.syntheticPhRef.style.width = Math.ceil(realWidth) + "px";
        }

        if (!this.showCancelButton && this.rightBtnRef) {
          this.rightBtnRef.style.marginRight = '0';
        }
      } else {
        this.syntheticPhRef.style.width = '100%';

        if (!this.showCancelButton && this.rightBtnRef) {
          this.rightBtnRef.style.marginRight = "-" + (this.rightBtnRef.offsetWidth + (this.rightBtnInitMarginleft != null ? parseInt(this.rightBtnInitMarginleft, 10) : 0)) + "px";
        }
      }
    }
  };

  _proto.valueChanged = function valueChanged(value) {
    this.state.value = value;
  };

  _proto.beforeDestroy = function beforeDestroy() {
    if (this.onBlurTimeout) {
      clearNextFrameAction(this.onBlurTimeout);
      this.onBlurTimeout = null;
    }
  };

  _proto.onSubmit = function onSubmit(e) {
    e.preventDefault();
    this.$emit('submit', this.state.value || '');

    if (this.inputRef) {
      this.inputRef.blur();
    }
  };

  _proto.stateValueChanged = function stateValueChanged(value) {
    this.$emit('input', value);
  };

  _proto.onChange = function onChange(e) {
    if (!this.state.focus) {
      this.state.focus = true;
    }

    var value = e.target.value;
    this.state.value = value;
    this.$emit('change', value);
  };

  _proto.onFocus = function onFocus() {
    this.state.focus = true;
    this.firstFocus = true;
    this.$emit('focus');
  };

  _proto.onBlur = function onBlur() {
    var _this2 = this;

    this.onBlurTimeout = onNextFrame(function () {
      if (!_this2.blurFromOnClear) {
        if (document.activeElement !== _this2.inputRef) {
          _this2.state.focus = false;
        }
      }

      _this2.blurFromOnClear = false;
    }); // fix autoFocus item blur with flash

    if (this.$listeners && this.$listeners.blur) {
      setTimeout(function () {
        // fix ios12 wechat browser click failure after input
        if (document.body) {
          document.body.scrollTop = document.body.scrollTop;
        }
      }, 100);
      this.$emit('blur');
    }
  };

  _proto.onClear = function onClear() {
    this.doClear();
  };

  _proto.doClear = function doClear(blurFromOnClear) {
    if (blurFromOnClear === void 0) {
      blurFromOnClear = true;
    }

    this.blurFromOnClear = blurFromOnClear;
    this.state.value = '';
    this.$emit('clear');
    this.$emit('change');

    if (blurFromOnClear) {
      this.focus();
    }
  };

  _proto.onCancel = function onCancel() {
    this.$emit('cancel');
    this.doClear(false);
  };

  _proto.focus = function focus() {
    if (this.inputRef) {
      this.inputRef.focus();
    }
  };

  _proto.render = function render() {
    var _classnames, _classnames2, _classnames3;

    var h = arguments[0];
    var prefixCls = this.prefixCls,
        showCancelButton = this.showCancelButton,
        disabled = this.disabled,
        placeholder = this.placeholder,
        maxLength = this.maxLength; // tslint:disable-next-line:variable-name

    var cancelText = '取消';
    var _this$state = this.state,
        value = _this$state.value,
        focus = _this$state.focus;
    var wrapCls = classnames(prefixCls, (_classnames = {}, _classnames[prefixCls + "-start"] = focus || value && value.length > 0, _classnames));
    var clearCls = classnames(prefixCls + "-clear", (_classnames2 = {}, _classnames2[prefixCls + "-clear-show"] = focus && value && value.length > 0, _classnames2));
    var cancelCls = classnames(prefixCls + "-cancel", (_classnames3 = {}, _classnames3[prefixCls + "-cancel-show"] = showCancelButton || focus || value && value.length > 0, _classnames3[prefixCls + "-cancel-anim"] = this.firstFocus, _classnames3));
    var TouchFeedback2 = TouchFeedback;
    return h("form", {
      "on": {
        "submit": this.onSubmit
      },
      "class": wrapCls,
      "ref": "inputContainer",
      "attrs": {
        "action": "#"
      }
    }, [h("div", {
      "class": prefixCls + "-input"
    }, [h("div", {
      "class": prefixCls + "-synthetic-ph",
      "ref": "syntheticPh"
    }, [h("span", {
      "class": prefixCls + "-synthetic-ph-container",
      "ref": "syntheticPhContainer"
    }, [h("i", {
      "class": prefixCls + "-synthetic-ph-icon"
    }), h("span", {
      "class": prefixCls + "-synthetic-ph-placeholder",
      "style": {
        visibility: placeholder && !value ? 'visible' : 'hidden'
      }
    }, [placeholder])])]), h("input", {
      "attrs": {
        "type": "search",
        "disabled": disabled,
        "placeholder": placeholder,
        "maxLength": maxLength
      },
      "class": prefixCls + "-value",
      "domProps": {
        "value": value
      },
      "on": {
        "input": this.onChange,
        "change": this.onChange,
        "focus": this.onFocus,
        "blur": this.onBlur
      },
      "ref": "input"
    }), h(TouchFeedback2, {
      "attrs": {
        "activeclass": prefixCls + "-clear-active"
      }
    }, [h("a", {
      "on": {
        "click": this.onClear
      },
      "class": clearCls
    })])]), h("div", {
      "class": cancelCls,
      "on": {
        "click": this.onCancel
      },
      "ref": "rightBtn"
    }, [this.cancelText || cancelText])]);
  };

  _createClass(SearchBar, [{
    key: "inputRef",
    get: function get() {
      return this.$refs['input'];
    }
  }, {
    key: "rightBtnRef",
    get: function get() {
      return this.$refs['rightBtn'];
    }
  }, {
    key: "syntheticPhContainerRef",
    get: function get() {
      return this.$refs['syntheticPhContainer'];
    }
  }, {
    key: "syntheticPhRef",
    get: function get() {
      return this.$refs['syntheticPh'];
    }
  }, {
    key: "inputContainerRef",
    get: function get() {
      return this.$refs['inputContainer'];
    }
  }]);

  return SearchBar;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "defaultValue", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "placeholder", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "showCancelButton", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "cancelText", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "autoFocus", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "focused", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "maxLength", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stateValueChanged", [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "stateValueChanged"), _class2.prototype)), _class2)) || _class);
export { SearchBar as default };