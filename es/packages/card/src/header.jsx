import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let Header = class Header extends Vue {
    render() {
        const { prefixCls, thumb, thumbStyle, extra, title, } = this;
        const wrapCls = `${prefixCls}-header`;
        return (<div class={wrapCls}>
        <div class={`${prefixCls}-header-content`}>
          {this.$slots.thumb ? (this.$slots.thumb) : (this.thumb ? <img style={thumbStyle} src={thumb}/> : null)}
          {this.$slots.default ? this.$slots.default : title}
        </div>
        {(this.$slots.extra || extra) ? (
        // tslint:disable-next-line:jsx-no-multiline-js
        <div class={`${prefixCls}-header-extra`}>{this.$slots.extra ? this.$slots.extra : extra}</div>) : null}
      </div>);
    }
};
tslib_1.__decorate([
    Prop({ default: 'am-card' })
], Header.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({
        default: () => {
            return {};
        }
    })
], Header.prototype, "thumbStyle", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Header.prototype, "thumb", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Header.prototype, "extra", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Header.prototype, "title", void 0);
Header = tslib_1.__decorate([
    Component({
        name: 'Header'
    })
], Header);
export default Header;
//# sourceMappingURL=header.jsx.map