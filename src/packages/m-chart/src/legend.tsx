import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {camelAttrs} from './util';

@Component({
  name: 'VLegend'
})
export default class VLegend extends Vue {
  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  public options: any;
  @Prop({
    type: Boolean,
    default: false
  })
  public disabled: boolean;

  public created() {
    (this.$parent as any).setLegend({
      ...this.options,
      disabled: this.disabled,
      ...camelAttrs(this.$attrs)
    });
  }

  public render() {
  }
}
