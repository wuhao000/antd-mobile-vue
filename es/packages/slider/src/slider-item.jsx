import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import List from '../../list';
import Slider from './index';
let SliderItem = class SliderItem extends Vue {
    render() {
        return (<List.Item title={this.title}>
          <Slider slot="extra" props={this.$props} on={Object.assign({}, this.$listeners, { change: (value) => {
                this.$emit('input', value);
                this.$emit('change', value);
            } })}/>
        </List.Item>);
    }
};
tslib_1.__decorate([
    Prop({
        type: String,
        default: 'am-slider'
    })
], SliderItem.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({})
], SliderItem.prototype, "marks", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], SliderItem.prototype, "dots", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], SliderItem.prototype, "included", void 0);
tslib_1.__decorate([
    Prop({})
], SliderItem.prototype, "maximumTrackStyle", void 0);
tslib_1.__decorate([
    Prop({})
], SliderItem.prototype, "minimumTrackStyle", void 0);
tslib_1.__decorate([
    Prop({})
], SliderItem.prototype, "handleStyle", void 0);
tslib_1.__decorate([
    Prop({})
], SliderItem.prototype, "trackStyle", void 0);
tslib_1.__decorate([
    Prop({})
], SliderItem.prototype, "railStyle", void 0);
tslib_1.__decorate([
    Prop({})
], SliderItem.prototype, "tipFormatter", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], SliderItem.prototype, "value", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], SliderItem.prototype, "min", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], SliderItem.prototype, "max", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], SliderItem.prototype, "step", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], SliderItem.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop({})
], SliderItem.prototype, "handle", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], SliderItem.prototype, "title", void 0);
SliderItem = tslib_1.__decorate([
    Component({
        name: 'SliderItem'
    })
], SliderItem);
export default SliderItem;
//# sourceMappingURL=slider-item.jsx.map