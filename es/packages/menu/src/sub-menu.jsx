import * as tslib_1 from "tslib";
/* tslint:disable:jsx-no-multiline-js */
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Checkbox from '../../checkbox';
import List from '../../list';
import Radio from '../../radio';
let SubMenu = class SubMenu extends Vue {
    onClick(dataItem) {
        this.$emit('click', dataItem);
    }
    render() {
        const { subMenuPrefixCls, radioPrefixCls, subMenuData, showSelect, selItem, multiSelect } = this;
        const selected = (dataItem) => showSelect &&
            (selItem.length > 0 && selItem.indexOf(dataItem.value) !== -1);
        const ItemComponent = !multiSelect ? Radio : Checkbox;
        return (<List style={{ paddingTop: 0 }} class={subMenuPrefixCls}>
          {subMenuData.map((dataItem, idx) => (<List.Item class={classnames(`${radioPrefixCls}-item`, {
            [`${subMenuPrefixCls}-item-selected`]: selected(dataItem),
            [`${subMenuPrefixCls}-item-disabled`]: dataItem.disabled
        })} key={idx} extra={<ItemComponent value={selected(dataItem)} disabled={dataItem.disabled} onChange={() => this.onClick(dataItem)}/>}>
                {dataItem.label}
              </List.Item>))}
        </List>);
    }
};
tslib_1.__decorate([
    Prop({ type: String })
], SubMenu.prototype, "subMenuPrefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], SubMenu.prototype, "radioPrefixCls", void 0);
tslib_1.__decorate([
    Prop({})
], SubMenu.prototype, "subMenuData", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], SubMenu.prototype, "showSelect", void 0);
tslib_1.__decorate([
    Prop({})
], SubMenu.prototype, "onSel", void 0);
tslib_1.__decorate([
    Prop({})
], SubMenu.prototype, "selItem", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], SubMenu.prototype, "multiSelect", void 0);
SubMenu = tslib_1.__decorate([
    Component({
        name: 'SubMenu'
    })
], SubMenu);
export default SubMenu;
//# sourceMappingURL=sub-menu.jsx.map