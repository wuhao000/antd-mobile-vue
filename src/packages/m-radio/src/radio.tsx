import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import RcCheckbox from '../../../ant/vc-checkbox';


@Component({
  name: 'MRadio'
})
export default class Radio extends Vue {
  @Prop({type: String, default: 'am-radio'})
  public prefixCls?: string;
  @Prop({type: String})
  public listPrefixCls?: string;
  @Prop({type: Boolean, default: false})
  public disabled?: boolean;
  @Prop({type: String})
  public name?: string;
  @Prop({default: true})
  public wrapLabel?: boolean;
  public static RadioItem: any;
  public static install: (Vue) => void;
  @Prop({type: Boolean, default: false})
  public value: boolean;
  public checked = this.value || false;


  public onClick() {
    this.checked = !this.checked;
    this.$emit('change', this.checked);
  }

  public render() {
    const {...restProps} = this.$props;
    const {prefixCls} = restProps;
    const wrapCls = classnames(`${prefixCls}-wrapper`);
    if ('class' in restProps) {
      // Todo https://github.com/developit/preact-compat/issues/422
      /* tslint:disable:no-string-literal */
      delete (restProps as any)['class'];
    }
    const mark = (
      <label class={wrapCls}
             onClick={this.onClick}>
        <RcCheckbox props={this.$props}
                    checked={this.value}
                    type={'radio'}/>
        {this.$slots.default}
      </label>
    );
    if (this.wrapLabel) {
      return mark;
    }
    return <RcCheckbox type={'radio'} checked={this.value} props={this.$props}>{this.$slots.default}</RcCheckbox>;
  }
}
