import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {camelAttrs} from './util';

const types = ['line', 'text', 'tag', 'rect', 'html', 'arc'];

@Component({
  name: 'VGuide'
})
export default class VGuide extends Vue {
  @Prop({
    type: String,
    validator(val) {
      return types.filter(type => type === val).length === 1;
    }
  })
  public type: string;
  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  public options: any;
  @Prop(Boolean)
  public top: boolean;
  @Prop({
    type: Boolean,
    default: true
  })
  public withPoint: boolean;

  public created() {
    (this.$parent as any).addGuide({
      type: this.type,
      options: {
        top: this.top,
        withPoint: this.withPoint,
        ...camelAttrs(this.options),
        ...camelAttrs(this.$attrs)
      }
    });
  }

  public render() {
  }
}
