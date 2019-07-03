import F2 from '@antv/f2';

import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import VArea from './area';
import VAxis from './axis';
import VBar from './bar';
import VGuide from './guide';
import VLegend from './legend';
import VLine from './line';
import VPie from './pie';
import VPoint from './point';
import VScale from './scale';
import VTooltip from './tooltip';

@Component({
  name: 'VChart'
})
class VChart extends Vue {
  @Prop({type: String, default: 'mchart-'})
  public prefixCls: string;
  @Prop(Number)
  public width: number;
  @Prop(Number)
  public height: number;
  @Prop({
    type: String,
    default: '#fff'
  })
  public backgroundColor: string;
  @Prop({
    type: Array
  })
  public data: any[];
  @Prop({
    type: Object
  })
  public tooltip: any;
  @Prop({
    type: String,
    default: 'line'
  })
  public shape: string;
  @Prop({
    type: Boolean,
    default: false
  })
  public preventRender: boolean;
  @Prop({
    type: Boolean,
    default: false
  })
  public preventDefault: boolean;
  public xField = '';
  public yField = '';
  public hasPoint = false;
  public pointStyle = {};
  public guideTags = [];
  public areaOptions = null;
  public lineOptions = null;
  public tooltipOptions = null;
  public legendOptions = null;
  public barOptions = null;
  public pieOptions = null;
  public guideOptions = null;
  public pointOptions = null;
  public xFieldOptions = {};
  public yFieldOptions = {};
  public guides = [];
  public seriesField = '';
  public xAxisOptions = null;
  public yAxisOptions = null;
  public autoAlignXAxis = undefined;
  private chart: any;
  private $devicePixelRatio: number;
  private barOption: any;
  public static install: (Vue) => void;
  public static Area: typeof VArea;
  public static Axis: typeof VAxis;
  public static Bar: typeof VBar;
  public static Guide: typeof VGuide;
  public static Legend: typeof VLegend;
  public static Line: typeof VLine;
  public static Pie: typeof VPie;
  public static Point: typeof VPoint;
  public static Scale: typeof VScale;
  public static Tooltip: typeof VTooltip;

  get currentData() {
    if (this.pieOptions) {
      return this.data.slice().map(item => {
        item.a = '1';
        return item;
      });
    }
    return this.data;
  }

  get currentXFieldOptions() {
    const defaultOptions: any = {
      tickCount: 5
    };
    if (!this.barOptions) {
      defaultOptions.range = [0, 1];
    } else {
      defaultOptions.tickCount = 0;
    }
    // auto detect if is timeCat
    if (!this.xFieldOptions) {
      if (/\d{4}-\d{2}-\d{2}/.test(this.data[0][this.xField])) {
        return Object.assign({}, defaultOptions, {
          type: 'timeCat',
          tickCount: 3
        });
      } else {
        return defaultOptions;
      }
    }

    return Object.assign({}, defaultOptions, this.xFieldOptions);
  }

  get currentYFieldOptions() {
    const defaultOptions = {
      tickCount: 5
    };
    if (!this.yFieldOptions) {
      return defaultOptions;
    }

    return Object.assign({}, defaultOptions, this.yFieldOptions);
  }

  @Watch('data')
  public dataChanged() {
    this.changeData(this.data);
  }

  public async mounted(this: any) {
    await this.$nextTick();
    this.renderComponent();
    window.addEventListener('resize', this.renderComponent);
  }

  public beforeDestroy() {
    window.removeEventListener('resize', this.renderComponent);
    this.destroy();
  }

  public onTouchstart(e) {
    this.preventDefault && e.preventDefault();
  }

  public set(name, options) {
    this[`${name}Options`] = options;
  }

  public changeData(data) {
    this.chart && this.chart.changeData(data);
  }

  public setField(axis, item) {
    this[`${axis}Field`] = item;
  }

  public repaint() {
    this.chart.repaint();
  }

  @Watch('height')
  public heightChanged() {
    this.rerender();
  }

  @Watch('width')
  public widthChanged() {
    this.rerender();
  }

  public rerender() {
    this.destroy();
    this.renderComponent();
  }

