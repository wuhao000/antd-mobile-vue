import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'VPoint'
})
export default class VPoint extends Vue {
  @Prop({
    type: Object
  })
  public styles: any;
  @Prop({
    type: Array
  })
  public colors: any[];
  @Prop(String)
  public seriesField: string;

  public created() {
    (this.$parent as any).setPoint({
      ...this.$props,
      ...this.$attrs
    });
  }

  public render() {
  }
}
