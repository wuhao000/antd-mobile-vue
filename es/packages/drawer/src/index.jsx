import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import RmcDrawer from '../../vmc-drawer';
let Drawer = class Drawer extends Vue {
    render() {
        // @ts-ignore
        return <RmcDrawer attrs={Object.assign({}, this.$props, this.$attrs, { sidebar: this.$slots.sidebar || this.sidebar })} open={this.value} on={Object.assign({}, this.$listeners, { open: (value) => {
                this.$emit('input', value);
                this.$emit('open', value);
            } })}>
      {this.$slots.default}
    </RmcDrawer>;
    }
};
tslib_1.__decorate([
    Prop({ type: Object })
], Drawer.prototype, "sidebarStyle", void 0);
tslib_1.__decorate([
    Prop({ type: Object })
], Drawer.prototype, "contentStyle", void 0);
tslib_1.__decorate([
    Prop({ type: Object })
], Drawer.prototype, "overlayStyle", void 0);
tslib_1.__decorate([
    Prop({ type: Object })
], Drawer.prototype, "dragHandleStyle", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], Drawer.prototype, "docked", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], Drawer.prototype, "transitions", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], Drawer.prototype, "touch", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], Drawer.prototype, "dragToggleDistance", void 0);
tslib_1.__decorate([
    Prop({
        type: String,
        default: 'am-drawer'
    })
], Drawer.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({})
], Drawer.prototype, "sidebar", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], Drawer.prototype, "value", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'left' })
], Drawer.prototype, "position", void 0);
Drawer = tslib_1.__decorate([
    Component({
        name: 'Drawer'
    })
], Drawer);
export default Drawer;
//# sourceMappingURL=index.jsx.map