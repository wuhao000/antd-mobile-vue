import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import TouchFeedback from '../../vmc-feedback';
let SegmentedControl = class SegmentedControl extends Vue {
    constructor() {
        super(...arguments);
        this.state = {
            selectedIndex: this.value
        };
    }
    selectedIndexChanged(value) {
        this.state.selectedIndex = value;
    }
    onClick(e, index, value) {
        const { disabled } = this;
        if (!disabled && this.state.selectedIndex !== index) {
            // just do a mock so that the api to be the same as react-native
            e.nativeEvent = e.nativeEvent ? e.nativeEvent : {};
            e.nativeEvent.selectedSegmentIndex = index;
            e.nativeEvent.value = value;
            this.state.selectedIndex = index;
            this.$emit('input', index);
            this.$emit('change', index);
        }
    }
    renderSegmentItem(idx, value, selected) {
        const { prefixCls, disabled, tintColor } = this;
        const itemCls = classnames(`${prefixCls}-item`, {
            [`${prefixCls}-item-selected`]: selected
        });
        const itemStyle = {
            color: selected ? '#fff' : tintColor,
            backgroundColor: selected ? tintColor : 'transparent',
            borderColor: tintColor
        };
        const activeInnerStyle = tintColor
            ? {
                backgroundColor: tintColor
            }
            : {};
        return (<TouchFeedback key={idx} disabled={disabled} activeClassName={`${prefixCls}-item-active`}>
          <div class={itemCls} style={itemStyle} role="tab" aria-selected={selected && !disabled} aria-disabled={disabled} onClick={disabled ? undefined : e => this.onClick(e, idx, value)}>
            <div class={`${prefixCls}-item-inner`} style={activeInnerStyle}/>
            {value}
          </div>
        </TouchFeedback>);
    }
    render() {
        const { prefixCls, disabled, values = [] } = this;
        const wrapCls = classnames(prefixCls, {
            [`${prefixCls}-disabled`]: disabled
        });
        return (<div class={wrapCls} role="tablist">
          {values.map((value, idx) => 
        // tslint:disable-next-line:jsx-no-multiline-js
        this.renderSegmentItem(idx, value, idx === this.state.selectedIndex))}
        </div>);
    }
};
tslib_1.__decorate([
    Prop({
        type: String,
        default: 'am-segment'
    })
], SegmentedControl.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({
        type: String,
        default: ''
    })
], SegmentedControl.prototype, "tintColor", void 0);
tslib_1.__decorate([
    Prop({
        type: Boolean,
        default: false
    })
], SegmentedControl.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop({
        type: Number,
        default: 0
    })
], SegmentedControl.prototype, "value", void 0);
tslib_1.__decorate([
    Prop({
        default: () => {
            return [];
        }
    })
], SegmentedControl.prototype, "values", void 0);
tslib_1.__decorate([
    Watch('value')
], SegmentedControl.prototype, "selectedIndexChanged", null);
SegmentedControl = tslib_1.__decorate([
    Component({
        name: 'SegmentedControl'
    })
], SegmentedControl);
export default SegmentedControl;
//# sourceMappingURL=index.jsx.map