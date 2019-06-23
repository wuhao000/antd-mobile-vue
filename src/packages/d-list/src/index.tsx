import {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import ProxyComponent from '../../../mixins/proxy-component';
import Empty from '../../d-empty';

const List = window.antd.List;

@Component({
  name: 'DList',
  inheritAttrs: false
})
export default class DList extends ProxyComponent {

  public static install: (Vue) => void;
  public static Item = List.Item;

  @Prop({type: [String, Object]})
  public emptyText: string | VNode;

  public getInputComponent() {
    return List;
  }

  public getProps(): {} {
    return {
      locale: {
        emptyText: this.emptyText || <Empty/>
      }
    };
  }

}
