import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import RcCheckbox from '../../../ant/vc-checkbox';
let Radio = class Radio extends Vue {
    constructor() {
        super(...arguments);
        this.checked = this.value || false;
    }
    onClick() {
        this.checked = !this.checked;
        this.$emit('change', this.checked);
    }
    render() {
        const restProps = tslib_1.__rest(this.$props, []);
        const { prefixCls } = restProps;
        const wrapCls = classnames(`${prefixCls}-wrapper`);
        if ('class' in restProps) {
            // Todo https://github.com/developit/preact-compat/issues/422
            /* tslint:disable:no-string-literal */
            delete restProps['class'];
        }
        const mark = (<label class={wrapCls} onClick={this.onClick}>
        <RcCheckbox props={this.$props} checked={this.value} type={'radio'}/>
        {this.$slots.default}
      </label>);
        if (this.wrapLabel) {
            return mark;
        }
        return <RcCheckbox type={'radio'} checked={this.value} props={this.$props}>{this.$slots.default}</RcCheckbox>;
    }
};
tslib_1.__decorate([
    Prop({ type: String, default: 'am-radio' })
], Radio.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Radio.prototype, "listPrefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Radio.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Radio.prototype, "name", void 0);
tslib_1.__decorate([
    Prop({ default: true })
], Radio.prototype, "wrapLabel", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Radio.prototype, "value", void 0);
Radio = tslib_1.__decorate([
    Component({
        name: 'MRadio'
    })
], Radio);
export default Radio;
//# sourceMappingURL=radio.jsx.map