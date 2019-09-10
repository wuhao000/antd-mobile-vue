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
import Checkbox from '../../checkbox';
import List from '../../list';
import Radio from '../../radio';
var SubMenu = (_dec = Component({
  name: 'SubMenu'
}), _dec2 = Prop({
  type: String
}), _dec3 = Prop({
  type: String
}), _dec4 = Prop({}), _dec5 = Prop({
  type: Boolean
}), _dec6 = Prop({}), _dec7 = Prop({}), _dec8 = Prop({
  type: Boolean
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(SubMenu, _Vue);

  function SubMenu() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "subMenuPrefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "radioPrefixCls", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "subMenuData", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "showSelect", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onSel", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "selItem", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "multiSelect", _descriptor7, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = SubMenu.prototype;

  _proto.onClick = function onClick(dataItem) {
    this.$emit('click', dataItem);
  };

  _proto.render = function render() {
    var _this2 = this;

    var h = arguments[0];
    var subMenuPrefixCls = this.subMenuPrefixCls,
        radioPrefixCls = this.radioPrefixCls,
        subMenuData = this.subMenuData,
        showSelect = this.showSelect,
        selItem = this.selItem,
        multiSelect = this.multiSelect;

    var selected = function selected(dataItem) {
      return showSelect && selItem.length > 0 && selItem.indexOf(dataItem.value) !== -1;
    };

    var ItemComponent = !multiSelect ? Radio : Checkbox;
    return h(List, {
      "style": {
        paddingTop: 0
      },
      "class": subMenuPrefixCls
    }, [subMenuData.map(function (dataItem, idx) {
      var _classnames;

      return h(List.Item, {
        "class": classnames(radioPrefixCls + "-item", (_classnames = {}, _classnames[subMenuPrefixCls + "-item-selected"] = selected(dataItem), _classnames[subMenuPrefixCls + "-item-disabled"] = dataItem.disabled, _classnames)),
        "key": idx,
        "attrs": {
          "extra": h(ItemComponent, {
            "attrs": {
              "value": selected(dataItem),
              "disabled": dataItem.disabled
            },
            "on": {
              "change": function change() {
                return _this2.onClick(dataItem);
              }
            }
          })
        }
      }, [dataItem.label]);
    })]);
  };

  return SubMenu;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "subMenuPrefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "radioPrefixCls", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "subMenuData", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "showSelect", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "onSel", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "selItem", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "multiSelect", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default SubMenu;