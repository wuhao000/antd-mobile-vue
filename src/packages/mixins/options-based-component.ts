import {defineComponent, onBeforeUpdate, Ref, ref} from 'vue';
import {getOptionProperty} from '../utils/option';
import {getNodeText} from '../utils/vnode';
import {useBaseInputComponent} from './base-input-component';

const optionsBasedComponentProps = {
  labelProperty: {type: [String, Function], default: 'label'},
  valueProperty: {type: [String, Function], default: 'value'},
  options: {type: Array}
};
const useOptionsBaseComponent = (props, ctx) => {
  const {} = useBaseInputComponent(props, ctx);
};

// @ts-ignore
defineComponent({
  name: 'OptionsBasedComponent',
  props: {},
  setup(props, {emit, slots}) {
    const searchKeyword: Ref<string> = ref('');
    /**
     * 选项对象中作为标签的属性名称
     */
    const labelProperty: Ref<string | ((option) => any)> = ref(null);
    /**
     * 选项数据
     */
    const options: Ref<any[]> = ref(null);
    /**
     * 选项对象中作为值的属性名称
     */
    const valueProperty: Ref<string | ((option) => any)> = ref(null);


    const getOptions = () => {
      return getResolvedOptions(options.value);
    };
    const getResolvedOptions = (options: any[]) => {
      if (options) {
        return options.map(option => {
          return Object.assign({}, option, {
            label: getOptionProperty(option, labelProperty.value),
            value: getOptionProperty(option, valueProperty.value)
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
    };
    onBeforeUpdate(() => {
      setProps();
    });
    {
      setProps();
    }
    return {};
  }
});
