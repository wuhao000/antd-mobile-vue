import Component, {mixins} from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {getOptionProperty} from '../packages/utils/option';
import BaseFormComponent from './base-input-component';

@Component({
  name: 'OptionsBasedComponent'
})
export default class OptionsBasedComponent extends mixins(BaseFormComponent) {
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
        const op = Object.assign({}, option);
        op.label = getOptionProperty(option, this.labelProperty);
        op.value = getOptionProperty(option, this.valueProperty);
        return op;
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
