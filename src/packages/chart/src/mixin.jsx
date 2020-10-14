import { __decorate } from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { camelAttrs } from './util';
const defaultShapeMap = {
    line: 'line',
    point: 'circle',
    area: 'area'
};
let VChartMixin = class VChartMixin extends Vue {
    created() {
        this.$parent.set(this.chartName, Object.assign(Object.assign({ shape: defaultShapeMap[this.chartName] || '' }, this.$props), camelAttrs(this.$attrs)));
    }
    render() {
        return null;
    }
};
__decorate([
    Prop([String, Array])
], VChartMixin.prototype, "colors", void 0);
__decorate([
    Prop(String)
], VChartMixin.prototype, "seriesField", void 0);
__decorate([
    Prop([String, Object])
], VChartMixin.prototype, "adjust", void 0);
VChartMixin = __decorate([
    Component({
        name: 'VChartMixin'
    })
], VChartMixin);
export default VChartMixin;
//# sourceMappingURL=mixin.jsx.map