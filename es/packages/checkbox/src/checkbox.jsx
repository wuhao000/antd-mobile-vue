import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import RcCheckbox from '../../../ant/vc-checkbox';
import AgreeItem from './agree-item';
import CheckboxItem from './checkbox-item';
let Checkbox = class Checkbox extends Vue {
    constructor() {
        super(...arguments);
        this.checked = this.value || false;
    }
    onClick(e) {
        // e.stopPropagation();
        // e.preventDefault();
        this.checked = !this.checked;
        this.$emit('change', this.checked);
        this.$emit('input', this.checked);
    }
    valueChanged(value) {
        this.checked = value;
    }
    checkedChanged(checked) {
        this.$emit('input', checked);
    }
    render() {
        const { prefixCls } = this;
        const wrapCls = classnames(`${prefixCls}-wrapper`);
        const mark = (<label class={wrapCls}>
        <RcCheckbox onClick={this.onClick} checked={this.value} props={this.$props}/>
        {this.$slots.default}
      </label>);
        if (this.wrapLabel) {
            return mark;
        }
        return <RcCheckbox onClick={this.onClick} checked={this.value} props={this.$props}>{this.$slots.default}</RcCheckbox>;
    }
};
Checkbox.CheckboxItem = CheckboxItem;
Checkbox.AgreeItem = AgreeItem;
tslib_1.__decorate([
    Prop({ default: 'am-checkbox' })
], Checkbox.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Checkbox.prototype, "name", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], Checkbox.prototype, "wrapLabel", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Checkbox.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Checkbox.prototype, "value", void 0);
tslib_1.__decorate([
    Watch('value')
], Checkbox.prototype, "valueChanged", null);
tslib_1.__decorate([
    Watch('checked')
], Checkbox.prototype, "checkedChanged", null);
Checkbox = tslib_1.__decorate([
    Component({
        name: 'MCheckbox'
    })
], Checkbox);
export default Checkbox;
//# sourceMappingURL=checkbox.jsx.map