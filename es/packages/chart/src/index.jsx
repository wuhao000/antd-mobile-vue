import * as tslib_1 from "tslib";
import F2 from '@antv/f2';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
let VChart = class VChart extends Vue {
    constructor() {
        super(...arguments);
        this.xField = '';
        this.yField = '';
        this.hasPoint = false;
        this.pointStyle = {};
        this.guideTags = [];
        this.areaOptions = null;
        this.lineOptions = null;
        this.tooltipOptions = null;
        this.legendOptions = null;
        this.barOptions = null;
        this.pieOptions = null;
        this.guideOptions = null;
        this.pointOptions = null;
        this.xFieldOptions = {};
        this.yFieldOptions = {};
        this.guides = [];
        this.seriesField = '';
        this.xAxisOptions = null;
        this.yAxisOptions = null;
        this.autoAlignXAxis = undefined;
    }
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
        const defaultOptions = {
            tickCount: 5
        };
        if (!this.barOptions) {
            defaultOptions.range = [0, 1];
        }
        else {
            defaultOptions.tickCount = 0;
        }
        // auto detect if is timeCat
        if (!this.xFieldOptions) {
            if (/\d{4}-\d{2}-\d{2}/.test(this.data[0][this.xField])) {
                return Object.assign({}, defaultOptions, {
                    type: 'timeCat',
                    tickCount: 3
                });
            }
            else {
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
    dataChanged() {
        this.changeData(this.data);
    }
    mounted() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.$nextTick();
            this.renderComponent();
            window.addEventListener('resize', this.renderComponent);
        });
    }
    beforeDestroy() {
        window.removeEventListener('resize', this.renderComponent);
        this.destroy();
    }
    onTouchstart(e) {
        this.preventDefault && e.preventDefault();
    }
    set(name, options) {
        this[`${name}Options`] = options;
    }
    changeData(data) {
        this.chart && this.chart.changeData(data);
    }
    setField(axis, item) {
        this[`${axis}Field`] = item;
    }
    repaint() {
        this.chart.repaint();
    }
    heightChanged() {
        this.rerender();
    }
    widthChanged() {
        this.rerender();
    }
    rerender() {
        this.destroy();
        this.renderComponent();
    }
    destroy() {
        this.chart && this.chart.destroy();
    }
    addGuide(options) {
        this.guides.push(options);
    }
    setScale(options) {
        if (options.x) {
            this.xFieldOptions = options.x;
        }
        if (options.y) {
            this.yFieldOptions = options.y;
        }
    }
    setAxis(options) {
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
    buildColor(c) {
        let color = c || '';
        if (Array.isArray(c) && Array.isArray(c[0])) {
            const ctx = this.$refs.chart.getContext('2d');
            color = ctx.createLinearGradient(0, 0, window.innerWidth, 0);
            c.forEach(c => {
                color.addColorStop(c[0], c[1]);
            });
        }
        return color;
    }
    setPie(options = {}) {
        this.pieOptions = options;
    }
    setBar(options = {}) {
        this.barOptions = options;
    }
    setLegend(options) {
        this.legendOptions = options;
    }
    setTooltip(options) {
        this.tooltipOptions = options;
    }
    setArea(options) {
        this.areaOptions = options;
    }
    setGuide(options) {
        this.guideOptions = options;
    }
    setLine(options) {
        this.lineOptions = options;
    }
    setPoint(options) {
        this.pointOptions = options;
    }
    buildPosition() {
        return `${this.xField}*${this.yField}`;
    }
    getFields() {
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
                }
                else if (type1 === 'string' && type2 === 'string' && keys[2] === 'value') {
                    indexes = [0, 2];
                }
                this.xField = keys[indexes[0]];
                this.yField = keys[indexes[1]];
            }
        }
    }
    renderComponent() {
        let autoAlignXAxis = this.autoAlignXAxis;
        if (this.barOptions) {
            autoAlignXAxis = false;
        }
        if (typeof autoAlignXAxis === 'undefined') {
            autoAlignXAxis = true;
        }
        const parentWidth = this.$refs.wrapper.clientWidth;
        const parentHeight = this.$refs.wrapper.clientHeight;
        const chart = new F2.Chart(Object.assign({ el: this.$refs.chart, width: this.width || parentWidth, height: this.height ? this.height : (parentWidth > parentHeight ? (parentHeight - 34) : parentWidth * 0.707), pixelRatio: this.$devicePixelRatio || window.devicePixelRatio }, this.$attrs));
        if (this.preventRender) {
            this.$emit('on-render', { chart });
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
    render() {
        const style = {
            backgroundColor: this.backgroundColor,
            width: this.width + 'px',
            height: this.height + 'px'
        };
        return <div style={style} ref="wrapper" onTouchstart={this.onTouchstart}>
      <canvas class={`${this.prefixCls}-no-select`} ref="chart"/>
      {this.$slots.default}
    </div>;
    }
    renderTooltip(chart) {
        if (this.tooltipOptions) {
            if (this.barOptions) {
                this.tooltipOptions.showCrosshairs = false;
            }
            if (!this.tooltipOptions.disabled) {
                // handle show-value-in-legend
                if (this.tooltipOptions.showValueInLegend) {
                    const customTooltip = {
                        custom: true,
                        onChange: (obj) => {
                            const legend = this.chart.get('legendController').legends.top[0];
                            const tooltipItems = obj.items;
                            const legendItems = legend.items;
                            const map = {};
                            legendItems.map(item => {
                                map[item.name] = JSON.parse(JSON.stringify(item));
                            });
                            tooltipItems.map(item => {
                                const { name, value } = item;
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
                    this.tooltipOptions = Object.assign({}, this.tooltipOptions, customTooltip);
                }
                chart.tooltip(this.tooltipOptions);
            }
            else {
                chart.tooltip(false);
            }
        }
        else {
            chart.tooltip({
                showCrosshairs: !this.barOption
            });
        }
    }
    renderLine(chart) {
        if (this.lineOptions) {
            const { shape, adjust } = this.lineOptions;
            const seriesField = this.lineOptions.seriesField || '';
            const colors = this.buildColor(this.lineOptions.colors);
            const rs = chart.line().position(this.buildPosition()).shape(shape);
            if (!seriesField && colors) {
                rs.color(colors);
            }
            if (seriesField) {
                if (colors && colors.length) {
                    rs.color(seriesField, colors);
                }
                else {
                    rs.color(seriesField);
                }
            }
            if (adjust) {
                rs.adjust(adjust);
            }
        }
    }
    renderGuide(chart) {
        if (this.guides.length) {
            this.guides.forEach(guide => {
                chart.guide()[guide.type](guide.options);
            });
        }
    }
    renderArea(chart) {
        if (this.areaOptions) {
            const { adjust, seriesField } = this.areaOptions;
            const color = this.buildColor(this.areaOptions.colors);
            const rs = chart.area().position(this.buildPosition()).shape(this.areaOptions.shape || '');
            if (!seriesField && color) {
                rs.color(color);
            }
            else {
                rs.color(seriesField || '', color);
            }
            if (adjust) {
                rs.adjust(adjust);
            }
        }
    }
    renderBar(chart) {
        if (this.barOptions) {
            const { adjust, seriesField } = this.barOptions;
            const color = this.buildColor(this.barOptions.colors);
            if (this.barOptions.direction && this.barOptions.direction === 'horizontal') {
                chart.coord({
                    transposed: true
                });
            }
            const rs = chart.interval().position(this.buildPosition());
            if (!seriesField && color) {
                rs.color(color);
            }
            else {
                rs.color(seriesField || '', color);
            }
            if (adjust) {
                rs.adjust(adjust);
            }
        }
    }
    renderAxis(chart) {
        if (['x', 'y'].find(axis => this[`${axis}AxisOptions`])) {
            ['x', 'y'].forEach(axis => {
                if (this[`${axis}AxisOptions`]) {
                    chart.axis(this[`${axis}Field`], this[`${axis}Field`].disabled ? false : this[`${axis}AxisOptions`]);
                }
            });
        }
        else {
            chart.axis(false);
        }
    }
    renderPie(chart) {
        if (this.pieOptions) {
            chart.coord(this.pieOptions.coord, this.pieOptions);
            chart.axis(false);
            chart.interval()
                .position('a*percent')
                .color(this.pieOptions.seriesField, (this.pieOptions.colors && this.pieOptions.colors.length)
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
    renderPoint(chart) {
        if (this.pointOptions) {
            const { seriesField } = this.pointOptions;
            const rs = chart.point().position(this.buildPosition()).style(this.pointOptions.styles);
            const color = this.buildColor(this.pointOptions.colors);
            if (!seriesField && color) {
                rs.color(color);
            }
            else {
                rs.color(seriesField || '', color);
            }
        }
    }
    setAutoAlignXAxis(chart, autoAlignXAxis) {
        if (autoAlignXAxis) {
            if (this.xAxisOptions) {
                chart.axis(this.xField, {
                    label(text, index, total) {
                        const textCfg = {};
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
    renderLegend(chart) {
        if (this.legendOptions) {
            if (this.legendOptions.disabled) {
                chart.legend(false);
            }
            else {
                chart.legend(this.legendOptions);
            }
        }
    }
};
tslib_1.__decorate([
    Prop({ type: String, default: 'mchart-' })
], VChart.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop(Number)
], VChart.prototype, "width", void 0);
tslib_1.__decorate([
    Prop(Number)
], VChart.prototype, "height", void 0);
tslib_1.__decorate([
    Prop({
        type: String,
        default: '#fff'
    })
], VChart.prototype, "backgroundColor", void 0);
tslib_1.__decorate([
    Prop({
        type: Array
    })
], VChart.prototype, "data", void 0);
tslib_1.__decorate([
    Prop({
        type: Object
    })
], VChart.prototype, "tooltip", void 0);
tslib_1.__decorate([
    Prop({
        type: String,
        default: 'line'
    })
], VChart.prototype, "shape", void 0);
tslib_1.__decorate([
    Prop({
        type: Boolean,
        default: false
    })
], VChart.prototype, "preventRender", void 0);
tslib_1.__decorate([
    Prop({
        type: Boolean,
        default: false
    })
], VChart.prototype, "preventDefault", void 0);
tslib_1.__decorate([
    Watch('data')
], VChart.prototype, "dataChanged", null);
tslib_1.__decorate([
    Watch('height')
], VChart.prototype, "heightChanged", null);
tslib_1.__decorate([
    Watch('width')
], VChart.prototype, "widthChanged", null);
VChart = tslib_1.__decorate([
    Component({
        name: 'VChart'
    })
], VChart);
export default VChart;
//# sourceMappingURL=index.jsx.map