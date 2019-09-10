import _extends from "@babel/runtime/helpers/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _class, _class2, _descriptor;

import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FormComponent } from '../../mixins/form-component';
import List from '../../list';
import Range from './index';
var RangeItem = (_dec = Component({
  name: 'RangeItem'
}), _dec2 = Prop({
  type: [String, Object]
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_FormComponent) {
  _inheritsLoose(RangeItem, _FormComponent);

  function RangeItem() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _FormComponent.call.apply(_FormComponent, [this].concat(args)) || this, _initializerDefineProperty(_this, "title", _descriptor, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = RangeItem.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var h = arguments[0];
    return h(List.Item, {
      "attrs": {
        "multipleLine": true,
        "disabled": this.isDisabled
      }
    }, [this.title, h(List.Item.Brief, {
      "style": {
        padding: '15px',
        flex: 1
      }
    }, [h(Range, _mergeJSXProps([{}, {
      "attrs": _extends({}, this.$attrs, this.$props)
    }, {
      "attrs": {
        "disabled": this.isDisabled,
        "value": this.currentValue
      }
    }, {
      "on": {
        change: function change(v) {
          _this2.currentValue = v;
        }
      }
    }]))])]);
  };

  return RangeItem;
}(FormComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { RangeItem as default };