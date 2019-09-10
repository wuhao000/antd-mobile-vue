import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Button from '../../button';
import Flex from '../../flex';
import { getComponentLocale } from '../../utils/getLocale';
var Pagination = (_dec = Component({
  name: 'Pagination'
}), _dec2 = Prop({
  type: String,
  default: 'am-pagination'
}), _dec3 = Prop({
  default: 'button'
}), _dec4 = Prop({
  type: Boolean,
  default: false
}), _dec5 = Prop({
  type: Number,
  default: 1
}), _dec6 = Prop({
  type: Number,
  default: 0
}), _dec7 = Prop({
  type: String
}), _dec8 = Prop({
  type: String
}), _dec9 = Watch('value'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Pagination, _Vue);

  function Pagination() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "mode", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "simple", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "total", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prevText", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "nextText", _descriptor7, _assertThisInitialized(_this)), _this.state = {
      current: _this.value
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = Pagination.prototype;

  _proto.valueChanged = function valueChanged(value) {
    if (this.state.current !== value) {
      this.state.current = value;
    }
  };

  _proto.onChange = function onChange(p) {
    this.state.current = p;
    this.$emit('input', p);
  };

  _proto.render = function render() {
    var _this2 = this;

    var h = arguments[0];
    var prefixCls = this.prefixCls,
        mode = this.mode,
        total = this.total,
        simple = this.simple;
    var current = this.state.current;
    var locale = getComponentLocale(this.$props, this.$root, 'Pagination', function () {
      return require('./locale/zh_CN');
    });
    var prevText = locale.prevText,
        nextText = locale.nextText;
    var markup = h(Flex, [h(Flex.Item, {
      "class": prefixCls + "-wrap-btn " + prefixCls + "-wrap-btn-prev"
    }, [h(Button, {
      "attrs": {
        "inline": true,
        "disabled": current <= 1
      },
      "on": {
        "click": function click() {
          return _this2.onChange(current - 1);
        }
      }
    }, [this.$slots.prevText || this.$slots['prev-text'] || prevText])]), this.$slots.default ? h(Flex.Item, [this.$slots.default]) : !simple && h(Flex.Item, {
      "class": prefixCls + "-wrap",
      "attrs": {
        "aria-live": "assertive"
      }
    }, [h("span", {
      "class": "active"
    }, [current]), "/", h("span", [total])]), h(Flex.Item, {
      "class": prefixCls + "-wrap-btn " + prefixCls + "-wrap-btn-next"
    }, [h(Button, {
      "attrs": {
        "inline": true,
        "disabled": current >= total
      },
      "on": {
        "click": function click() {
          return _this2.onChange(_this2.state.current + 1);
        }
      }
    }, [this.$slots.nextText || this.$slots['next-text'] || nextText])])]);

    if (mode === 'number') {
      markup = h("div", {
        "class": prefixCls + "-wrap"
      }, [h("span", {
        "class": "active"
      }, [current]), "/", h("span", [total])]);
    } else if (mode === 'pointer') {
      var arr = [];

      for (var i = 0; i < total; i++) {
        var _classnames;

        arr.push(h("div", {
          "key": "dot-" + i,
          "class": classnames(prefixCls + "-wrap-dot", (_classnames = {}, _classnames[prefixCls + "-wrap-dot-active"] = i + 1 === current, _classnames))
        }, [h("span")]));
      }

      markup = h("div", {
        "class": prefixCls + "-wrap"
      }, [arr]);
    }

    var cls = classnames(prefixCls);
    return h("div", {
      "class": cls
    }, [markup]);
  };

  return Pagination;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "mode", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "simple", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "total", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "prevText", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "nextText", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype)), _class2)) || _class);
export { Pagination as default };