  public destroy() {
    this.chart && this.chart.destroy();
  }

  public addGuide(options) {
    this.guides.push(options);
  }

  public setScale(options) {
    if (options.x) {
      this.xFieldOptions = options.x;
    }
    if (options.y) {
      this.yFieldOptions = options.y;
    }
  }

  public setAxis(options) {
    if (options.x) {
      this.xAxisOptions = options;
      if (typeof options.autoAlign !== 'undefined') {
        this.autoAlignXAxis = options.autoAlign;
      }
    }
    if (options.y) {
      this.yAxisOptions = options;
    }
  }

  public buildColor(c) {
    let color = c || '';
    if (Array.isArray(c) && Array.isArray(c[0])) {
      const ctx = (this.$refs as any).chart.getContext('2d');
      color = ctx.createLinearGradient(0, 0, window.innerWidth, 0);
      c.forEach(c => {
        color.addColorStop(c[0], c[1]);
      });
    }
    return color;
  }

  public setPie(options = {}) {
    this.pieOptions = options;
  }

  public setBar(options = {}) {
    this.barOptions = options;
  }

  public setLegend(options) {
    this.legendOptions = options;
  }

  public setTooltip(options) {
    this.tooltipOptions = options;
  }

  public setArea(options) {
    this.areaOptions = options;
  }

  public setGuide(options) {
    this.guideOptions = options;
  }

  public setLine(options) {
    this.lineOptions = options;
  }

  public setPoint(options) {
    this.pointOptions = options;
  }

  public buildPosition() {
    return `${this.xField}*${this.yField}`;
  }

  public getFields() {
    if (this.xField && this.yField) {
      return;
    }

    if (this.data && this.data.length) {
      const keys = Object.keys(this.data[0]);
      if (keys.length >= 2) {
        let indexes = [0, 1];
        const type1 = typeof this.data[0][keys[0]];
        const type2 = typeof this.data[0][keys[1]];
        if (type1 === 'number' && type2 !== 'number') {
          indexes = [1, 0];
        } else if (type1 === 'string' && type2 === 'string' && keys[2] === 'value') {
          indexes = [0, 2];
        }
        this.xField = keys[indexes[0]];
        this.yField = keys[indexes[1]];
      }
    }
  }

