import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import localeProvider from '../../locale-provider/zh_CN';
import BaseFormComponent from '../../../mixins/base-input-component';

const Transfer = window.antd.Transfer;

@Component({
  name: 'DTransfer',
  inheritAttrs: false
})
export default class DTransfer extends BaseFormComponent {

  @Prop({type: Object, default: () => localeProvider.Transfer})
  public locale: object;
  @Prop({type: String})
  public keyProperty: string;
  @Prop({type: Array})
  public dataSource: Array<{ key: string, title: string, description: string, disabled: boolean }>;

  @Prop({
    type: Function, default: option => option.label || option.title || option.description
  })
  public renderLabel: (option: any) => any;
  public static install: (Vue) => void;

  /**
   * 是否可搜索
   */
  @Prop({type: Boolean, default: false})
  public searchable: boolean;
  /**
   * 左侧默认选中的值
   */
  @Prop({type: Array})
  public selectedKeys: any[];
  public state = {
    selectedKeys: this.selectedKeys || []
  };

  public getListeners(): {} {
    return {
      selectChange: (a, b) => {
        this.state.selectedKeys = [...a, ...b];
      },
      change: (values: any[]) => {
        this['stateValue'] = values;
      }
    };
  }

  @Watch('selectedKeys')
  public selectedKeysChanged(value: any[]) {
    this.state.selectedKeys = value;
  }


  public getProps(): {} {
    return {
      selectedKeys: this.state.selectedKeys,
      targetKeys: this['stateValue'] || [],
      showSearch: this.searchable,
      render: this.renderLabel,
      dataSource: this.buildDataSource()
    };
  }

  public getInputComponent() {
    return Transfer;
  }

  private buildDataSource() {
    return this.dataSource.map(item => {
      const opt = Object.assign({}, item) as any;
      if (!('disabled' in opt)) {
        opt.disabled = false;
      }
      const label = opt.title || opt.descriptiion;
      if (!('title' in opt)) {
        opt.title = label;
      }
      if (!('description' in opt)) {
        opt.descriptiion = label;
      }
      if (this.keyProperty) {
        opt.key = opt[this.keyProperty].toString();
      } else if (!('key' in opt)) {
        opt.key = label;
      }
      return opt;
    });
  }
}
