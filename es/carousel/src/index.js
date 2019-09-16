import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _class4, _class5, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import CarouselBase from './base';
var DotDecorator = (_dec = Component({
  name: 'DotDecorator'
}), _dec2 = Prop(Number), _dec3 = Prop(Number), _dec4 = Prop(Number), _dec5 = Prop({
  type: String,
  default: 'am-carousel'
}), _dec6 = Prop({
  type: Object
}), _dec7 = Prop({
  type: Object
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(DotDecorator, _Vue);

  function DotDecorator() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "slideCount", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "slidesToScroll", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "currentSlide", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "dotActiveStyle", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "dotStyle", _descriptor6, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = DotDecorator.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var h = arguments[0];
    var arr = [];

    for (var i = 0; i < this.slideCount; i += this.slidesToScroll) {
      arr.push(i);
    }

    var dotDom = arr.map(function (index) {
      var _classnames;

      var dotCls = classnames(_this2.prefixCls + "-wrap-dot", (_classnames = {}, _classnames[_this2.prefixCls + "-wrap-dot-active"] = index === _this2.currentSlide, _classnames));
      var currentDotStyle = index === _this2.currentSlide ? _this2.dotActiveStyle : _this2.dotStyle;
      return h("div", {
        "class": dotCls,
        "key": index
      }, [h("span", {
        "style": currentDotStyle
      })]);
    });
    return h("div", {
      "class": this.prefixCls + "-wrap"
    }, [dotDom]);
  };

  return DotDecorator;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "slideCount", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "slidesToScroll", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "currentSlide", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "dotActiveStyle", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "dotStyle", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
var Carousel = (_dec8 = Component({
  name: 'Carousel'
}), _dec9 = Prop({
  type: String,
  default: 'am-carousel'
}), _dec10 = Prop(), _dec11 = Prop(), _dec12 = Prop(), _dec13 = Prop(), _dec14 = Prop({
  default: function _default() {
    return {};
  }
}), _dec15 = Prop({
  default: function _default() {
    return {};
  }
}), _dec16 = Prop({
  type: String
}), _dec17 = Prop({
  type: String,
  default: 'center'
}), _dec18 = Prop(Number), _dec19 = Prop([String, Number]), _dec20 = Prop({
  type: Boolean,
  default: true
}), _dec21 = Prop({
  type: Boolean
}), _dec22 = Prop({
  type: Boolean,
  default: false
}), _dec23 = Prop(Number), _dec24 = Prop({
  type: Boolean,
  default: false
}), _dec25 = Prop(Number), _dec8(_class4 = (_class5 =
/*#__PURE__*/
function (_Vue2) {
  _inheritsLoose(Carousel, _Vue2);

  function Carousel() {
    var _temp2, _this3;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return (_temp2 = _this3 = _Vue2.call.apply(_Vue2, [this].concat(args)) || this, _this3.selectedIndex = 0, _initializerDefineProperty(_this3, "prefixCls", _descriptor7, _assertThisInitialized(_this3)), _initializerDefineProperty(_this3, "beforeChange", _descriptor8, _assertThisInitialized(_this3)), _initializerDefineProperty(_this3, "afterChange", _descriptor9, _assertThisInitialized(_this3)), _initializerDefineProperty(_this3, "swipeSpeed", _descriptor10, _assertThisInitialized(_this3)), _initializerDefineProperty(_this3, "easing", _descriptor11, _assertThisInitialized(_this3)), _initializerDefineProperty(_this3, "dotStyle", _descriptor12, _assertThisInitialized(_this3)), _initializerDefineProperty(_this3, "dotActiveStyle", _descriptor13, _assertThisInitialized(_this3)), _initializerDefineProperty(_this3, "frameOverflow", _descriptor14, _assertThisInitialized(_this3)), _initializerDefineProperty(_this3, "cellAlign", _descriptor15, _assertThisInitialized(_this3)), _initializerDefineProperty(_this3, "cellSpacing", _descriptor16, _assertThisInitialized(_this3)), _initializerDefineProperty(_this3, "slideWidth", _descriptor17, _assertThisInitialized(_this3)), _initializerDefineProperty(_this3, "dots", _descriptor18, _assertThisInitialized(_this3)), _initializerDefineProperty(_this3, "vertical", _descriptor19, _assertThisInitialized(_this3)), _initializerDefineProperty(_this3, "autoplay", _descriptor20, _assertThisInitialized(_this3)), _initializerDefineProperty(_this3, "autoplayInterval", _descriptor21, _assertThisInitialized(_this3)), _initializerDefineProperty(_this3, "infinite", _descriptor22, _assertThisInitialized(_this3)), _initializerDefineProperty(_this3, "initialSlideWidth", _descriptor23, _assertThisInitialized(_this3)), _temp2) || _assertThisInitialized(_this3);
  }

  var _proto2 = Carousel.prototype;

  _proto2.onChange = function onChange(index) {
    this.selectedIndex = index;

    if (this.afterChange) {
      this.afterChange(index);
    }
  };

  _proto2.render = function render() {
    var _classnames2;

    var h = arguments[0];
    var infinite = this.infinite,
        selectedIndex = this.selectedIndex,
        beforeChange = this.beforeChange,
        afterChange = this.afterChange,
        dots = this.dots,
        prefixCls = this.prefixCls,
        dotActiveStyle = this.dotActiveStyle,
        dotStyle = this.dotStyle,
        vertical = this.vertical;

    var newProps = _extends({}, this.$props, {
      wrapAround: infinite,
      slideIndex: selectedIndex,
      beforeSlide: beforeChange
    });

    var Decorators = [];

    if (dots) {
      Decorators = [{
        component: DotDecorator,
        position: 'BottomCenter'
      }];
    }

    var wrapCls = classnames(prefixCls, (_classnames2 = {}, _classnames2[prefixCls + "-vertical"] = vertical, _classnames2));
    return h(CarouselBase, _mergeJSXProps([{}, {
      "props": _extends({}, newProps, {
        decorators: Decorators,
        afterSlide: this.onChange
      })
    }, {
      "class": wrapCls
    }]), [this.$slots.default]);
  };

  return Carousel;
}(Vue), (_descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "prefixCls", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "beforeChange", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class5.prototype, "afterChange", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class5.prototype, "swipeSpeed", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class5.prototype, "easing", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class5.prototype, "dotStyle", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class5.prototype, "dotActiveStyle", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class5.prototype, "frameOverflow", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class5.prototype, "cellAlign", [_dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class5.prototype, "cellSpacing", [_dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class5.prototype, "slideWidth", [_dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class5.prototype, "dots", [_dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class5.prototype, "vertical", [_dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class5.prototype, "autoplay", [_dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor21 = _applyDecoratedDescriptor(_class5.prototype, "autoplayInterval", [_dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor22 = _applyDecoratedDescriptor(_class5.prototype, "infinite", [_dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor23 = _applyDecoratedDescriptor(_class5.prototype, "initialSlideWidth", [_dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class5)) || _class4);
export { Carousel as default };