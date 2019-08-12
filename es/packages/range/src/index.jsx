import * as tslib_1 from "tslib";
import RcRange from 'ant-design-vue/lib/vc-slider/src/Range';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let Range = class Range extends Vue {
    render() {
        return (<div class={`${this.prefixCls}-wrapper`}>
          <RcRange props={this.$props} on={Object.assign({}, this.$listeners, { change: (value) => {
                this.$emit('input', value);
                this.$emit('change', value);
            } })}/>
        </div>);
    }
};
tslib_1.__decorate([
    Prop({
        type: String,
        default: 'am-slider'
    })
], Range.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({})
], Range.prototype, "handleStyle", void 0);
tslib_1.__decorate([
    Prop({})
], Range.prototype, "trackStyle", void 0);
tslib_1.__decorate([
    Prop({})
], Range.prototype, "railStyle", void 0);
tslib_1.__decorate([
    Prop({})
], Range.prototype, "onChange", void 0);
tslib_1.__decorate([
    Prop({})
], Range.prototype, "onAfterChange", void 0);
tslib_1.__decorate([
    Prop({})
], Range.prototype, "tipFormatter", void 0);
tslib_1.__decorate([
    Prop({ type: Array })
], Range.prototype, "value", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], Range.prototype, "min", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], Range.prototype, "max", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], Range.prototype, "step", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], Range.prototype, "disabled", void 0);
Range = tslib_1.__decorate([
    Component({
        name: 'Range'
    })
], Range);
export default Range;
//# sourceMappingURL=index.jsx.map