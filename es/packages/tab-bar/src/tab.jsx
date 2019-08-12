import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import IconRes from '../../../mixins/icon-res';
import Badge from '../../badge';
import { isVNode } from '../../utils/vnode';
let Tab = class Tab extends Vue {
    renderIcon() {
        const { dot, badge, selected, selectedIcon, icon, title, prefixCls } = this;
        const realIcon = selected ? selectedIcon : icon;
        const iconDom = realIcon ? (isVNode(realIcon) ? realIcon : <IconRes class={`${prefixCls}-image`} props={{
            type: realIcon
        }}/>) : null;
        if (badge) {
            return (<Badge text={badge} class={`${prefixCls}-badge tab-badge`}>
          {' '}
          {iconDom}{' '}
        </Badge>);
        }
        if (dot) {
            return (<Badge dot class={`${prefixCls}-badge tab-dot`}>
          {iconDom}
        </Badge>);
        }
        return iconDom;
    }
    onClick() {
        this.$emit('click');
    }
    render() {
        const { title, prefixCls, selected, unselectedTintColor, tintColor } = this;
        const iconColor = selected ? tintColor : unselectedTintColor;
        return (<div {...this.dataAttrs} onClick={this.onClick} class={`${prefixCls}`}>
        <div class={`${prefixCls}-icon`} style={{ color: iconColor }}>
          {this.renderIcon()}
        </div>
        <p class={`${prefixCls}-title`} style={{ color: selected ? tintColor : unselectedTintColor }}>
          {title}
        </p>
      </div>);
    }
};
tslib_1.__decorate([
    Prop({ type: Boolean })
], Tab.prototype, "dot", void 0);
tslib_1.__decorate([
    Prop({ type: [String, Number] })
], Tab.prototype, "badge", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], Tab.prototype, "selected", void 0);
tslib_1.__decorate([
    Prop()
], Tab.prototype, "selectedIcon", void 0);
tslib_1.__decorate([
    Prop()
], Tab.prototype, "icon", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Tab.prototype, "title", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'am-tab-item' })
], Tab.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Tab.prototype, "unselectedTintColor", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Tab.prototype, "tintColor", void 0);
tslib_1.__decorate([
    Prop()
], Tab.prototype, "dataAttrs", void 0);
Tab = tslib_1.__decorate([
    Component({
        name: 'Tab'
    })
], Tab);
export default Tab;
//# sourceMappingURL=tab.jsx.map