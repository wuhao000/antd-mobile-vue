import _extends from "@babel/runtime/helpers/extends";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;

import F2 from '@antv/f2';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
var VChart = (_dec = Component({
  name: 'VChart'
}), _dec2 = Prop({
  type: String,
  default: 'mchart-'
}), _dec3 = Prop(Number), _dec4 = Prop(Number), _dec5 = Prop({
  type: String,
  default: '#fff'
}), _dec6 = Prop({
  type: Array
}), _dec7 = Prop({
  type: Object
}), _dec8 = Prop({
  type: String,
  default: 'line'
}), _dec9 = Prop({
  type: Boolean,
  default: false
}), _dec10 = Prop({
  type: Boolean,
  default: false
}), _dec11 = Watch('data'), _dec12 = Watch('height'), _dec13 = Watch('width'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(VChart, _Vue);

  function VChart() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "width", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "height", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "backgroundColor", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "data", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tooltip", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "shape", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "preventRender", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "preventDefault", _descriptor9, _assertThisInitialized(_this)), _this.xField = '', _this.yField = '', _this.hasPoint = false, _this.pointStyle = {}, _this.guideTags = [], _this.areaOptions = null, _this.lineOptions = null, _this.tooltipOptions = null, _this.legendOptions = null, _this.barOptions = null, _this.pieOptions = null, _this.guideOptions = null, _this.pointOptions = null, _this.xFieldOptions = {}, _this.yFieldOptions = {}, _this.guides = [], _this.seriesField = '', _this.xAxisOptions = null, _this.yAxisOptions = null, _this.autoAlignXAxis = undefined, _temp) || _assertThisInitialized(_this);
  }

  var _proto = VChart.prototype;

  _proto.dataChanged = function dataChanged() {
    this.changeData(this.data);
  };

  _proto.mounted =
  /*#__PURE__*/
  function () {
    var _mounted = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.$nextTick();

            case 2:
              this.renderComponent();
              window.addEventListener('resize', this.renderComponent);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function mounted() {
      return _mounted.apply(this, arguments);
    }

    return mounted;
  }();

  _proto.beforeDestroy = function beforeDestroy() {
    window.removeEventListener('resize', this.renderComponent);
    this.destroy();
  };

  _proto.onTouchstart = function onTouchstart(e) {
    this.preventDefault && e.preventDefault();
  };

  _proto.set = function set(name, options) {
    this[name + "Options"] = options;
  };

  _proto.changeData = function changeData(data) {
    this.chart && this.chart.changeData(data);
  };

  _proto.setField = function setField(axis, item) {
    this[axis + "Field"] = item;
  };

  _proto.repaint = function repaint() {
    this.chart.repaint();
  };

  _proto.heightChanged = function heightChanged() {
    this.rerender();
  };

  _proto.widthChanged = function widthChanged() {
    this.rerender();
  };

  _proto.rerender = function rerender() {
    this.destroy();
    this.renderComponent();
  };

  _proto.destroy = function destroy() {
    this.chart && this.chart.destroy();
  };

  _proto.addGuide = function addGuide(options) {
    this.guides.push(options);
  };

  _proto.setScale = function setScale(options) {
    if (options.x) {
      this.xFieldOptions = options.x;
    }

    if (options.y) {
      this.yFieldOptions = options.y;
    }
  };

  _proto.setAxis = function setAxis(options) {
    if (options.x) {
      this.xAxisOptions = options;

      if (typeof options.autoAlign !== 'undefined') {
        this.autoAlignXAxis = options.autoAlign;
      }
    }

    if (options.y) {
      this.yAxisOptions = options;
    }
  };

  _proto.buildColor = function buildColor(c) {
    var color = c || '';

    if (Array.isArray(c) && Array.isArray(c[0])) {
      var ctx = this.$refs.chart.getContext('2d');
      color = ctx.createLinearGradient(0, 0, window.innerWidth, 0);
      c.forEach(function (c) {
        color.addColorStop(c[0], c[1]);
      });
    }

    return color;
  };

  _proto.setPie = function setPie(options) {
    if (options === void 0) {
      options = {};
    }

    this.pieOptions = options;
  };

  _proto.setBar = function setBar(options) {
    if (options === void 0) {
      options = {};
    }

    this.barOptions = options;
  };

  _proto.setLegend = function setLegend(options) {
    this.legendOptions = options;
  };

  _proto.setTooltip = function setTooltip(options) {
    this.tooltipOptions = options;
  };

  _proto.setArea = function setArea(options) {
    this.areaOptions = options;
  };

  _proto.setGuide = function setGuide(options) {
    this.guideOptions = options;
  };

  _proto.setLine = function setLine(options) {
    this.lineOptions = options;
  };

  _proto.setPoint = function setPoint(options) {
    this.pointOptions = options;
  };

  _proto.buildPosition = function buildPosition() {
    return this.xField + "*" + this.yField;
  };

  _proto.getFields = function getFields() {
    if (this.xField && this.yField) {
      return;
    }

    if (this.data && this.data.length) {
      var keys = Object.keys(this.data[0]);

      if (keys.length >= 2) {
        var indexes = [0, 1];
        var type1 = typeof this.data[0][keys[0]];
        var type2 = typeof this.data[0][keys[1]];

        if (type1 === 'number' && type2 !== 'number') {
          indexes = [1, 0];
        } else if (type1 === 'string' && type2 === 'string' && keys[2] === 'value') {
          indexes = [0, 2];
        }

        this.xField = keys[indexes[0]];
        this.yField = keys[indexes[1]];
      }
    }
  };

  _proto.renderComponent = function renderComponent() {
    var autoAlignXAxis = this.autoAlignXAxis;

    if (this.barOptions) {
      autoAlignXAxis = false;
    }

    if (typeof autoAlignXAxis === 'undefined') {
      autoAlignXAxis = true;
    }

    var parentWidth = this.$refs.wrapper.clientWidth;
    var parentHeight = this.$refs.wrapper.clientHeight;
    var chart = new F2.Chart(_extends({
      el: this.$refs.chart,
      width: this.width || parentWidth,
      height: this.height ? this.height : parentWidth > parentHeight ? parentHeight - 34 : parentWidth * 0.707,
      pixelRatio: this.$devicePixelRatio || window.devicePixelRatio
    }, this.$attrs));

    if (this.preventRender) {
      this.$emit('on-render', {
        chart: chart
      });
      return;
    }

    if (!this.data || !this.data.length) {
      return;
    }

    chart.source(this.currentData);
    this.getFields();
    chart.scale(this.xField, this.currentXFieldOptions);
    chart.scale(this.yField, this.currentYFieldOptions);
    this.renderLegend(chart);
    this.renderTooltip(chart);
    this.setAutoAlignXAxis(chart, autoAlignXAxis);
    this.renderLine(chart);
    this.renderGuide(chart);
    this.renderArea(chart);
    this.renderBar(chart);
    this.renderAxis(chart);
    this.renderPie(chart);
    this.renderPoint(chart);
    chart.render();
    this.chart = chart;
  };

  _proto.render = function render() {
    var h = arguments[0];
    var style = {
      backgroundColor: this.backgroundColor,
      width: this.width + 'px',
      height: this.height + 'px'
    };
    return h("div", {
      "style": style,
      "ref": "wrapper",
      "on": {
        "touchstart": this.onTouchstart
      }
    }, [h("canvas", {
      "class": this.prefixCls + "-no-select",
      "ref": "chart"
    }), this.$slots.default]);
  };

  _proto.renderTooltip = function renderTooltip(chart) {
    var _this2 = this;

    if (this.tooltipOptions) {
      if (this.barOptions) {
        this.tooltipOptions.showCrosshairs = false;
      }

      if (!this.tooltipOptions.disabled) {
        // handle show-value-in-legend
        if (this.tooltipOptions.showValueInLegend) {
          var customTooltip = {
            custom: true,
            // 自定义 tooltip 内容框
            onChange: function onChange(obj) {
              var legend = _this2.chart.get('legendController').legends.top[0];

              var tooltipItems = obj.items;
              var legendItems = legend.items;
              var map = {};
              legendItems.map(function (item) {
                map[item.name] = JSON.parse(JSON.stringify(item));
              });
              tooltipItems.map(function (item) {
                var name = item.name,
                    value = item.value;

                if (map[name]) {
                  map[name].value = value;
                }
              });
              legend.setItems(Object.values(map));
            },
            onHide: function onHide() {
              var VChart = _this2.chart;
              var legend = VChart.get('legendController').legends.top[0];
              legend.setItems(VChart.getLegendItems().type);
            }
          };
          this.tooltipOptions = _extends({}, this.tooltipOptions, customTooltip);
        }

        chart.tooltip(this.tooltipOptions);
      } else {
        chart.tooltip(false);
      }
    } else {
      chart.tooltip({
        showCrosshairs: !this.barOption
      });
    }
  };

  _proto.renderLine = function renderLine(chart) {
    if (this.lineOptions) {
      var _this$lineOptions = this.lineOptions,
          shape = _this$lineOptions.shape,
          adjust = _this$lineOptions.adjust;
      var seriesField = this.lineOptions.seriesField || '';
      var colors = this.buildColor(this.lineOptions.colors);
      var rs = chart.line().position(this.buildPosition()).shape(shape);

      if (!seriesField && colors) {
        rs.color(colors);
      }

      if (seriesField) {
        if (colors && colors.length) {
          rs.color(seriesField, colors);
        } else {
          rs.color(seriesField);
        }
      }

      if (adjust) {
        rs.adjust(adjust);
      }
    }
  };

  _proto.renderGuide = function renderGuide(chart) {
    if (this.guides.length) {
      this.guides.forEach(function (guide) {
        chart.guide()[guide.type](guide.options);
      });
    }
  };

  _proto.renderArea = function renderArea(chart) {
    if (this.areaOptions) {
      var _this$areaOptions = this.areaOptions,
          adjust = _this$areaOptions.adjust,
          seriesField = _this$areaOptions.seriesField;
      var color = this.buildColor(this.areaOptions.colors);
      var rs = chart.area().position(this.buildPosition()).shape(this.areaOptions.shape || '');

      if (!seriesField && color) {
        rs.color(color);
      } else {
        rs.color(seriesField || '', color);
      }

      if (adjust) {
        rs.adjust(adjust);
      }
    }
  };

  _proto.renderBar = function renderBar(chart) {
    if (this.barOptions) {
      var _this$barOptions = this.barOptions,
          adjust = _this$barOptions.adjust,
          seriesField = _this$barOptions.seriesField;
      var color = this.buildColor(this.barOptions.colors);

      if (this.barOptions.direction && this.barOptions.direction === 'horizontal') {
        chart.coord({
          transposed: true
        });
      }

      var rs = chart.interval().position(this.buildPosition());

      if (!seriesField && color) {
        rs.color(color);
      } else {
        rs.color(seriesField || '', color);
      }

      if (adjust) {
        rs.adjust(adjust);
      }
    }
  };

  _proto.renderAxis = function renderAxis(chart) {
    var _this3 = this;

    if (['x', 'y'].find(function (axis) {
      return _this3[axis + "AxisOptions"];
    })) {
      ['x', 'y'].forEach(function (axis) {
        if (_this3[axis + "AxisOptions"]) {
          chart.axis(_this3[axis + "Field"], _this3[axis + "Field"].disabled ? false : _this3[axis + "AxisOptions"]);
        }
      });
    } else {
      chart.axis(false);
    }
  };

  _proto.renderPie = function renderPie(chart) {
    if (this.pieOptions) {
      chart.coord(this.pieOptions.coord, this.pieOptions);
      chart.axis(false);
      chart.interval().position('a*percent').color(this.pieOptions.seriesField, this.pieOptions.colors && this.pieOptions.colors.length ? this.pieOptions.colors : '').adjust('stack').style({
        lineWidth: 1,
        stroke: '#fff',
        lineJoin: 'round',
        lineCap: 'round'
      }).animate({
        appear: {
          duration: 1200,
          easing: 'bounceOut'
        }
      });
    }
  };

  _proto.renderPoint = function renderPoint(chart) {
    if (this.pointOptions) {
      var seriesField = this.pointOptions.seriesField;
      var rs = chart.point().position(this.buildPosition()).style(this.pointOptions.styles);
      var color = this.buildColor(this.pointOptions.colors);

      if (!seriesField && color) {
        rs.color(color);
      } else {
        rs.color(seriesField || '', color);
      }
    }
  };

  _proto.setAutoAlignXAxis = function setAutoAlignXAxis(chart, autoAlignXAxis) {
    if (autoAlignXAxis) {
      if (this.xAxisOptions) {
        chart.axis(this.xField, {
          label: function label(text, index, total) {
            var textCfg = {};

            if (index === 0) {
              textCfg.textAlign = 'left';
            }

            if (index === total - 1) {
              textCfg.textAlign = 'right';
            }

            return textCfg;
          }
        });
      }
    }
  };

  _proto.renderLegend = function renderLegend(chart) {
    if (this.legendOptions) {
      if (this.legendOptions.disabled) {
        chart.legend(false);
      } else {
        chart.legend(this.legendOptions);
      }
    }
  };

  _createClass(VChart, [{
    key: "currentData",
    get: function get() {
      if (this.pieOptions) {
        return this.data.slice().map(function (item) {
          item.a = '1';
          return item;
        });
      }

      return this.data;
    }
  }, {
    key: "currentXFieldOptions",
    get: function get() {
      var defaultOptions = {
        tickCount: 5
      };

      if (!this.barOptions) {
        defaultOptions.range = [0, 1];
      } else {
        defaultOptions.tickCount = 0;
      } // auto detect if is timeCat


      if (!this.xFieldOptions) {
        if (/\d{4}-\d{2}-\d{2}/.test(this.data[0][this.xField])) {
          return _extends({}, defaultOptions, {
            type: 'timeCat',
            tickCount: 3
          });
        } else {
          return defaultOptions;
        }
      }

      return _extends({}, defaultOptions, this.xFieldOptions);
    }
  }, {
    key: "currentYFieldOptions",
    get: function get() {
      var defaultOptions = {
        tickCount: 5
      };

      if (!this.yFieldOptions) {
        return defaultOptions;
      }

      return _extends({}, defaultOptions, this.yFieldOptions);
    }
  }]);

  return VChart;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "width", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "height", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "backgroundColor", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "data", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "tooltip", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "shape", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "preventRender", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "preventDefault", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "dataChanged", [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "dataChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "heightChanged", [_dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "heightChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "widthChanged", [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "widthChanged"), _class2.prototype)), _class2)) || _class);
export default VChart;