import * as tslib_1 from "tslib";
import RcSlider from 'ant-design-vue/es/vc-slider/src/Slider';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let Slider = class Slider extends Vue {
    render() {
        return (<div class={`${this.prefixCls}-wrapper`}>
          <RcSlider props={this.$props} on={Object.assign({}, this.$listeners, { change: (value) => {
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
], Slider.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({})
], Slider.prototype, "marks", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], Slider.prototype, "dots", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], Slider.prototype, "included", void 0);
tslib_1.__decorate([
    Prop({})
], Slider.prototype, "maximumTrackStyle", void 0);
tslib_1.__decorate([
    Prop({})
], Slider.prototype, "minimumTrackStyle", void 0);
tslib_1.__decorate([
    Prop({})
], Slider.prototype, "handleStyle", void 0);
tslib_1.__decorate([
    Prop({})
], Slider.prototype, "trackStyle", void 0);
tslib_1.__decorate([
    Prop({})
], Slider.prototype, "railStyle", void 0);
tslib_1.__decorate([
    Prop({})
], Slider.prototype, "tipFormatter", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], Slider.prototype, "value", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], Slider.prototype, "min", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], Slider.prototype, "max", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], Slider.prototype, "step", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], Slider.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop({})
], Slider.prototype, "handle", void 0);
Slider = tslib_1.__decorate([
    Component({
        name: 'Slider'
    })
], Slider);
export default Slider;
//# sourceMappingURL=index.jsx.map