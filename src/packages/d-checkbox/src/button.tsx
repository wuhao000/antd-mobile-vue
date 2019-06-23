import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject, Prop} from 'vue-property-decorator';
import DButton from '../../d-button';


@Component({
  name: 'DCheckboxButton',
  components: {DButton}
})
export default class DCheckboxButton extends Vue {
  @Prop(Boolean)
  public autoFocus: boolean;
  @Prop(Boolean)
  public checked: boolean;
  @Prop(Boolean)
  public defaultChecked: boolean;
  @Prop(Boolean)
  public disabled: boolean;
  @Prop(String)
  public id: string;
  @Prop(Boolean)
  public indeterminate: boolean;
  @Prop(Boolean)
  public isGroup: boolean;
  @Prop(String)
  public label: string;
  @Prop(String)
  public name: string;
  @Prop({
    default: 'ant-checkbox-btn',
    type: String
  })
  public prefixCls: string;
  @Prop({type: String, default: 'default'})
  public size: 'small' | 'large' | 'default';
  @Prop({required: true})
  public value: any;
  @Inject({from: 'checkboxGroupContext', default: undefined})
  public checkboxGroupContext: any;

  get buttonType() {
    if (this.checkboxGroupContext) {
      if (this.checkboxGroupContext.sValue && this.checkboxGroupContext.sValue.includes(this['value'])) {
        return 'primary';
      } else {
        return 'default';
      }
    }
  }

  public created() {
    if (!this.checkboxGroupContext) {
      console.error('Checkbox Button只能用于CheckboxGroup之内');
    }
  }

  public toggleSelect() {
    if (this.checkboxGroupContext) {
      if (this.checkboxGroupContext.sValue.includes(this.value)) {
        this.checkboxGroupContext.sValue.splice(this.checkboxGroupContext.sValue.indexOf(this.value), 1);
      } else {
        this.checkboxGroupContext.sValue.push(this.value);
      }
    }
  }

  get props() {
    return {
      ...this.$attrs,
      ...this.$props
    };
  }

  public render() {
    // @ts-ignore
    return <DButton attrs={this.props}
                    class={this.prefixCls}
                    type={this.buttonType}
                    onClick={this.toggleSelect}>
      {this.label}
      {this.$slots.default}
    </DButton>;
  }
}
