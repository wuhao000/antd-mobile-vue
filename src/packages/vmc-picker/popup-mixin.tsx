import Component from 'vue-class-component';
import {Watch} from 'vue-property-decorator';
import {cloneElement, setListeners, setProps} from '../utils/vnode';
import {PopupPickerProps} from './popup-picker-types';

export default function PopupMixin(getModal, newProps) {
  @Component({name: 'PopupMixin'})
  class PopupMixin extends PopupPickerProps {
    public picker: any;
    public state = {
      pickerValue: 'value' in this ? this.value : null,
      visible: this.visible || false
    };

    @Watch('state.visible')
    public stateVisibleChanged() {
      this.$emit('visible-change', this.state.visible);
    }

    @Watch('value')
    public valueChanged(value) {
      this.state.pickerValue = value;
    }

    @Watch('visible')
    public visibleChanged(value: boolean) {
      this.setVisibleState(value);
    }

    public onPickerChange(pickerValue) {
      if (this.state.pickerValue !== pickerValue) {
        this.state.pickerValue = pickerValue;
        const {picker, pickerValueChangeProp} = this;
        if (picker && picker.props[pickerValueChangeProp!]) {
          picker.props[pickerValueChangeProp!](pickerValue);
        }
      }
    }

    public saveRef(picker) {
      this.picker = picker;
    }

    public setVisibleState(visible) {
      this.state.visible = visible;
      if (!visible) {
        this.state.pickerValue = null;
      }
    }

    public fireVisibleChange(visible) {
      if (this.state.visible !== visible) {
        this.setVisibleState(visible);
        this.$emit('visible-change', visible);
        this.$emit('update:visible', visible);
      }
    }

    public onTriggerClick(e) {
      const child: any = this.$slots.default;
      const childProps = child.props || {};
      if (childProps[this.triggerType!]) {
        childProps[this.triggerType!](e);
      }
      this.fireVisibleChange(!this.state.visible);
    }

    public onOk() {
      this.$emit('ok');
      this.fireVisibleChange(false);
    }

    public getContent() {
      if (this.$slots.picker) {
        const picker = this.$slots.picker[0];
        let {pickerValue} = this.state;
        if (pickerValue === null) {
          pickerValue = this.value;
        }
        setProps(this.picker, ({
          [this.pickerValueProp!]: pickerValue,
          [this.pickerValueChangeProp]: this.onPickerChange
        }));
        picker.data.ref = 'picker';
        return picker;
      }
      if (this.picker) {
        let {pickerValue} = this.state;
        if (pickerValue === null) {
          pickerValue = this.value;
        }
        return cloneElement(this.picker, ({
          [this.pickerValueProp!]: pickerValue,
          [this.pickerValueChangeProp]: this.onPickerChange,
          ref: this.saveRef
        }));
      } else {
        return this.content;
      }
    }

    public onDismiss() {
      this.fireVisibleChange(false);
      this.$emit('dismiss');
    }

    public hide() {
      this.fireVisibleChange(false);
      this.$emit('hide');
    }

    public render() {
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
      const {disabled} = this.$props;
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
      return (
          <div style={props.wrapStyle}>
            {children}
            {modal}
          </div>
      );
    }
  }

  return PopupMixin;
}
