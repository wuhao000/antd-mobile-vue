import RcRange from 'ant-design-vue/lib/vc-slider/src/Range';
import {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {FormComponent} from '../../mixins/form-component';

@Component({
  name: 'Range'
})
class Range extends FormComponent {
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
  @Prop({type: Number})
  public min?: number;
  @Prop({type: Number})
  public max?: number;
  @Prop({type: Number})
  public step?: number;
  public static install: (Vue) => void;

  public render() {
    return (
      <div class={`${this.prefixCls}-wrapper`}>
        <RcRange props={this.$props}
                 value={this.currentValue}
                 on={{
                   change: (v) => {
                     this.currentValue = v;
                   }
                 }}/>
      </div>
    );
  }
}

export default Range as any;
