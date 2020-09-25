import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import RcCheckbox from 'ant-design-vue/lib/vc-checkbox';
import AgreeItem from './agree-item';
import CheckboxItem from './checkbox-item';

@Component({
  name: 'MCheckbox'
})
class Checkbox extends Vue {
  @Prop({default: 'am-checkbox'})
  public prefixCls?: string;
  @Prop({type: String})
  public name?: string;
  @Prop({type: Boolean, default: true})
  public wrapLabel?: boolean;
  @Prop({type: Boolean, default: false})
  public disabled?: boolean;
  public static CheckboxItem: any = CheckboxItem;
  public static AgreeItem: any = AgreeItem;
  @Prop({type: Boolean, default: false})
  public value: boolean;

  public checked = this.value || false;

  public onClick(e) {
    // e.stopPropagation();
    // e.preventDefault();
    this.checked = !this.checked;
    this.$emit('change', this.checked);
    this.$emit('update:value', this.checked);
  }

  @Watch('value')
  public valueChanged(value: boolean) {
    this.checked = value;
  }

  @Watch('checked')
  public checkedChanged(checked: boolean) {
    this.$emit('update:value', checked);
  }

  public render() {
    const {prefixCls} = this;
    const wrapCls = classnames(`${prefixCls}-wrapper`);
    const mark = (
      <label class={wrapCls}>
        <RcCheckbox
          onClick={this.onClick}
          checked={this.value}
          props={this.$props}/>
        {this.$slots.default}
      </label>
    );
    if (this.wrapLabel) {
      return mark;
    }
    return <RcCheckbox
      onClick={this.onClick}
      checked={this.value}
      props={this.$props}>{this.$slots.default}</RcCheckbox>;
  }
}
export default Checkbox as any;
