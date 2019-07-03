const camel = function(key) {
  return key.replace(/(-[a-z])/g, function($1) {
    return $1.toUpperCase().replace('-', '');
  });
};
const camelBatch = function(attrs) {
  for (const i in attrs) {
    if (attrs) {
      const key = camel(i);
      attrs[key] = attrs[i];
      if (key !== i) {
        delete attrs[i];
      }
    }
  }
  return attrs;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'VPie'
})
export default class VPie extends Vue {
  @Prop({
    type: String,
    default: 'polar'
  })
  public coord: string;
  @Prop({
    type: Boolean,
    default: true
  })
  public transposed: boolean;
  @Prop({
    type: String
  })
  public serialField: string;
  @Prop({
    type: Array
  })
  public colors: any[];

  public created() {
    (this.$parent as any).setPie({
      ...this.$props,
      ...camelBatch(this.$attrs)
    });
  }

  public render() {
  }
}
