import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let WingBlank = class WingBlank extends Vue {
    render() {
        const { prefixCls, size } = this;
        const wrapCls = classnames(prefixCls, `${prefixCls}-${size}`);
        return (<div class={wrapCls}>
          {this.$slots.default}
        </div>);
    }
};
tslib_1.__decorate([
    Prop({
        type: String,
        default: 'am-wingblank'
    })
], WingBlank.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ default: 'lg' })
], WingBlank.prototype, "size", void 0);
WingBlank = tslib_1.__decorate([
    Component({
        name: 'WingBlank'
    })
], WingBlank);
export default WingBlank;
//# sourceMappingURL=index.jsx.map