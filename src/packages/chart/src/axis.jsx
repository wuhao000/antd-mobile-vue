import { __decorate } from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { camelAttrs } from './util';
let VAxis = class VAxis extends Vue {
    created() {
        const _options = Object.assign(Object.assign(Object.assign({}, this.$props), this.options), camelAttrs(this.$attrs));
        this.$parent.setAxis(_options);
    }
    render() {
    }
};
__decorate([
    Prop(Boolean)
], VAxis.prototype, "x", void 0);
__decorate([
    Prop(Boolean)
], VAxis.prototype, "y", void 0);
__decorate([
    Prop(String)
], VAxis.prototype, "field", void 0);
__decorate([
    Prop(Boolean)
], VAxis.prototype, "disabled", void 0);
__decorate([
    Prop(Boolean)
], VAxis.prototype, "autoAlign", void 0);
__decorate([
    Prop({
        type: Object,
        default() {
            return {};
        }
    })
], VAxis.prototype, "options", void 0);
VAxis = __decorate([
    Component({
        name: 'VAxis'
    })
], VAxis);
export default VAxis;
//# sourceMappingURL=axis.jsx.map