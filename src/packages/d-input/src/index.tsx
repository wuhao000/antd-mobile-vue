import hasProp, {hasListener} from '../../utils/props-util';
import {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import BaseFormComponent from '../../../mixins/base-input-component';

const Input: any = window.antd.Input;
@Component({
  name: 'DInput',
  inheritAttrs: false
})
export default class DInput extends BaseFormComponent {


  public getInputComponent() {
    return Input;
  }

  public getInitValue() {
    return '';
  }

  public onInput(value) {
    let val = value;
    if (value && value.toString() === '[object InputEvent]') {
      val = value.target.value;
    }
    if (typeof val !== 'object' && typeof val !== 'function') {
      this.$emit('input', val);
      if (!(hasProp(this, 'value') && hasListener(this, 'input'))) {
        this.stateValue = val;
      }
    }
  }

  public handleChange(value) {
    if (typeof value !== 'object' && typeof value !== 'function') {
      const comp: any = this.getInputComponent();
      if (comp.model && comp.model.prop === 'value' && comp.model.event === 'change') {
        this.stateValue = value;
      }
    }
  }

  public static Group: any;

  public static Search: any;

  public static TextArea: any;
}


@Component({
  name: 'DInputGroup',
  inheritAttrs: false
})
class DInputGroup extends BaseFormComponent {

  public getInputComponent() {
    return Input.Group;
  }

}


@Component({
  name: 'DInputSearch',
  inheritAttrs: false
})
class DInputSearch extends BaseFormComponent {

  @Prop({})
  public enterButton: any;

  public getInputComponent() {
    return Input.Search;
  }

  public getSlots(): {} {
    let enterButton;
    if (this.$slots.enterButton) {
      if (this.$slots.enterButton.length) {
        enterButton = this.$slots.enterButton[0];
      } else {
        enterButton = <div>{this.$slots.enterButton}</div>;
      }
    }
    return {enterButton};
  }

  public getDefaultSlot(): VNode[] | VNode | undefined {
    if (this.$slots.default) {
      if (this.$slots.default.length) {
        return this.$slots.default[0];
      } else {
        return <div>{this.$slots.default}</div>;
      }
    }
  }

}

@Component({
  name: 'DTextarea',
  inheritAttrs: false
})
class DTextArea extends BaseFormComponent {

  public getInputComponent() {
    return Input.TextArea;
  }

}

DInput.TextArea = DTextArea;

DInput.Search = DInputSearch;

DInput.Group = DInputGroup;
