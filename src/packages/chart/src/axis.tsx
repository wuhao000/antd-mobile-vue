import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {camelAttrs} from './util';

@Component({
  name: 'VAxis'
})
export default class VAxis extends Vue {
  @Prop(Boolean)
  public x: boolean;
  @Prop(Boolean)
  public y: boolean;
  @Prop(String)
  public field: string;
  @Prop(Boolean)
  public disabled: boolean;
  @Prop(Boolean)
  public autoAlign: boolean;
  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  public options: any;

  public created() {
    const _options = {
      ...this.$props,
      ...this.options,
      ...camelAttrs(this.$attrs)
    };
    (this.$parent as any).setAxis(_options);
  }

  public render() {
  }
}
