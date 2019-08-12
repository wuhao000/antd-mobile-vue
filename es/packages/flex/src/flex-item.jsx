import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let FlexItem = class FlexItem extends Vue {
    render() {
        const _a = this, { prefixCls } = _a, restProps = tslib_1.__rest(_a, ["prefixCls"]);
        const wrapCls = classnames(`${prefixCls}-item`);
        return (<div class={wrapCls} {...{ props: restProps }}>
          {this.$slots.default}
        </div>);
    }
};
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], FlexItem.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'am-flexbox' })
], FlexItem.prototype, "prefixCls", void 0);
FlexItem = tslib_1.__decorate([
    Component({
        name: 'FlexItem'
    })
], FlexItem);
export default FlexItem;
//# sourceMappingURL=flex-item.jsx.map