import RcSlider from 'ant-design-vue/es/vc-slider/src/Slider';
import {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {FormComponent} from '../../../mixins/form-component';

@Component({
  name: 'Slider'
})
class Slider extends FormComponent {
  @Prop({
    type: String,
    default: 'am-slider'
  })
  public prefixCls?: string;
  @Prop({})
  public marks?: { [key: number]: string };
  @Prop({type: Boolean})
  public dots?: boolean;
  @Prop({type: Boolean})
  public included?: boolean;
  @Prop({})
  public handleStyle?: any;
  @Prop({})
  public trackStyle?: any;
  @Prop({})
  public railStyle?: any;
  @Prop({})
  public tipFormatter?: (value?: string) => VNode;
  @Prop({type: Number})
  public min?: number;
  @Prop({type: Number})
  public max?: number;
  @Prop({type: Number})
  public step?: number;
  @Prop({})
  public handle?: any;
  public static install: (Vue) => void;

  public render() {
    const props = Object.assign({}, this.$props, {disabled: this.isDisabled});
    return (
      <div class={`${this.prefixCls}-wrapper`}>
        <RcSlider props={props}
                  value={this.currentValue}
                  on={{
                    change: (value) => {
                      this.currentValue = value;
                    }
                  }}/>
      </div>
    );
  }
}

export default Slider as any;
