import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let Footer = class Footer extends Vue {
    render() {
        const { prefixCls, content, extra } = this;
        const wrapCls = `${prefixCls}-footer`;
        return (<div class={wrapCls}>
        <div class={`${prefixCls}-footer-content`}>{this.$slots.default ? this.$slots.default : content}</div>
        {(this.$slots.extra || extra) && <div class={`${prefixCls}-footer-extra`}>{this.$slots.extra ? this.$slots.extra : extra}</div>}
      </div>);
    }
};
tslib_1.__decorate([
    Prop({ default: 'am-card' })
], Footer.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Footer.prototype, "extra", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Footer.prototype, "content", void 0);
Footer = tslib_1.__decorate([
    Component({
        name: 'Footer'
    })
], Footer);
export default Footer;
//# sourceMappingURL=footer.jsx.map