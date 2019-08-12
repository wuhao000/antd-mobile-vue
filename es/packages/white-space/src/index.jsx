import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let WhiteSpace = class WhiteSpace extends Vue {
    render() {
        const wrapCls = classnames(this.prefixCls, `${this.prefixCls}-${this.size}`);
        return <div class={wrapCls} onClick={(e) => {
            this.$emit('click', e);
        }}/>;
    }
};
tslib_1.__decorate([
    Prop({ type: String, default: 'md' })
], WhiteSpace.prototype, "size", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'am-whitespace' })
], WhiteSpace.prototype, "prefixCls", void 0);
WhiteSpace = tslib_1.__decorate([
    Component({
        name: 'WhiteSpace'
    })
], WhiteSpace);
export default WhiteSpace;
//# sourceMappingURL=index.jsx.map