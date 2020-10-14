import { __decorate } from "tslib";
import classnames from 'classnames';
import { Options, Vue } from 'vue-class-component';
let WhiteSpace = class WhiteSpace extends Vue {
    render() {
        const wrapCls = classnames(this.prefixCls, `${this.prefixCls}-${this.size}`);
        return <div class={wrapCls} onClick={(e) => {
            this.$emit('click', e);
        }}/>;
    }
};
WhiteSpace = __decorate([
    Options({
        name: 'WhiteSpace',
        props: {
            size: { type: String, default: 'md' },
            prefixCls: { type: String, default: 'am-whitespace' }
        }
    })
], WhiteSpace);
export default WhiteSpace;
//# sourceMappingURL=index.jsx.map