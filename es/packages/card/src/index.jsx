import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Body from './body';
import Footer from './footer';
import Header from './header';
let Card = class Card extends Vue {
    render() {
        const { prefixCls, full } = this;
        const wrapCls = classnames(prefixCls, {
            [`${prefixCls}-full`]: full
        });
        return <div class={wrapCls}>{this.$slots.default}</div>;
    }
};
Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;
tslib_1.__decorate([
    Prop({ default: 'am-card' })
], Card.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Card.prototype, "full", void 0);
Card = tslib_1.__decorate([
    Component({
        name: 'Card'
    })
], Card);
export default Card;
//# sourceMappingURL=index.jsx.map