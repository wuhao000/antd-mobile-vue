import RcCheckbox from 'ant-design-vue/lib/vc-checkbox';
import classnames from 'classnames';
import {defineComponent, PropType, ref, watch} from 'vue';
import AgreeItem from './agree-item';
import CheckboxItem from './checkbox-item';

const Checkbox = defineComponent({
  CheckboxItem: CheckboxItem,
  AgreeItem: AgreeItem,
  name: 'MCheckbox',
  props: {
    prefixCls: {
      default: 'am-checkbox'
    },
    name: {
      type: String as PropType<string>
    },
    wrapLabel: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    value: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, {emit, slots}) {
    const checked = ref(props.value || false);
    watch(() => props.value, (value: boolean) => {
      checked.value = value;
    });
    watch(() => checked.value, (checked: boolean) => {
      emit('update:value', checked);
    });

    const onClick = (e) => {
      // e.stopPropagation();
      // e.preventDefault();
      checked.value = !checked.value;
      emit('change', checked.value);
      emit('update:value', checked.value);
    };
    return {onClick};
  },
  render() {
    const {prefixCls} = this;
    const wrapCls = classnames(`${prefixCls}-wrapper`);
    const mark = (
      <label class={wrapCls}>
        <RcCheckbox
          onClick={this.onClick}
          checked={this.value}
          {...this.$props}/>
        {this.$slots.default?.()}
      </label>
    );
    if (this.wrapLabel) {
      return mark;
    }
    return <RcCheckbox
      onClick={this.onClick}
      checked={this.value}
      {...this.$props}>{this.$slots.default()}</RcCheckbox>;
  }
});

export default Checkbox as any;
