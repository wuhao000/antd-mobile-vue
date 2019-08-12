import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let Body = class Body extends Vue {
    render() {
        const { prefixCls } = this;
        const wrapCls = classnames(`${prefixCls}-body`);
        return <div class={wrapCls}>{this.$slots.default}</div>;
    }
};
tslib_1.__decorate([
    Prop({ default: 'am-card' })
], Body.prototype, "prefixCls", void 0);
Body = tslib_1.__decorate([
    Component({
        name: 'Body'
    })
], Body);
export default Body;
//# sourceMappingURL=body.jsx.map