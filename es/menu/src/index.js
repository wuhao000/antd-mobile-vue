import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Button from '../../button';
import Flex from '../../flex';
import List from '../../list';
import { getComponentLocale } from '../../utils/getLocale';
import SubMenu from './sub-menu';
var Menu = (_dec = Component({
  name: 'Menu'
}), _dec2 = Prop({
  type: String,
  default: 'am-menu'
}), _dec3 = Prop({
  type: String,
  default: 'am-sub-menu'
}), _dec4 = Prop({
  type: String,
  default: 'am-radio'
}), _dec5 = Prop({
  type: String,
  default: 'am-multi-select-btns'
}), _dec6 = Prop({
  type: String,
  default: 'am-menu-select-container'
}), _dec7 = Prop({
  default: function _default() {
    return [];
  }
}), _dec8 = Prop({}), _dec9 = Prop({}), _dec10 = Prop({
  default: 2
}), _dec11 = Prop({
  type: Number
}), _dec12 = Prop({
  type: Boolean,
  default: false
}), _dec13 = Watch('value'), _dec14 = Watch('height'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Menu, _Vue);

  function Menu() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "subMenuPrefixCls", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "radioPrefixCls", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "multiSelectMenuBtnsCls", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "MenuSelectContanerPrefixCls", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "data", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "defaultValue", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "level", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "height", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "multiSelect", _descriptor11, _assertThisInitialized(_this)), _this.state = {
      firstLevelSelectValue: _this.getNewFsv(),
      value: _this.value,
      height: _this.height
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = Menu.prototype;

  _proto.valueChanged = function valueChanged(value) {
    this.state.firstLevelSelectValue = this.getNewFsv();
    this.state.value = value;
  };

  _proto.heightChanged = function heightChanged(height) {
    this.state.height = height;
  };

  _proto.mounted = function mounted() {
    if (!('height' in this)) {
      this.height = Math.round(document.documentElement.clientHeight / 2);
    }
  };

  _proto.onMenuOk = function onMenuOk() {
    this.$emit('ok', this.state.value);
  };

  _proto.onMenuCancel = function onMenuCancel() {
    this.$emit('cancel');
  };

  _proto.getNewFsv = function getNewFsv() {
    var value = this.value,
        data = this.data;
    var firstValue = '';

    if (value && value.length) {
      // if has init path, chose init first value
      firstValue = value[0]; // this is a contract
    } else if (data && data.length && !data[0].isLeaf) {
      // chose the first menu item if it's not leaf.
      firstValue = data[0].value;
    }

    return firstValue;
  };

  _proto.onClickFirstLevelItem = function onClickFirstLevelItem(dataItem) {
    this.state.firstLevelSelectValue = dataItem.value;

    if (dataItem.isLeaf) {
      this.$emit('change', [dataItem.value]);
    }
  };

  _proto.getSelectValue = function getSelectValue(dataItem) {
    var level = this.level,
        multiSelect = this.multiSelect;

    if (multiSelect) {
      var _this$state = this.state,
          value = _this$state.value,
          firstLevelSelectValue = _this$state.firstLevelSelectValue;

      if (value && value.length > 0) {
        if (level === 2 && value[0] !== firstLevelSelectValue) {
          /* if level is 2, when first level is reselect, reset submenu array */
          return [firstLevelSelectValue, [dataItem.value]];
        } else {
          /* if level is 1, or first level isn't changed when level is 2, just do add or delete for submenu array  */
          var chosenValues = level === 2 ? value[1] : value; // FIXME: hack type

          var existIndex = chosenValues.indexOf(dataItem.value);

          if (existIndex === -1) {
            chosenValues.push(dataItem.value);
          } else {
            chosenValues.splice(existIndex, 1);
          }

          return value;
        }
      } else {
        /* if value is not exist before, init value */
        return level === 2 ? [firstLevelSelectValue, [dataItem.value]] : [dataItem.value];
      }
    }

    return level === 2 ? [this.state.firstLevelSelectValue, dataItem.value] : [dataItem.value];
  };

  _proto.onClickSubMenuItem = function onClickSubMenuItem(dataItem) {
    var _this2 = this;

    var value = this.getSelectValue(dataItem);
    this.state.value = value;
    setTimeout(function () {
      // if onChange will close the menu, set a little time to show its selection state.
      _this2.$emit('change', value);
    }, 300);
  };

  _proto.render = function render() {
    var _classnames,
        _this3 = this;

    var h = arguments[0];
    var _this$data = this.data,
        data = _this$data === void 0 ? [] : _this$data,
        prefixCls = this.prefixCls,
        level = this.level,
        multiSelect = this.multiSelect,
        multiSelectMenuBtnsCls = this.multiSelectMenuBtnsCls,
        MenuSelectContanerPrefixCls = this.MenuSelectContanerPrefixCls;
    var _this$state2 = this.state,
        firstLevelSelectValue = _this$state2.firstLevelSelectValue,
        value = _this$state2.value,
        height = _this$state2.height;
    var subMenuData = data; // menu only has one level as init

    if (level === 2) {
      var parent = data;

      if (firstLevelSelectValue && firstLevelSelectValue !== '') {
        parent = data.filter(function (dataItem) {
          return dataItem.value === firstLevelSelectValue;
        });
      } // tslint:disable-next-line:prefer-conditional-expression


      if (parent[0] && parent[0].children && parent[0].isLeaf !== true) {
        subMenuData = parent[0].children;
      } else {
        subMenuData = [];
      }
    }

    var subValue = value && value.length > 0 && [].concat(value) || [];

    if (level === 2 && subValue.length > 1) {
      subValue.shift();

      if (multiSelect) {
        /* example: [[1,2,3]] -> [1,2,3] */
        subValue = subValue[0]; // FIXME: hack type
      }
    }

    var parentValue = value && value.length > 1 && level === 2 ? value[0] : null;
    var subSelInitItem = subMenuData.filter(function (dataItem) {
      return subValue.indexOf(dataItem.value) !== -1;
    }).map(function (item) {
      return item.value;
    });
    var showSelect = true;

    if (level === 2 && parentValue !== firstLevelSelectValue) {
      showSelect = false;
    } // tslint:disable-next-line:variable-name


    var _locale = getComponentLocale(this.$props, this, 'Menu', function () {
      return require('./locale/zh_CN');
    });

    var heightStyle = height !== undefined ? {
      height: height + "px"
    } : {};
    return h(Flex, {
      "class": prefixCls,
      "style": _extends({}, heightStyle),
      "attrs": {
        "direction": "column",
        "align": "stretch"
      }
    }, [h(Flex, {
      "attrs": {
        "align": "start"
      },
      "class": classnames((_classnames = {}, _classnames[MenuSelectContanerPrefixCls] = true, _classnames))
    }, [level === 2 && h(Flex.Item, [h(List, {
      "attrs": {
        "role": "tablist"
      }
    }, [data.map(function (dataItem, index) {
      return h(List.Item, {
        "class": dataItem.value === firstLevelSelectValue ? prefixCls + "-selected" : '',
        "on": {
          "click": function click() {
            return _this3.onClickFirstLevelItem(dataItem);
          }
        },
        "key": "listitem-1-" + index,
        "attrs": {
          "role": "tab",
          "aria-selected": dataItem.value === firstLevelSelectValue
        }
      }, [dataItem.label]);
    })])]), h(Flex.Item, {
      "attrs": {
        "role": "tabpanel",
        "aria-hidden": "false"
      },
      "class": MenuSelectContanerPrefixCls + "-submenu"
    }, [h(SubMenu, {
      "attrs": {
        "subMenuPrefixCls": this.subMenuPrefixCls,
        "radioPrefixCls": this.radioPrefixCls,
        "subMenuData": subMenuData,
        "selItem": subSelInitItem,
        "showSelect": showSelect,
        "multiSelect": multiSelect
      },
      "on": {
        "click": this.onClickSubMenuItem
      }
    })])]), multiSelect && h("div", {
      "class": multiSelectMenuBtnsCls
    }, [h(Button, {
      "attrs": {
        "inline": true
      },
      "class": multiSelectMenuBtnsCls + "-btn",
      "on": {
        "click": this.onMenuCancel
      }
    }, [_locale.cancelText]), h(Button, {
      "attrs": {
        "inline": true,
        "type": "primary"
      },
      "class": multiSelectMenuBtnsCls + "-btn",
      "on": {
        "click": this.onMenuOk
      }
    }, [_locale.okText])])]);
  };

  return Menu;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "subMenuPrefixCls", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "radioPrefixCls", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "multiSelectMenuBtnsCls", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "MenuSelectContanerPrefixCls", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "data", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "defaultValue", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "level", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "height", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "multiSelect", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "heightChanged", [_dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "heightChanged"), _class2.prototype)), _class2)) || _class);
export default Menu;