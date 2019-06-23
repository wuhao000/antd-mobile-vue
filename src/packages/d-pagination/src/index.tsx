import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import PureInputComponent from '../../../mixins/pure-input-component';
import locale from '../../locale-provider/zh_CN';


@Component({
  name: 'DPagination',
  inheritAttrs: false
})
export default class DPagination extends PureInputComponent {


  @Prop({type: Object, default: () => locale.Pagination})
  public locale: any;

  public static install: (Vue) => void;

  public getInputComponent() {
    return window.antd.Pagination;
  }

  public getProps(): {} {
    return {
      current: this.stateValue
    };
  }

  public getListeners(): { [p: string]: (...args: any) => any } {
    return {
      change: (value) => {
        this.stateValue = value;
      }
    };
  }

}
