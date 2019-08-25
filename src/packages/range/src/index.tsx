import RcRange from 'ant-design-vue/lib/vc-slider/src/Range';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'Range'
})
class Range extends Vue {
  @Prop({
    type: String,
    default: 'am-slider'
  })
  public prefixCls?: string;
  @Prop({})
  public handleStyle?: any;
  @Prop({})
  public trackStyle?: any;
  @Prop({})
  public railStyle?: any;
  @Prop({})
  public onChange?: (value?: number) => void;
  @Prop({})
  public onAfterChange?: (value?: number) => void;
  @Prop({})
  public tipFormatter?: ((value?: number) => VNode);
  @Prop({type: Array})
  public value?: number[];
  @Prop({type: Number})
  public min?: number;
  @Prop({type: Number})
  public max?: number;
  @Prop({type: Number})
  public step?: number;
  @Prop({type: Boolean})
  public disabled?: boolean;
  public static install: (Vue) => void;

  public render() {
    return (
        <div class={`${this.prefixCls}-wrapper`}>
          <RcRange props={this.$props}
                   on={
                     {
                       ...this.$listeners,
                       change: (value) => {
                         this.$emit('input', value);
                         this.$emit('change', value);
                       }
                     }
                   }/>
        </div>
    );
  }
}

export default Range as any;
