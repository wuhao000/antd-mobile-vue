import {mixins, Options} from 'vue-class-component';
import {getOptionProperty} from '../utils/option';
import {getNodeText} from '../utils/vnode';
import BaseFormComponent from './base-input-component';

// @ts-ignore
@Options({
  name: 'OptionsBasedComponent',
  props: {
    labelProperty: {type: [String, Function], default: 'label'},
    options: {type: Array},
    valueProperty: {type: [String, Function], default: 'value'}
  }
})
export default class OptionsBasedComponent extends mixins(BaseFormComponent) {
  public searchKeyword: string = '';
  /**
   * 选项对象中作为标签的属性名称
   */
  public labelProperty: string | ((option) => any);
  /**
   * 选项数据
   */
  public options: any[];
  /**
   * 选项对象中作为值的属性名称
   */
  public valueProperty: string | ((option) => any);

  public beforeUpdate() {
    this.setProps();
  }

  public created() {
    this.setProps();
  }

  public getOptions() {
    return this.getResolvedOptions(this.options);
  }

  public getResolvedOptions(options: any[]): any[] | null {
    if (options) {
      return options.map(option => {
        return Object.assign({}, option, {
          label: getOptionProperty(option, this.labelProperty),
          value: getOptionProperty(option, this.valueProperty)
        });
      }).filter(item => {
        let label = item.label;
        if (typeof label === 'object') {
          label = getNodeText(label) || '';
        }
        return !this.searchKeyword || label.includes(this.searchKeyword);
      });
    } else {
      return null;
    }
  }

  private setProps() {
    if (this.$slots.default) {
      this.$slots.default().forEach(node => {
        if (node.props.disabled === undefined) {
          node.props.disabled = this.isDisabled;
        }
        if (node.props.readonly === undefined) {
          node.props.readonly = this.isReadonly;
        }
      });
    }
  }
}
