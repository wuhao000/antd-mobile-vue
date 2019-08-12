import * as tslib_1 from "tslib";
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import OptionsBasedComponent from '../../../mixins/options-based-component';
import List from '../../list';
import CheckboxItem from './checkbox-item';
let MCheckboxList = class MCheckboxList extends OptionsBasedComponent {
    constructor() {
        super(...arguments);
        this.stateValue = this.value || [];
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
        return options.map(option => {
            return <CheckboxItem value={this.stateValue.includes(option.value)} disabled={option.disabled} on={{
                change: (checkState) => {
                    this.onChange(checkState, option.value);
                }
            }}>{option.label}</CheckboxItem>;
        });
    }
    onChange(checkState, value) {
        if (checkState) {
            if (this.$props.value) {
                if (!this.$props.value.includes(value)) {
                    const array = [].concat(this.$props.value);
                    array.push(value);
                    this.$emit('input', array);
                    this.$emit('change', array);
                }
            }
            else {
                if (!this.stateValue.includes(value)) {
                    this.stateValue.push(value);
                }
            }
        }
        else {
            if (this.$props.value) {
                if (this.$props.value.includes(value)) {
                    const array = [].concat(this.$props.value);
                    array.splice(array.indexOf(value), 1);
                    this.$emit('input', array);
                    this.$emit('change', array);
                }
            }
            else {
                if (this.stateValue.includes(value)) {
                    this.stateValue.splice(this.stateValue.indexOf(value), 1);
                }
            }
        }
    }
};
tslib_1.__decorate([
    Prop({ type: Array })
], MCheckboxList.prototype, "value", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], MCheckboxList.prototype, "title", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], MCheckboxList.prototype, "maxHeightPercentage", void 0);
MCheckboxList = tslib_1.__decorate([
    Component({
        name: 'MCheckboxList'
    })
], MCheckboxList);
export default MCheckboxList;
//# sourceMappingURL=checkbox-list.jsx.map