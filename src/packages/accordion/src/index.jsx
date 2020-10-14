import { __decorate } from "tslib";
import RcCollapse from 'ant-design-vue/lib/vc-collapse';
import { Options, Vue } from 'vue-class-component';
let Accordion = class Accordion extends Vue {
    render() {
        return this.$slots.default ? <RcCollapse {...this.$props} onChange={(...args) => {
            this.$emit('change', ...args);
        }}>{this.$slots.default()}</RcCollapse> : null;
    }
};
Accordion.Panel = RcCollapse.Panel;
Accordion = __decorate([
    Options({
        name: 'Accordion',
        props: {
            prefixCls: { default: 'am-accordion' },
            openAnimation: {},
            accordion: { type: Boolean, default: false },
            activeKey: { type: [String, Array] }
        }
    })
], Accordion);
export default Accordion;
//# sourceMappingURL=index.jsx.map