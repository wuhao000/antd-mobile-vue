import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import RcCollapse from '../../../ant/vc-collapse';
let Accordion = class Accordion extends Vue {
    render() {
        return this.$slots.default ? <RcCollapse attrs={Object.assign({}, this.$props)} onChange={(...args) => {
            this.$emit('change', ...args);
        }}>{this.$slots.default}</RcCollapse> : null;
    }
};
Accordion.Panel = RcCollapse.Panel;
tslib_1.__decorate([
    Prop({ default: 'am-accordion' })
], Accordion.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({})
], Accordion.prototype, "openAnimation", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Accordion.prototype, "accordion", void 0);
tslib_1.__decorate([
    Prop({ type: [String, Array] })
], Accordion.prototype, "activeKey", void 0);
Accordion = tslib_1.__decorate([
    Component({
        name: 'Accordion'
    })
], Accordion);
export default Accordion;
//# sourceMappingURL=index.jsx.map