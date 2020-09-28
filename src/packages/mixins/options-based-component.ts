import {unwrapFragment} from '@/packages/utils/vue';
import {onBeforeUpdate, Ref, ref} from 'vue';
import {getOptionProperty} from '../utils/option';
import {getNodeText, isEmptySlot} from '../utils/vnode';
import {useBaseInputComponent} from './base-input-component';

export const optionsBasedComponentProps = {
  /**
   * 选项对象中作为标签的属性名称
   */
  labelProperty: {type: [String, Function], default: 'label'},
  /**
   * 选项对象中作为值的属性名称
   */
  valueProperty: {type: [String, Function], default: 'value'},
  /**
   * 选项数据
   */
  options: {type: Array}
};
export const useOptionsBaseComponent = (props, {emit, attrs, slots}) => {
  const {isDisabled, stateValue, isReadonly} = useBaseInputComponent(props, {emit, attrs, slots});
  const searchKeyword: Ref<string> = ref('');

  const getOptions = () => {
    return getResolvedOptions(props.options);
  };
  const getResolvedOptions = (options: any[]) => {
    if (options) {
      return options.map(option => {
        return Object.assign({}, option, {
          label: getOptionProperty(option, props.labelProperty),
          value: getOptionProperty(option, props.valueProperty)
        });
      }).filter(item => {
        let label = item.label;
        if (typeof label === 'object') {
          label = getNodeText(label) || '';
        }
        return !searchKeyword.value || label.includes(searchKeyword.value);
      });
    } else {
      return null;
    }
  };
  const setProps = () => {
    if (!isEmptySlot(slots.default)) {
      unwrapFragment(slots.default()).forEach(node => {
        if (node.props.disabled === undefined) {
          node.props.disabled = isDisabled.value;
        }
        if (node.props.readonly === undefined) {
          node.props.readonly = isReadonly.value;
        }
      });
    }
  };
  onBeforeUpdate(() => {
    setProps();
  });
  {
    setProps();
  }
  return {
    getOptions, isReadonly, isDisabled, searchKeyword,
    stateValue
  };
};
