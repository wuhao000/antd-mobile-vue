import { __decorate } from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { camelAttrs } from './util';
let VTooltip = class VTooltip extends Vue {
    created() {
        const options = Object.assign(Object.assign({ disabled: this.disabled, showCrosshairs: this.showCrosshairs, showItemMarker: this.showItemMarker, showValueInLegend: this.showValueInLegend }, camelAttrs(this.options)), camelAttrs(this.$attrs));
        if (this.showXValue) {
            options.onShow = (ev) => {
                const { items } = ev;
                items[0].name = items[0].title;
            };
        }
        this.$parent.setTooltip(options);
    }
    render() {
    }
};
__decorate([
    Prop({
        type: Boolean,
        default: false
    })
], VTooltip.prototype, "disabled", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: true
    })
], VTooltip.prototype, "showCrosshairs", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: true
    })
], VTooltip.prototype, "showItemMarker", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false
    })
], VTooltip.prototype, "showXValue", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false
    })
], VTooltip.prototype, "showValueInLegend", void 0);
__decorate([
    Prop({
        type: Object,
        default() {
            return {};
        }
    })
], VTooltip.prototype, "options", void 0);
VTooltip = __decorate([
    Component({
        name: 'VTooltip'
    })
], VTooltip);
export default VTooltip;
//# sourceMappingURL=tooltip.jsx.map