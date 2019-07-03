import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {camelAttrs} from './util';

@Component({
  name: 'VScale'
})
export default class VScale extends Vue {
  @Prop(Boolean)
  public x: boolean;
  @Prop(Boolean)
  public y: boolean;
  @Prop(String)
  public field: string;

  public created() {
    this.emitSetting();
  }

  public emitSetting() {
    ['x', 'y'].forEach(item => {
      if (this[item]) {
        (this.$parent as any).setScale({
          [item]: {
            ...camelAttrs(this.$attrs)
          }
        });
        if (this.field) {
          (this.$parent as any).setField(item, this.field);
        }
      }
    });
  }

  public render() {
  }
}
