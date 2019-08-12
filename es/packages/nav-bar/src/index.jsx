import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Icon from '../../icon';
let NavBar = class NavBar extends Vue {
    render() {
        const { prefixCls, className, mode, icon } = this;
        const rightContent = this.$slots.rightContent || this.$slots['right-content'] || this.rightContent;
        const leftContent = this.$slots.leftContent || this.$slots['left-content'] || this.leftContent;
        return (<div class={classnames(className, prefixCls, `${prefixCls}-${mode}`)}>
          <div class={`${prefixCls}-left`} role="button" onClick={(e) => {
            this.$emit('left-click', e);
            this.$emit('leftClick', e);
        }}>
            {icon ? (<span class={`${prefixCls}-left-icon`} aria-hidden="true">
                  {typeof icon === 'string' ? <Icon type={icon}/> : icon}
                </span>) : this.$slots.icon}
            {leftContent}
          </div>
          <div class={`${prefixCls}-title`}>{this.$slots.default}</div>
          <div class={`${prefixCls}-right`}>{rightContent}</div>
        </div>);
    }
};
tslib_1.__decorate([
    Prop({
        type: String,
        default: 'am-navbar'
    })
], NavBar.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], NavBar.prototype, "className", void 0);
tslib_1.__decorate([
    Prop({ default: 'dark' })
], NavBar.prototype, "mode", void 0);
tslib_1.__decorate([
    Prop({})
], NavBar.prototype, "icon", void 0);
tslib_1.__decorate([
    Prop({})
], NavBar.prototype, "leftContent", void 0);
tslib_1.__decorate([
    Prop({})
], NavBar.prototype, "rightContent", void 0);
NavBar = tslib_1.__decorate([
    Component({
        name: 'NavBar'
    })
], NavBar);
export default NavBar;
//# sourceMappingURL=index.jsx.map