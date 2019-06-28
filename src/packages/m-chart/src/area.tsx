import Component, {mixins} from 'vue-class-component';
import base from './mixin';

@Component({
  name: 'VArea'
})
export default class VArea extends mixins(base) {
  public chartName = 'area';

}
