import * as tslib_1 from "tslib";
import arrayTreeFilter from 'array-tree-filter';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
import MultiPicker from '../vmc-picker/multi-picker';
import Picker from '../vmc-picker/picker';
let Cascader = class Cascader extends Vue {
    constructor() {
        super(...arguments);
        this.state = {
            value: this.getValue(this.data, this.defaultValue || this.value)
        };
    }
    onOk() {
        this.$emit('input', this.state.value);
        this.$emit('change', this.state.value);
    }
    onDismiss() {
        this.state.value = this.getValue(this.data, this.defaultValue || this.value);
        this.$emit('dismiss', this.state.value);
    }
    created() {
        if (this.store) {
            this.store.onOk = this.onOk;
            this.store.onDismiss = this.onDismiss;
        }
    }
    onScrollChange() {
        this.$emit('scroll-change');
    }
    beforeUpdate() {
        if (this.value !== undefined) {
            this.value = this.getValue(this.data, this.value);
        }
    }
    onValueChange(value, index) {
        const children = arrayTreeFilter(this.data, (c, level) => {
            return level <= index && c.value === value[level];
        });
        let data = children[index];
        let i;
        for (i = index + 1; data && data.children && data.children.length && i < this.cols; i++) {
            data = data.children[0];
            value[i] = data.value;
        }
        value.length = i;
        this.state.value = value;
        this.$emit('change', value, index);
    }
    getValue(d, val) {
        let data = d || this.data;
        let value = val || this.value || this.defaultValue;
        if (!value || !value.length || value.indexOf(undefined) > -1) {
            value = [];
            for (let i = 0; i < this.cols; i++) {
                if (data && data.length) {
                    value[i] = data[0].value;
                    data = data[0].children;
                }
            }
        }
        return value;
    }
    getCols() {
        const { data, cols, pickerPrefixCls, disabled, pickerItemStyle, indicatorStyle } = this;
        const value = this.state.value;
        const childrenTree = arrayTreeFilter(data, (c, level) => {
            return c.value === value[level];
        }).map(c => c.children);
        // in case the users data is async get when select change
        const needPad = cols - childrenTree.length;
        if (needPad > 0) {
            for (let i = 0; i < needPad; i++) {
                childrenTree.push([]);
            }
        }
        childrenTree.length = cols - 1;
        childrenTree.unshift(data);
        return childrenTree.map((children = [], level) => (
        // @ts-ignore
        <Picker key={level} prefixCls={pickerPrefixCls} style={{ flex: 1 }} disabled={disabled} itemStyle={pickerItemStyle} indicatorStyle={indicatorStyle}>
          {children.map(item => {
            // @ts-ignore
            return <Picker.Item value={item.value} label={item.label} key={item.value}/>;
        })}
        </Picker>));
    }
    render() {
        const props = this.$props;
        const { prefixCls } = props;
        const cols = this.getCols();
        const multiStyle = {
            flexDirection: 'row',
            alignItems: 'center'
        };
        return (
        // @ts-ignore
        <MultiPicker style={multiStyle} prefixCls={prefixCls} selectedValue={this.state.value} onValueChange={this.onValueChange} onInput={this.onValueChange} onScrollChange={this.onScrollChange}>
          {cols}
        </MultiPicker>);
    }
};
tslib_1.__decorate([
    Prop()
], Cascader.prototype, "defaultValue", void 0);
tslib_1.__decorate([
    Prop()
], Cascader.prototype, "value", void 0);
tslib_1.__decorate([
    Prop({
        default: () => {
            return [];
        }
    })
], Cascader.prototype, "data", void 0);
tslib_1.__decorate([
    Prop({ default: 3 })
], Cascader.prototype, "cols", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Cascader.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop()
], Cascader.prototype, "pickerItemStyle", void 0);
tslib_1.__decorate([
    Prop()
], Cascader.prototype, "indicatorStyle", void 0);
tslib_1.__decorate([
    Prop({ default: 'rmc-cascader' })
], Cascader.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ default: 'rmc-picker' })
], Cascader.prototype, "pickerPrefixCls", void 0);
tslib_1.__decorate([
    Inject({ from: 'store', default: undefined })
], Cascader.prototype, "store", void 0);
Cascader = tslib_1.__decorate([
    Component({
        name: 'Cascader'
    })
], Cascader);
export default Cascader;
//# sourceMappingURL=cascader.jsx.map