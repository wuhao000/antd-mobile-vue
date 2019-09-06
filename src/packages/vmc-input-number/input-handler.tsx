import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import Touchable from '../vmc-feedback';

@Component({
  name: 'InputHandler'
})
class InputHandler extends Vue {
  @Prop({type: String})
  public prefixCls: string;
  @Prop({type: Boolean})
  public disabled?: boolean;
  @Prop({type: String})
  public role?: string;
  @Prop({type: Boolean})
  public unselectable?: boolean;
  public active: boolean = false;

  @Watch('disabled')
  public disabledChange(disabled: boolean) {
    if (!disabled) {
      this.active = false;
    }
  }

  public render() {
    const {
      prefixCls, disabled, ...otherProps
    } = this.$props;
    return (
      <Touchable disabled={disabled}
                 on={
                   {
                     touchstart: (...args) => {
                       this.active = true;
                       this.$emit('touchstart', ...args);
                     },
                     touchend: (...args) => {
                       this.active = false;
                       this.$emit('touchend', ...args);
                     }
                   }
                 }>
        <span class={{
          [`${prefixCls}-handler-active`]: this.active && !this.disabled
        }} {...otherProps}
        >{this.$slots.default}</span>
      </Touchable>
    );
  }
}

export default InputHandler as any;
