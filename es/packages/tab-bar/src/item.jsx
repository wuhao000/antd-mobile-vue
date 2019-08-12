import * as tslib_1 from "tslib";
import Tab from './tab';
import getDataAttr from '../../utils/get-data-attr';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
let Item = class Item extends Vue {
    constructor() {
        super(...arguments);
        this.index = -1;
    }
    get sSelected() {
        return this.selected !== undefined ? this.selected : (this.index === this.store.currentTab);
    }
    mounted() {
        const tabs = this.$parent.$children.filter(it => it.$vnode.componentOptions.tag === this.$vnode.componentOptions.tag);
        this.index = tabs.findIndex(it => it['_uid'] === this['_uid']);
    }
    render() {
        const { tintColor, unselectedTintColor } = this.tabBar;
        const icon = this.$slots.icon ? this.$slots.icon[0] : this.icon;
        const selectedIcon = this.$slots.selectedIcon ? this.$slots.selectedIcon : (this.selectedIcon || icon);
        const props = Object.assign({}, this.$props, { prefixCls: `${this.prefixCls}-tab`, tintColor,
            unselectedTintColor,
            icon,
            selectedIcon, selected: this.sSelected });
        return (<Tab props={props} onClick={(e) => {
            this.tabBar.setCurrentTab(this.index);
            this.$emit('click');
        }} dataAttrs={getDataAttr(this.$props)}>
        {this.$slots.default}
      </Tab>);
    }
};
tslib_1.__decorate([
    Prop({ type: [String, Number] })
], Item.prototype, "badge", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: undefined })
], Item.prototype, "selected", void 0);
tslib_1.__decorate([
    Prop({ type: [String, Object] })
], Item.prototype, "icon", void 0);
tslib_1.__decorate([
    Prop({ type: [String, Object] })
], Item.prototype, "selectedIcon", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: '' })
], Item.prototype, "title", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], Item.prototype, "dot", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'am-tab-bar' })
], Item.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Inject('store')
], Item.prototype, "store", void 0);
tslib_1.__decorate([
    Inject('tabBar')
], Item.prototype, "tabBar", void 0);
Item = tslib_1.__decorate([
    Component({
        name: 'Item'
    })
], Item);
export default Item;
//# sourceMappingURL=item.jsx.map