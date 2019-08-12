import * as tslib_1 from "tslib";
/* tslint:disable:jsx-no-multiline-js */
import treeFilter from 'array-tree-filter';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Provide } from 'vue-property-decorator';
import { setProps } from '../../utils/vnode';
import RMCCascader from '../../vmc-cascader/cascader';
import RMCPopupCascader from '../../vmc-cascader/popup';
import RMCMultiPicker from '../../vmc-picker/multi-picker';
import RMCPicker from '../../vmc-picker/picker';
let Picker = class Picker extends Vue {
    constructor() {
        super(...arguments);
        this.store = {
            onOk: null
        };
    }
    getSel() {
        const value = this.value || [];
        let treeChildren;
        const data = this.data;
        if (this.cascade) {
            treeChildren = treeFilter(data, (c, level) => {
                return c.value === value[level];
            });
        }
        else {
            treeChildren = value.map((v, i) => {
                return data[i].filter(d => d.value === v)[0];
            });
        }
        const extra = (this.format &&
            this.format(treeChildren.map(v => {
                return v.label;
            })));
        if (Array.isArray(extra)) {
            return extra[0];
        }
        return extra;
    }
    getPickerCol() {
        const { data, pickerPrefixCls, itemStyle, indicatorStyle } = this;
        return data.map((col, index) => {
            return (
            // @ts-ignore
            <RMCPicker key={index} prefixCls={pickerPrefixCls} style={{ flex: 1 }} itemStyle={itemStyle} indicatorStyle={indicatorStyle}>
            {col.map(item => {
                return (
                // @ts-ignore
                <RMCPicker.Item key={item.value} value={item.value}>{item.label}</RMCPicker.Item>);
            })}
          </RMCPicker>);
        });
    }
    onOk(v) {
        let value = v;
        if (this.scrollValue !== undefined) {
            value = this.scrollValue;
        }
        if (this.onChange) {
            this.onChange(value);
        }
        this.$emit('ok', value);
    }
    setScrollValue(v) {
        this.scrollValue = v;
    }
    setCasecadeScrollValue(v) {
        // 级联情况下保证数据正确性，滚动过程中只有当最后一级变化时才变更数据
        if (v && this.scrollValue) {
            const length = this.scrollValue.length;
            if (length === v.length &&
                this.scrollValue[length - 1] === v[length - 1]) {
                return;
            }
        }
        this.setScrollValue(v);
    }
    fixOnOk(cascader) {
        if (cascader && cascader.onOk !== this.onOk.bind(this)) {
            cascader.onOk = this.onOk.bind(this);
            cascader.forceUpdate();
        }
    }
    onPickerChange(v, i) {
        this.setScrollValue(v);
        this.$emit('picker-change', v, i);
    }
    onVisibleChange(visible) {
        this.setScrollValue(undefined);
        this.$emit('visible-change', visible);
    }
    render() {
        const _a = this.$props, { value = [], popupPrefixCls, itemStyle, indicatorStyle, okText, dismissText, extra, cascade, prefixCls, pickerPrefixCls, data, cols, onOk } = _a, restProps = tslib_1.__rest(_a, ["value", "popupPrefixCls", "itemStyle", "indicatorStyle", "okText", "dismissText", "extra", "cascade", "prefixCls", "pickerPrefixCls", "data", "cols", "onOk"]);
        let cascader;
        let popupMoreProps = {};
        if (cascade) {
            cascader = (
            // @ts-ignore
            <RMCCascader slot={'cascader'} prefixCls={prefixCls} ref={'fffffs'} pickerPrefixCls={pickerPrefixCls} data={data} cols={cols} onInput={(v) => {
                this.onInput(v);
            }} onChange={this.onPickerChange} onScrollChange={this.setCasecadeScrollValue} pickerItemStyle={itemStyle} indicatorStyle={indicatorStyle}>{this.$slots.default}</RMCCascader>);
        }
        else {
            cascader = (
            // @ts-ignore
            <RMCMultiPicker slot={'cascader'} style={{ flexDirection: 'row', alignItems: 'center' }} prefixCls={prefixCls} onInput={(v) => {
                this.onInput(v);
            }} onScrollChange={this.setScrollValue}>
            {this.getPickerCol()}
          </RMCMultiPicker>);
            popupMoreProps = {
                pickerValueProp: 'selectedValue',
                pickerValueChangeProp: 'onValueChange'
            };
        }
        const props = Object.assign({}, this.popupProps, { cascader }, restProps, { prefixCls: popupPrefixCls, value,
            dismissText,
            okText }, popupMoreProps);
        const childExtra = this.getSel() || extra || this.getPlaceholder();
        return (
        // @ts-ignore
        <RMCPopupCascader attrs={props}>
          {cascader}
          {this.$slots.default && this.$slots.default.map(child => {
            setProps(child, {
                extra: childExtra,
                arrow: 'horizontal'
            });
            return child;
        })}
        </RMCPopupCascader>);
    }
    onInput(v) {
        this.$emit('input', v);
    }
    getPlaceholder() {
        return this.placeholder || '';
    }
};
tslib_1.__decorate([
    Prop({ type: String, default: '' })
], Picker.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: '取消' })
], Picker.prototype, "dismissText", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: '确定' })
], Picker.prototype, "okText", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'am-picker' })
], Picker.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'click' })
], Picker.prototype, "triggerType", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'am-picker-col' })
], Picker.prototype, "pickerPrefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'am-picker-popup' })
], Picker.prototype, "popupPrefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: '' })
], Picker.prototype, "title", void 0);
tslib_1.__decorate([
    Prop()
], Picker.prototype, "data", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], Picker.prototype, "cascade", void 0);
tslib_1.__decorate([
    Prop()
], Picker.prototype, "value", void 0);
tslib_1.__decorate([
    Prop({
        type: Function, default: (values) => {
            // label is JSX.Element or other
            if (values.length > 0 && typeof values[0] !== 'string') {
                return values;
            }
            return values.join(',');
        }
    })
], Picker.prototype, "format", void 0);
tslib_1.__decorate([
    Prop({ type: Number, default: 3 })
], Picker.prototype, "cols", void 0);
tslib_1.__decorate([
    Prop()
], Picker.prototype, "extra", void 0);
tslib_1.__decorate([
    Prop()
], Picker.prototype, "onChange", void 0);
tslib_1.__decorate([
    Prop()
], Picker.prototype, "itemStyle", void 0);
tslib_1.__decorate([
    Prop()
], Picker.prototype, "indicatorStyle", void 0);
tslib_1.__decorate([
    Provide('store')
], Picker.prototype, "store", void 0);
Picker = tslib_1.__decorate([
    Component({
        name: 'Picker'
    })
], Picker);
export default Picker;
//# sourceMappingURL=index.jsx.map