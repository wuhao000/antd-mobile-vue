import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {camelAttrs} from './util';

@Component({
  name: 'VTooltip'
})
export default class VTooltip extends Vue {
  @Prop({
    type: Boolean,
    default: false
  })
  public disabled: boolean;
  @Prop({
    type: Boolean,
    default: true
  })
  public showCrosshairs: boolean;
  @Prop({
    type: Boolean,
    default: true
  })
  public showItemMarker: boolean;
  @Prop({
    type: Boolean,
    default: false
  })
  public showXValue: boolean;
  @Prop({
    type: Boolean,
    default: false
  })
  public showValueInLegend: boolean;
  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  public options: any;

  public created() {
    const options = {
      disabled: this.disabled,
      showCrosshairs: this.showCrosshairs,
      showItemMarker: this.showItemMarker,
      showValueInLegend: this.showValueInLegend,
      ...camelAttrs(this.options),
      ...camelAttrs(this.$attrs)
    };
    if (this.showXValue) {
      options.onShow = (ev) => {
        const {items} = ev;
        items[0].name = items[0].title;
      };
    }
    (this.$parent as any).setTooltip(options);
  }

  public render() {
  }
}
