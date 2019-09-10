import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Carousel from '../../carousel';
import Flex from '../../flex';
import Icon from '../../icon';
import { isVNode } from '../../utils/vnode';
import TouchFeedback from '../../vmc-feedback';
var Grid = (_dec = Component({
  name: 'Grid'
}), _dec2 = Prop({
  type: Array,
  default: function _default() {
    return [];
  }
}), _dec3 = Prop({
  type: Boolean,
  default: true
}), _dec4 = Prop({
  type: Number,
  default: 4
}), _dec5 = Prop({
  type: Boolean,
  default: false
}), _dec6 = Prop({
  type: Number,
  default: 2
}), _dec7 = Prop({
  type: String,
  default: 'am-grid'
}), _dec8 = Prop({
  type: Boolean,
  default: true
}), _dec9 = Prop({
  type: String
}), _dec10 = Prop(), _dec11 = Prop({
  type: Object,
  default: function _default() {
    return {};
  }
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Grid, _Vue);

  function Grid() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "data", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "bordered", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "cols", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "carousel", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "carouselMaxRow", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "square", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "activeClassName", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "activeStyle", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "itemStyle", _descriptor10, _assertThisInitialized(_this)), _this.initialSlideWidth = 0, _temp) || _assertThisInitialized(_this);
  }

  var _proto = Grid.prototype;

  // only used in carousel model
  _proto.mounted = function mounted() {
    this.initialSlideWidth = document.documentElement.clientWidth;
  };

  _proto.renderCarousel = function renderCarousel(rowsArr, pageCount, rowCount) {
    var h = this.$createElement;
    var prefixCls = this.prefixCls;
    var carouselMaxRow = this.carouselMaxRow;
    var pagesArr = [];

    for (var pageIndex = 0; pageIndex < pageCount; pageIndex++) {
      var pageRows = [];

      for (var ii = 0; ii < carouselMaxRow; ii++) {
        var rowIndex = pageIndex * carouselMaxRow + ii;

        if (rowIndex < rowCount) {
          pageRows.push(rowsArr[rowIndex]);
        } else {
          // 空节点为了确保末尾页的最后未到底的行有底线(样式中last-child会没线)
          pageRows.push(h("div", {
            "key": "gridline-" + rowIndex
          }));
        }
      }

      pagesArr.push(h("div", {
        "key": "pageitem-" + pageIndex,
        "attrs": {
          "clas": prefixCls + "-carousel-page"
        }
      }, [pageRows]));
    }

    return pagesArr;
  };

  _proto.renderItem = function renderItem(dataItem, index, columnNum) {
    var h = this.$createElement;
    var prefixCls = this.prefixCls;
    var itemEl = null;

    if (dataItem) {
      var icon = dataItem.icon,
          text = dataItem.text;
      itemEl = h("div", {
        "class": prefixCls + "-item-inner-content column-num-" + columnNum
      }, [this.renderIcon(icon, prefixCls), h("div", {
        "class": prefixCls + "-text"
      }, [text])]);
    }

    return h("div", {
      "class": prefixCls + "-item-content"
    }, [itemEl]);
  };

  _proto.getRows = function getRows(rowCount, dataLength) {
    var _this2 = this;

    var h = this.$createElement;
    var cols = this.cols,
        prefixCls = this.prefixCls,
        activeStyle = this.activeStyle,
        activeClassName = this.activeClassName,
        itemStyle = this.itemStyle;
    var rowsArr = [];
    var rowWidth = 100 / cols + "%";

    var colStyle = _extends({
      width: rowWidth
    }, itemStyle);

    for (var i = 0; i < rowCount; i++) {
      var rowArr = [];

      var _loop = function _loop(j) {
        var dataIndex = i * cols + j;
        var itemEl = void 0;

        if (dataIndex < dataLength) {
          var el = _this2.data && _this2.data[dataIndex];
          var TouchFeedback2 = TouchFeedback;
          itemEl = h(TouchFeedback2, {
            "key": "griditem-" + dataIndex,
            "attrs": {
              "activeClassName": activeClassName ? activeClassName : prefixCls + "-item-active",
              "activeStyle": activeStyle
            }
          }, [h(Flex.Item, _mergeJSXProps([{
            "class": prefixCls + "-item"
          }, {
            "nativeOn": {
              click: function click() {
                _this2.$emit('click', el, dataIndex);
              }
            }
          }, {
            "style": colStyle
          }]), [_this2.renderItem(el, dataIndex, cols)])]);
        } else {
          itemEl = h(Flex.Item, {
            "key": "griditem-" + dataIndex,
            "class": prefixCls + "-item " + prefixCls + "-null-item",
            "style": colStyle
          });
        }

        rowArr.push(itemEl);
      };

      for (var j = 0; j < cols; j++) {
        _loop(j);
      }

      rowsArr.push(h(Flex, {
        "attrs": {
          "justify": "center'} align={'stretch"
        },
        "key": "gridline-" + i
      }, [rowArr]));
    }

    return rowsArr;
  };

  _proto.render = function render() {
    var _classnames;

    var h = arguments[0];

    var prefixCls = this.prefixCls,
        data = this.data,
        bordered = this.bordered,
        carousel = this.carousel,
        square = this.square,
        activeStyle = this.activeStyle,
        cols = this.cols,
        carouselMaxRow = this.carouselMaxRow,
        renderItem = this.renderItem,
        activeClassName = this.activeClassName,
        restPropsForCarousel = _objectWithoutPropertiesLoose(this, ["prefixCls", "data", "bordered", "carousel", "square", "activeStyle", "cols", "carouselMaxRow", "renderItem", "activeClassName"]);

    var initialSlideWidth = this.initialSlideWidth;
    var dataLength = data && data.length || 0;
    var rowCount = Math.ceil(dataLength / cols);
    var rowsArr;
    var renderEl;

    if (carousel) {
      if (initialSlideWidth < 0) {
        // carousel  server render. because carousel dependes on document
        return null;
      }

      if (rowCount % carouselMaxRow !== 0) {
        rowCount = rowCount + carouselMaxRow - rowCount % carouselMaxRow;
      }

      var pageCount = Math.ceil(rowCount / carouselMaxRow);
      rowsArr = this.getRows(rowCount, dataLength);
      var carouselProps = {};

      if (pageCount <= 1) {
        carouselProps = {
          dots: false,
          dragging: false,
          swiping: false
        };
      }

      renderEl = h(Carousel, _mergeJSXProps2([{
        "attrs": {
          "initialSlideWidth": initialSlideWidth
        }
      }, restPropsForCarousel, {}, carouselProps]), [this.renderCarousel(rowsArr, pageCount, rowCount)]);
    } else {
      renderEl = this.getRows(rowCount, dataLength);
    }

    var cls = classnames(prefixCls, (_classnames = {}, _classnames[prefixCls + "-square"] = square, _classnames[prefixCls + "-line"] = bordered, _classnames[prefixCls + "-carousel"] = carousel, _classnames));
    return h("div", {
      "class": cls
    }, [renderEl]);
  };

  _proto.renderIcon = function renderIcon(icon, prefixCls) {
    var h = this.$createElement;

    if (typeof icon === 'string') {
      if (icon.startsWith('http://') || icon.startsWith('https://')) {
        return h("img", {
          "class": prefixCls + "-icon",
          "attrs": {
            "src": icon,
            "alt": ""
          }
        });
      } else {
        return h(Icon, {
          "attrs": {
            "type": icon,
            "size": "lg"
          }
        });
      }
    } else if (typeof icon === 'object') {
      if (isVNode(icon)) {
        return icon;
      }

      return h(Icon, {
        "props": _extends({}, icon)
      });
    }
  };

  return Grid;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "data", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bordered", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "cols", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "carousel", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "carouselMaxRow", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "square", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "activeClassName", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "activeStyle", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "itemStyle", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Grid as default };