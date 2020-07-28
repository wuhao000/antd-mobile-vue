import {getNodeText} from '../utils/vnode';
import Component, {mixins} from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {getOptionProperty} from '../utils/option';
import BaseFormComponent from './base-input-component';

@Component({
  name: 'OptionsBasedComponent'
})
export default class OptionsBasedComponent extends mixins(BaseFormComponent) {

  public searchKeyword: string = '';
  /**
   * 选项对象中作为标签的属性名称
   */
  @Prop({type: [String, Function], default: 'label'})
  public labelProperty: string | ((option) => any);
  /**
   * 选项数据
   */
  @Prop({type: Array})
  public options: any[];
  /**
   * 选项对象中作为值的属性名称
   */
  @Prop({type: [String, Function], default: 'value'})
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
      this.$slots.default.forEach(node => {
        if (node.componentOptions && node.componentOptions.propsData['disabled'] === undefined) {
          node.componentOptions.propsData['disabled'] = this['isDisabled'];
        }
        if (node.componentOptions && node.componentOptions.propsData['readonly'] === undefined) {
          node.componentOptions.propsData['readonly'] = this['isReadonly'];
        }
      });
    }
  }
}
