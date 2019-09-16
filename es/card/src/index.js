import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _class3, _temp2;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Body from './body';
import Footer from './footer';
import Header from './header';
var Card = (_dec = Component({
  name: 'Card'
}), _dec2 = Prop({
  default: 'am-card'
}), _dec3 = Prop({
  type: Boolean,
  default: false
}), _dec(_class = (_class2 = (_temp2 = _class3 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Card, _Vue);

  function Card() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "full", _descriptor2, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Card.prototype;

  _proto.render = function render() {
    var _classnames;

    var h = arguments[0];
    var prefixCls = this.prefixCls,
        full = this.full;
    var wrapCls = classnames(prefixCls, (_classnames = {}, _classnames[prefixCls + "-full"] = full, _classnames));
    return h("div", {
      "class": wrapCls
    }, [this.$slots.default]);
  };

  return Card;
}(Vue), _class3.Header = Header, _class3.Body = Body, _class3.Footer = Footer, _temp2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "full", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Card as default };