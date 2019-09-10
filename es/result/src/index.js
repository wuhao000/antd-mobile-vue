import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

/* tslint:disable:jsx-no-multiline-js */
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Button from '../../button';
var Result = (_dec = Component({
  name: 'MResult'
}), _dec2 = Prop({
  type: String,
  default: 'am-result'
}), _dec3 = Prop({
  type: String
}), _dec4 = Prop({
  type: [String, Object]
}), _dec5 = Prop({
  type: [String, Object]
}), _dec6 = Prop({
  type: [String, Object]
}), _dec7 = Prop({
  type: String
}), _dec8 = Prop({
  default: ''
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Result, _Vue);

  function Result() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "imgUrl", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "img", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "title", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "message", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "buttonText", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "buttonType", _descriptor7, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Result.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var h = arguments[0];
    var prefixCls = this.prefixCls,
        imgUrl = this.imgUrl,
        buttonText = this.buttonText,
        buttonType = this.buttonType;
    var imgContent = null;
    var img = this.$slots.img || this.img;
    var title = this.$slots.title || this.title;
    var message = this.$slots.message || this.message;

    if (img) {
      imgContent = h("div", {
        "class": prefixCls + "-pic"
      }, [img]);
    } else if (imgUrl) {
      imgContent = h("div", {
        "class": prefixCls + "-pic",
        "style": {
          backgroundImage: "url(" + imgUrl + ")"
        }
      });
    }

    return h("div", {
      "class": classnames(prefixCls),
      "attrs": {
        "role": "alert"
      }
    }, [imgContent, title ? h("div", {
      "class": prefixCls + "-title"
    }, [title]) : null, message ? h("div", {
      "class": prefixCls + "-message"
    }, [message]) : null, buttonText ? h("div", {
      "class": prefixCls + "-button"
    }, [// @ts-ignore
    h(Button, {
      "attrs": {
        "type": buttonType
      },
      "on": {
        "click": function click() {
          _this2.$emit('click');
        }
      }
    }, [buttonText])]) : null]);
  };

  return Result;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "imgUrl", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "img", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "message", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "buttonText", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "buttonType", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Result as default };