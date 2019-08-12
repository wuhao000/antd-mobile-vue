import * as tslib_1 from "tslib";
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import OptionsBasedComponent from '../../../mixins/options-based-component';
import List from '../../list';
import RadioItem from './radio-item';
let MRadioList = class MRadioList extends OptionsBasedComponent {
    constructor() {
        super(...arguments);
        this.stateValue = this.value !== undefined ? this.value : null;
    }
    valueChanged(value) {
        this.stateValue = value;
    }
    mounted() {
        if (this.maxHeightPercentage) {
            const windowHeight = document.body.clientHeight;
            const maxHeight = this.maxHeightPercentage;
            if (this.$el.clientHeight > windowHeight * maxHeight) {
                this.$el.style.height = windowHeight * maxHeight + 'px';
            }
        }
    }
    render() {
        // @ts-ignore
        return <List title={this.title}>
      {this.renderOptions()}
    </List>;
    }
    renderOptions() {
        const options = this.getOptions();
        if (options) {
            return options.map(option => {
                // @ts-ignore
                return <RadioItem value={this.stateValue === option.value} onChange={(checkState) => {
                    this.onChange(checkState, option.value);
                }}>{option.label}</RadioItem>;
            });
        }
        else {
        }
    }
    onChange(checkState, value) {
        if (checkState) {
            this.stateValue = value;
        }
        this.$emit('input', value);
        this.$emit('change', value);
    }
};
tslib_1.__decorate([
    Prop({})
], MRadioList.prototype, "value", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], MRadioList.prototype, "title", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], MRadioList.prototype, "maxHeightPercentage", void 0);
tslib_1.__decorate([
    Watch('value')
], MRadioList.prototype, "valueChanged", null);
MRadioList = tslib_1.__decorate([
    Component({
        name: 'MRadioList'
    })
], MRadioList);
export default MRadioList;
//# sourceMappingURL=radio-list.jsx.map