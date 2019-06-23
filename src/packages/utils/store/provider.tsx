import { storeShape } from './PropTypes';
import Vue from 'vue';
import {Prop} from 'vue-property-decorator';
import Component from 'vue-class-component';

@Component({
  name: 'StoreProvider',
  provide() {
    return {
      storeContext: this.$props,
    };
  }
})
export default class StoreProvider extends Vue {
  @Prop(storeShape.isRequired)
  public store: any;


  public render() {
    return this.$slots.default[0];
  }
}
