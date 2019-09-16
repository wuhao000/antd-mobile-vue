import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Icon from '../../icon';
import getDataAttr from '../../utils/get-data-attr';
import TouchFeedback from '../../vmc-feedback';
var Tag = (_dec = Component({
  name: 'Tag'
}), _dec2 = Prop({
  type: String,
  default: 'am-tag'
}), _dec3 = Prop({
  type: Boolean,
  default: false
}), _dec4 = Prop({
  type: Boolean,
  default: false
}), _dec5 = Prop({
  type: Boolean,
  default: false
}), _dec6 = Prop({
  type: Boolean,
  default: false
}), _dec7 = Watch('selected'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Tag, _Vue);

  function Tag() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "selected", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "closable", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "small", _descriptor5, _assertThisInitialized(_this)), _this.state = {
      selected: _this.selected,
      closed: false
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = Tag.prototype;

  _proto.selectedChanged = function selectedChanged(selected) {
    this.state.selected = selected;
  };

  _proto.onClick = function onClick() {
    var disabled = this.disabled;

    if (disabled) {
      return;
    }

    var isSelect = this.state.selected;
    this.state.selected = !isSelect;
    this.$emit('change', !isSelect);
  };

  _proto.onTagClose = function onTagClose() {
    this.state.closed = true;
    this.$emit('close');
  };

  _proto.render = function render() {
    var _classnames;

    var h = arguments[0];
    var prefixCls = this.prefixCls,
        disabled = this.disabled,
        closable = this.closable,
        small = this.small;
    var wrapCls = classnames(prefixCls, (_classnames = {}, _classnames[prefixCls + "-normal"] = !disabled && (!this.state.selected || small || closable), _classnames[prefixCls + "-small"] = small, _classnames[prefixCls + "-active"] = this.state.selected && !disabled && !small && !closable, _classnames[prefixCls + "-disabled"] = disabled, _classnames[prefixCls + "-closable"] = closable, _classnames));
    var closableDom = closable && !disabled && !small ? h(TouchFeedback, {
      "attrs": {
        "activeClassName": prefixCls + "-close-active"
      }
    }, [h("div", {
      "class": prefixCls + "-close",
      "attrs": {
        "role": "button",
        "aria-label": "remove tag"
      },
      "on": {
        "click": this.onTagClose.bind(this)
      }
    }, [h(Icon, {
      "attrs": {
        "type": "cross-circle",
        "size": "xs",
        "aria-hidden": "true"
      }
    })])]) : null;
    return !this.state.closed ? h("div", _mergeJSXProps([{}, getDataAttr(this.$props), {
      "class": wrapCls,
      "on": {
        "click": this.onClick.bind(this)
      }
    }]), [h("div", {
      "class": prefixCls + "-text"
    }, [this.$slots.default]), closableDom]) : null;
  };

  return Tag;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "selected", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "closable", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "small", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "selectedChanged", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "selectedChanged"), _class2.prototype)), _class2)) || _class);
export default Tag;