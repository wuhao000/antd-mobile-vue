import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import List from '../../list';
import Checkbox from './checkbox';
const ListItem = List.Item;
let CheckboxItem = class CheckboxItem extends Vue {
    constructor() {
        super(...arguments);
        this.state = {
            value: this.value
        };
    }
    valueCahnged(value) {
        this.state.value = value;
    }
    stateValueChanged(value) {
        this.$emit('input', value);
        this.$emit('change', value);
    }
    onChange(value) {
    }
    onClick(e) {
        if (!this.disabled) {
            this.state.value = !this.state.value;
        }
    }
    render() {
        const _a = this.$props, { listPrefixCls, disabled, checkboxProps } = _a, restProps = tslib_1.__rest(_a, ["listPrefixCls", "disabled", "checkboxProps"]);
        const { prefixCls } = restProps;
        const wrapCls = classnames(`${prefixCls}-item`, {
            [`${prefixCls}-item-disabled`]: disabled === true
        });
        const extraProps = {};
        ['name', 'defaultChecked', 'checked', 'onChange', 'disabled'].forEach(i => {
            if (i in this.$props) {
                extraProps[i] = this.$props[i];
            }
        });
        // @ts-ignore
        const thumb = <Checkbox attrs={Object.assign({}, checkboxProps, extraProps, { value: this.state.value })} style={this.thumbStyle} onChange={this.onChange}/>;
        return (
        // @ts-ignore
        <ListItem attrs={Object.assign({}, restProps)} touchFeedback={!this.disabled} onClick={this.onClick} prefixCls={listPrefixCls} class={wrapCls} thumb={thumb}>
        {this.$slots.default}
      </ListItem>);
    }
};
tslib_1.__decorate([
    Prop({ type: Object, default: () => ({}) })
], CheckboxItem.prototype, "thumbStyle", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'am-list' })
], CheckboxItem.prototype, "listPrefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'am-checkbox' })
], CheckboxItem.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], CheckboxItem.prototype, "name", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], CheckboxItem.prototype, "wrapLabel", void 0);
tslib_1.__decorate([
    Prop({
        type: Object,
        default: () => {
            return {};
        }
    })
], CheckboxItem.prototype, "checkboxProps", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], CheckboxItem.prototype, "extra", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], CheckboxItem.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], CheckboxItem.prototype, "value", void 0);
tslib_1.__decorate([
    Watch('value')
], CheckboxItem.prototype, "valueCahnged", null);
tslib_1.__decorate([
    Watch('state.value')
], CheckboxItem.prototype, "stateValueChanged", null);
CheckboxItem = tslib_1.__decorate([
    Component({
        name: 'MCheckboxItem'
    })
], CheckboxItem);
export default CheckboxItem;
//# sourceMappingURL=checkbox-item.jsx.map