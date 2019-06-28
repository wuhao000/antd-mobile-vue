import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {camelAttrs} from './util';

const defaultShapeMap = {
  line: 'line',
  point: 'circle',
  area: 'area'
};

@Component({
  name: 'VChartMixin'
})
export default class VChartMixin extends Vue {
  @Prop([String, Array])
  public colors: any;
  @Prop(String)
  public seriesField: string;
  @Prop([String, Object])
  public adjust: any;
  public chartName: string;

  public created() {
    (this.$parent as any).set(this.chartName, {
      shape: defaultShapeMap[this.chartName] || '',
      ...this.$props,
      ...camelAttrs(this.$attrs)
    });
  }

  public render() {
    return null;
  }

}
