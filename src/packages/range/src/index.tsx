import FormComponent from '../../mixins/form-component';
import {Options, Vue} from 'vue-class-component';
import RcRange from 'ant-design-vue/lib/vc-slider/src/Range';
import {VNode} from 'vue';

@Options({
  name: 'Range',
  props: {
    prefixCls: {
      type: String,
      default: 'am-slider'
    },
    handleStyle: {},
    trackStyle: {},
    railStyle: {},
    onChange: {},
    onAfterChange: {},
    tipFormatter: {},
    min: {type: Number},
    max: {type: Number},
    step: {type: Number}
  }
})

class Range extends FormComponent {
  public prefixCls?: string;
  public handleStyle?: any;
  public trackStyle?: any;
  public railStyle?: any;
  public onChange?: (value?: number) => void;
  public onAfterChange?: (value?: number) => void;
  public tipFormatter?: ((value?: number) => VNode);
  public min?: number;
  public max?: number;
  public step?: number;
  public static install: (Vue) => void;

  public render(): any {
    const props = {
      ...this.$props,
      value: this.currentValue,
      onChange: (v) => {
        this.currentValue = v;
      }
    }
    return (
      <div class={`${this.prefixCls}-wrapper`}>
        <RcRange {...props}/>
      </div>
    );
  }
}

export default Range as any;