  public renderComponent() {
    let autoAlignXAxis = this.autoAlignXAxis;
    if (this.barOptions) {
      autoAlignXAxis = false;
    }
    if (typeof autoAlignXAxis === 'undefined') {
      autoAlignXAxis = true;
    }
    const parentWidth = (this.$refs.wrapper as HTMLDivElement).clientWidth;
    const parentHeight = (this.$refs.wrapper as HTMLDivElement).clientHeight;
    const chart = new F2.Chart({
      el: this.$refs.chart,
      width: this.width || parentWidth,
      height: this.height ? this.height : (parentWidth > parentHeight ? (parentHeight - 34) : parentWidth * 0.707),
      pixelRatio: this.$devicePixelRatio || window.devicePixelRatio,
      ...this.$attrs
    });
    if (this.preventRender) {
      this.$emit('on-render', {chart});
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
  }

  public render() {
    const style = {
      backgroundColor: this.backgroundColor,
      width: this.width + 'px',
      height: this.height + 'px'
    };
    return <div style={style}
                ref="wrapper"
                onTouchstart={this.onTouchstart}>
      <canvas class={`${this.prefixCls}-no-select`}
              ref="chart"/>
      {this.$slots.default}
    </div>;
  }

  private renderTooltip(chart) {
    if (this.tooltipOptions) {
      if (this.barOptions) {
        this.tooltipOptions.showCrosshairs = false;
      }
      if (!this.tooltipOptions.disabled) {
        // handle show-value-in-legend
        if (this.tooltipOptions.showValueInLegend) {
          const customTooltip = {
            custom: true, // 自定义 tooltip 内容框
            onChange: (obj) => {
              const legend = this.chart.get('legendController').legends.top[0];
              const tooltipItems = obj.items;
              const legendItems = legend.items;
              const map = {};
              legendItems.map(item => {
                map[item.name] = JSON.parse(JSON.stringify(item));
              });
              tooltipItems.map(item => {
                const {name, value} = item;
                if (map[name]) {
                  map[name].value = value;
                }
              });
              legend.setItems(Object.values(map));
            },
            onHide: () => {
              const VChart = this.chart;
              const legend = VChart.get('legendController').legends.top[0];
              legend.setItems(VChart.getLegendItems().type);
            }
          };
          this.tooltipOptions = {
            ...this.tooltipOptions,
            ...customTooltip
          };
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
  }

  private renderLine(chart: F2.Chart) {
    if (this.lineOptions) {
      const {shape, adjust} = this.lineOptions;
      const seriesField = this.lineOptions.seriesField || '';
      const colors = this.buildColor(this.lineOptions.colors);
      const rs = chart.line().position(this.buildPosition()).shape(shape);

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
  }

  private renderGuide(chart: F2.Chart) {
    if (this.guides.length) {
      this.guides.forEach(guide => {
        chart.guide()[guide.type](guide.options);
      });
    }
  }

  private renderArea(chart: F2.Chart) {
    if (this.areaOptions) {
      const {adjust, seriesField} = this.areaOptions;
      const color = this.buildColor(this.areaOptions.colors);
      const rs = chart.area().position(this.buildPosition()).shape(this.areaOptions.shape || '');
      if (!seriesField && color) {
        rs.color(color);
      } else {
        rs.color(seriesField || '', color);
      }

      if (adjust) {
        rs.adjust(adjust);
      }
    }
  }

  private renderBar(chart: F2.Chart) {
    if (this.barOptions) {
      const {adjust, seriesField} = this.barOptions;
      const color = this.buildColor(this.barOptions.colors);
      if (this.barOptions.direction && this.barOptions.direction === 'horizontal') {
        chart.coord({
          transposed: true
        });
      }
      const rs = chart.interval().position(this.buildPosition());
      if (!seriesField && color) {
        rs.color(color);
      } else {
        rs.color(seriesField || '', color);
      }

      if (adjust) {
        rs.adjust(adjust);
      }
    }
  }

  private renderAxis(chart: F2.Chart) {
    if (['x', 'y'].find(axis => this[`${axis}AxisOptions`])) {
      ['x', 'y'].forEach(axis => {
        if (this[`${axis}AxisOptions`]) {
          chart.axis(this[`${axis}Field`], this[`${axis}Field`].disabled ? false : this[`${axis}AxisOptions`]);
        }
      });
    } else {
      chart.axis(false);
    }
  }

  private renderPie(chart: F2.Chart) {
    if (this.pieOptions) {
      chart.coord(this.pieOptions.coord, this.pieOptions);
      chart.axis(false);
      chart.interval()
        .position('a*percent')
        .color(this.pieOptions.seriesField,
          (this.pieOptions.colors && this.pieOptions.colors.length)
            ? this.pieOptions.colors : '')
        .adjust('stack')
        .style({
          lineWidth: 1,
          stroke: '#fff',
          lineJoin: 'round',
          lineCap: 'round'
        })
        .animate({
          appear: {
            duration: 1200,
            easing: 'bounceOut'
          }
        });
    }
  }

  private renderPoint(chart: F2.Chart) {
    if (this.pointOptions) {
      const {seriesField} = this.pointOptions;
      const rs = chart.point().position(this.buildPosition()).style(this.pointOptions.styles);

      const color = this.buildColor(this.pointOptions.colors);
      if (!seriesField && color) {
        rs.color(color);
      } else {
        rs.color(seriesField || '', color);
      }
    }
  }

  private setAutoAlignXAxis(chart: F2.Chart, autoAlignXAxis: any) {
    if (autoAlignXAxis) {
      if (this.xAxisOptions) {
        chart.axis(this.xField, {
          label(text, index, total) {
            const textCfg: any = {};
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
  }

  private renderLegend(chart: F2.Chart) {
    if (this.legendOptions) {
      if (this.legendOptions.disabled) {
        chart.legend(false);
      } else {
        chart.legend(this.legendOptions);
      }
    }
  }
}

export default VChart as any;
