import * as tslib_1 from "tslib";
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { cloneElement, setListeners, setProps } from '../utils/vnode';
import { PopupPickerProps } from './popup-picker-types';
export default function PopupMixin(getModal, newProps) {
    let PopupMixin = class PopupMixin extends PopupPickerProps {
        constructor() {
            super(...arguments);
            this.state = {
                pickerValue: 'value' in this ? this.value : null,
                visible: this.visible || false
            };
        }
        stateVisibleChanged() {
            this.$emit('visible-change', this.state.visible);
        }
        valueChanged(value) {
            this.state.pickerValue = value;
        }
        visibleChanged(value) {
            this.setVisibleState(value);
        }
        onPickerChange(pickerValue) {
            if (this.state.pickerValue !== pickerValue) {
                this.state.pickerValue = pickerValue;
                const { picker, pickerValueChangeProp } = this;
                if (picker && picker.props[pickerValueChangeProp]) {
                    picker.props[pickerValueChangeProp](pickerValue);
                }
            }
        }
        saveRef(picker) {
            this.picker = picker;
        }
        setVisibleState(visible) {
            this.state.visible = visible;
            if (!visible) {
                this.state.pickerValue = null;
            }
        }
        fireVisibleChange(visible) {
            if (this.state.visible !== visible) {
                this.setVisibleState(visible);
                this.$emit('visible-change', visible);
                this.$emit('update:visible', visible);
            }
        }
        onTriggerClick(e) {
            const child = this.$slots.default;
            const childProps = child.props || {};
            if (childProps[this.triggerType]) {
                childProps[this.triggerType](e);
            }
            this.fireVisibleChange(!this.state.visible);
        }
        onOk() {
            this.$emit('ok');
            this.fireVisibleChange(false);
        }
        getContent() {
            if (this.$slots.picker) {
                const picker = this.$slots.picker[0];
                let { pickerValue } = this.state;
                if (pickerValue === null) {
                    pickerValue = this.value;
                }
                setProps(this.picker, ({
                    [this.pickerValueProp]: pickerValue,
                    [this.pickerValueChangeProp]: this.onPickerChange
                }));
                picker.data.ref = 'picker';
                return picker;
            }
            if (this.picker) {
                let { pickerValue } = this.state;
                if (pickerValue === null) {
                    pickerValue = this.value;
                }
                return cloneElement(this.picker, ({
                    [this.pickerValueProp]: pickerValue,
                    [this.pickerValueChangeProp]: this.onPickerChange,
                    ref: this.saveRef
                }));
            }
            else {
                return this.content;
            }
        }
        onDismiss() {
            this.fireVisibleChange(false);
            this.$emit('dismiss');
        }
        hide() {
            this.fireVisibleChange(false);
            this.$emit('hide');
        }
        render() {
            const props = this.$props;
            const children = this.$slots.default;
            if (!children) {
                return getModal(this.$createElement, props, this.state.visible, {
                    getContent: this.getContent,
                    onOk: this.onOk,
                    hide: this.hide,
                    onDismiss: this.onDismiss
                });
            }
            const { disabled } = this.$props;
            if (!disabled) {
                children.forEach((child) => {
                    setListeners(child, {
                        [this.triggerType]: this.onTriggerClick
                    });
                });
            }
            const modal = getModal(this.$createElement, props, this.state.visible, {
                getContent: this.getContent,
                onOk: this.onOk,
                hide: this.hide,
                onDismiss: this.onDismiss
            });
            return (<div style={props.wrapStyle}>
            {children}
            {modal}
          </div>);
        }
    };
    tslib_1.__decorate([
        Watch('state.visible')
    ], PopupMixin.prototype, "stateVisibleChanged", null);
    tslib_1.__decorate([
        Watch('value')
    ], PopupMixin.prototype, "valueChanged", null);
    tslib_1.__decorate([
        Watch('visible')
    ], PopupMixin.prototype, "visibleChanged", null);
    PopupMixin = tslib_1.__decorate([
        Component({ name: 'PopupMixin' })
    ], PopupMixin);
    return PopupMixin;
}
//# sourceMappingURL=popup-mixin.jsx.map