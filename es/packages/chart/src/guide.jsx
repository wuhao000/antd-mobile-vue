import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { camelAttrs } from './util';
const types = ['line', 'text', 'tag', 'rect', 'html', 'arc'];
let VGuide = class VGuide extends Vue {
    created() {
        this.$parent.addGuide({
            type: this.type,
            options: Object.assign({ top: this.top, withPoint: this.withPoint }, camelAttrs(this.options), camelAttrs(this.$attrs))
        });
    }
    render() {
    }
};
tslib_1.__decorate([
    Prop({
        type: String,
        validator(val) {
            return types.filter(type => type === val).length === 1;
        }
    })
], VGuide.prototype, "type", void 0);
tslib_1.__decorate([
    Prop({
        type: Object,
        default() {
            return {};
        }
    })
], VGuide.prototype, "options", void 0);
tslib_1.__decorate([
    Prop(Boolean)
], VGuide.prototype, "top", void 0);
tslib_1.__decorate([
    Prop({
        type: Boolean,
        default: true
    })
], VGuide.prototype, "withPoint", void 0);
VGuide = tslib_1.__decorate([
    Component({
        name: 'VGuide'
    })
], VGuide);
export default VGuide;
//# sourceMappingURL=guide.jsx.map