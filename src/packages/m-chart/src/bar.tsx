import Component, {mixins} from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Base from './mixin';

@Component({
  name: 'VBar'
})
export default class VBar extends mixins(Base) {

  @Prop({
    type: String,
    default: 'vertical'
  })
  public direction: string;
  public chartName = 'bar';

}
