import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'Item'
})
export default class Item extends Vue {

  @Prop({type: String})
  public text: string;

  public render() {
    return <div>{this.text}</div>;
  }
}
