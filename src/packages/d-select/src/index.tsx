import {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop, Provide} from 'vue-property-decorator';
import OptionsBasedComponent from '../../../mixins/options-based-component';
import {getNodeText} from '../../utils/vnode';
import {noop} from '../../utils/vue-types/utils';

const Select: any = window.antd.Select;

/**
 * 选项较多的时候
 */

@Component({
  name: 'DSelect'
})
export default class DSelect extends OptionsBasedComponent {
  /**
   * 占位提示信息
   */
  @Prop({default: '请选择'})
  public placeholder: string;
  /**
   * 当下拉列表为空时显示的内容
   */
  @Prop({type: String, default: '没有内容'})
  public notFoundContent: string;
  /**
   * 是否支持选项搜索
   */
  @Prop(Boolean)
  public searchable: boolean;
  /**
   * 为true时等同于mode="multiple"
   */
  @Prop(Boolean)
  public multiple: boolean;
  /**
   * 是否根据输入项进行筛选。类型为函数，接收 <code>inputValue</code>，<code>option</code> 两个参数， 当 <code>option</code> 符合筛选条件时，应返回 <code>true</code>，反之则返回 <code>false</code>。 仅对<code>options</code>进行过滤，如果选项为子组件时，请通过监听<code>search</code>事件获取输入值并自行实现过滤逻辑
   */
  @Prop(Function)
  public filter: (input: string, option: any) => boolean;
  /**
   * 是否支持清除
   */
  @Prop({type: Boolean, default: false})
  public clearable: boolean;
  @Prop({type: String})
  public defaultOptionLabel: string;
  @Prop()
  public defaultOptionValue: any;

  @Provide('selectStore')
  public store = {
    inputValue: ''
  };

  public onSearch(value: string) {
    this.store.inputValue = value;
    this.$emit('search', value);
  }

  public getInitValue(): any {
    return [];
  }

  public onFocus(...args) {
    this.store.inputValue = '';
    this.$emit('focus', ...args);
  }

  public onBlur(...args) {
    this.$emit('blur', ...args);
  }

  public getInputComponent() {
    return Select;
  }

  public getListeners(): {} {
    return {
      keydown: this.$listeners.keydown || noop,
      focus: this.onFocus,
      blur: this.onBlur,
      search: this.onSearch
    };
  }

  public onFilterOption(inputValue: string, option: VNode) {
    const text = getNodeText(option);
    if (!this.filter && text) {
      return text.toLowerCase().includes(inputValue);
    } else if (this.filter) {
      return this.filter(inputValue, option);
    }
    return true;
  }

  public getProps(): {} {
    const props: any = {
      filterOption: this.onFilterOption,
      allowClear: this.$attrs.allowClear !== undefined ? this.$attrs.allowClear : this.clearable,
      showSearch: this.$attrs.showSearch !== undefined ? this.$attrs.showSearch : this.searchable,
      notFoundContent: this.notFoundContent
    };
    if (this.multiple && this.$attrs.mode === undefined) {
      props.mode = 'multiple';
    }
    if (this.options) {
      props.options = this.filterOptions();
    }
    if (this.defaultOptionLabel && props.options) {
      props.options = [{label: this.defaultOptionLabel, value: this.defaultOptionValue}].concat(props.options);
    }
    if (this.$slots.dropdownRender) {
      props.dropdownRender = () => {
        return this.$slots.dropdownRender[0];
      };
    }
    return props;
  }

  public focus() {
    (this.$children[0] as any).focus();
  }

  public blur() {
    (this.$children[0] as any).blur();
  }

  public open() {
    (this.$children[0] as any).$children[0].setOpenState(true);
  }

  public close() {
    (this.$children[0] as any).$children[0].setOpenState(false);
  }

  public static Option = Select.Option;

  public static OptionGroup = Select.OptGroup;

  private filterOptions() {
    const inputValue = this.store.inputValue;
    if (this.options) {
      let options = this.options;
      if (this.filter) {
        options = options.filter(option => {
          if (inputValue) {
            return this.filter(inputValue, option);
          }
          return true;
        });
      }
      return this.getResolvedOptions(options);
    }
    return null;
  }
}
