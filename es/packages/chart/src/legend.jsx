import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { camelAttrs } from './util';
let VLegend = class VLegend extends Vue {
    created() {
        this.$parent.setLegend(Object.assign({}, this.options, { disabled: this.disabled }, camelAttrs(this.$attrs)));
    }
    render() {
    }
};
tslib_1.__decorate([
    Prop({
        type: Object,
        default() {
            return {};
        }
    })
], VLegend.prototype, "options", void 0);
tslib_1.__decorate([
    Prop({
        type: Boolean,
        default: false
    })
], VLegend.prototype, "disabled", void 0);
VLegend = tslib_1.__decorate([
    Component({
        name: 'VLegend'
    })
], VLegend);
export default VLegend;
//# sourceMappingURL=legend.jsx.map