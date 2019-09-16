'use strict';

import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _dec13, _class4, _dec14, _class5, _dec15, _class6;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
export var IDecoratorProps = (_dec = Component({
  name: 'DefaultDecorator'
}), _dec2 = Prop({
  type: Number
}), _dec3 = Prop({
  type: Number
}), _dec4 = Prop({
  type: [Number, String]
}), _dec5 = Prop({
  type: [Number, String]
}), _dec6 = Prop({
  type: Number
}), _dec7 = Prop({
  type: Number
}), _dec8 = Prop({
  type: Number
}), _dec9 = Prop({
  type: Boolean
}), _dec10 = Prop(), _dec11 = Prop(), _dec12 = Prop(), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(IDecoratorProps, _Vue);

  function IDecoratorProps() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "currentSlide", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "slideCount", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "frameWidth", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "slideWidth", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "slidesToScroll", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "cellSpacing", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "slidesToShow", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "wrapAround", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "nextSlide", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "previousSlide", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "goToSlide", _descriptor11, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  return IDecoratorProps;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "currentSlide", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "slideCount", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "frameWidth", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "slideWidth", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "slidesToScroll", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "cellSpacing", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "slidesToShow", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "wrapAround", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "nextSlide", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "previousSlide", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "goToSlide", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
var Decorator1 = (_dec13 = Component({
  name: 'Decorator1'
}), _dec13(_class4 =
/*#__PURE__*/
function (_IDecoratorProps) {
  _inheritsLoose(Decorator1, _IDecoratorProps);

  function Decorator1() {
    return _IDecoratorProps.apply(this, arguments) || this;
  }

  var _proto = Decorator1.prototype;

  _proto.render = function render() {
    var h = arguments[0];
    return h("button", {
      "style": this.getButtonStyles(this.currentSlide === 0 && !this.wrapAround),
      "on": {
        "click": this.handleClick.bind(this)
      }
    }, ["PREV"]);
  };

  _proto.handleClick = function handleClick(e) {
    e.preventDefault();
    this.previousSlide();
  };

  _proto.getButtonStyles = function getButtonStyles(disabled) {
    return {
      border: 0,
      background: 'rgba(0,0,0,0.4)',
      color: 'white',
      padding: 10,
      outline: 0,
      opacity: disabled ? 0.3 : 1,
      cursor: 'pointer'
    };
  };

  return Decorator1;
}(IDecoratorProps)) || _class4);
var Decorator2 = (_dec14 = Component({
  name: 'DefaultDecorator'
}), _dec14(_class5 =
/*#__PURE__*/
function (_IDecoratorProps2) {
  _inheritsLoose(Decorator2, _IDecoratorProps2);

  function Decorator2() {
    return _IDecoratorProps2.apply(this, arguments) || this;
  }

  var _proto2 = Decorator2.prototype;

  _proto2.render = function render() {
    var h = arguments[0];
    return h("button", {
      "style": this.getButtonStyles(this.currentSlide + this.slidesToScroll >= this.slideCount && !this.wrapAround),
      "on": {
        "click": this.handleClick.bind(this)
      }
    }, ["NEXT"]);
  };

  _proto2.handleClick = function handleClick(e) {
    e.preventDefault();

    if (this.nextSlide) {
      this.nextSlide();
    }
  };

  _proto2.getButtonStyles = function getButtonStyles(disabled) {
    return {
      border: 0,
      background: 'rgba(0,0,0,0.4)',
      color: 'white',
      padding: 10,
      outline: 0,
      opacity: disabled ? 0.3 : 1,
      cursor: 'pointer'
    };
  };

  return Decorator2;
}(IDecoratorProps)) || _class5);
var Decorator3 = (_dec15 = Component({
  name: 'DefaultDecorator'
}), _dec15(_class6 =
/*#__PURE__*/
function (_IDecoratorProps3) {
  _inheritsLoose(Decorator3, _IDecoratorProps3);

  function Decorator3() {
    return _IDecoratorProps3.apply(this, arguments) || this;
  }

  var _proto3 = Decorator3.prototype;

  _proto3.render = function render() {
    var _this2 = this;

    var h = arguments[0];
    var indexes = this.getIndexes(this.slideCount, this.slidesToScroll);
    return h("ul", {
      "style": this.getListStyles()
    }, [indexes.map(function (index) {
      return h("li", {
        "style": _this2.getListItemStyles(),
        "key": index
      }, [h("button", {
        "style": _this2.getButtonStyles(_this2.currentSlide === index),
        "on": {
          "click": _this2.goToSlide && _this2.goToSlide.bind(null, index)
        }
      }, ["\u2022"])]);
    })]);
  };

  _proto3.getIndexes = function getIndexes(count, inc) {
    var arr = [];

    for (var i = 0; i < count; i += inc) {
      arr.push(i);
    }

    return arr;
  };

  _proto3.getListStyles = function getListStyles() {
    return {
      position: 'relative',
      margin: 0,
      top: -10,
      padding: 0
    };
  };

  _proto3.getListItemStyles = function getListItemStyles() {
    return {
      listStyleType: 'none',
      display: 'inline-block'
    };
  };

  _proto3.getButtonStyles = function getButtonStyles(active) {
    return {
      border: 0,
      background: 'transparent',
      color: 'black',
      cursor: 'pointer',
      padding: 10,
      outline: 0,
      fontSize: 24,
      opacity: active ? 1 : 0.5
    };
  };

  return Decorator3;
}(IDecoratorProps)) || _class6);
var DefaultDecorators = [{
  component: Decorator1,
  position: 'CenterLeft'
}, {
  component: Decorator2,
  position: 'CenterRight'
}, {
  component: Decorator3,
  position: 'BottomCenter'
}];
export default DefaultDecorators;