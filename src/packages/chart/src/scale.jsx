import { __decorate } from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { camelAttrs } from './util';
let VScale = class VScale extends Vue {
    created() {
        this.emitSetting();
    }
    emitSetting() {
        ['x', 'y'].forEach(item => {
            if (this[item]) {
                this.$parent.setScale({
                    [item]: Object.assign({}, camelAttrs(this.$attrs))
                });
                if (this.field) {
                    this.$parent.setField(item, this.field);
                }
            }
        });
    }
    render() {
    }
};
__decorate([
    Prop(Boolean)
], VScale.prototype, "x", void 0);
__decorate([
    Prop(Boolean)
], VScale.prototype, "y", void 0);
__decorate([
    Prop(String)
], VScale.prototype, "field", void 0);
VScale = __decorate([
    Component({
        name: 'VScale'
    })
], VScale);
export default VScale;
//# sourceMappingURL=scale.jsx.map