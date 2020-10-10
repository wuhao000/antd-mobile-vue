import classnames from 'classnames';
import {defineComponent, PropType, reactive, watch} from 'vue';
import TouchFeedback from '../../vmc-feedback';

const SegmentedControl = defineComponent({
  install: null,
  name: 'SegmentedControl',
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-segment'
    },
    tintColor: {
      type: String as PropType<string>,
      default: ''
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    value: {
      type: Number as PropType<number>,
      default: 0
    },
    values: {
      default: () => {
        return [];
      }
    }
  },
  setup(props, {emit}) {
    const state = reactive({
      selectedIndex: props.value
    });
    watch(() => props.value, (value: number) => {
      state.selectedIndex = value;
    });

    const onClick = (e: any, index: any, value: any) => {
      const {disabled} = props;
      if (!disabled && state.selectedIndex !== index) {
        // just do a mock so that the api to be the same as react-native
        e.nativeEvent = e.nativeEvent ? e.nativeEvent : ({} as any);
        (e.nativeEvent as any).selectedSegmentIndex = index;
        (e.nativeEvent as any).value = value;
        state.selectedIndex = index;
        emit('update:value', index);
        emit('change', index);
      }
    };
    const renderSegmentItem = (idx: number, value: string, selected: boolean) => {
      const {prefixCls, disabled, tintColor} = props;

      const itemCls = classnames(`${prefixCls}-item`, {
        [`${prefixCls}-item-selected`]: selected
      });

      const itemStyle = {
        color: selected ? '#fff' : tintColor,
        backgroundColor: selected ? tintColor : 'transparent',
        borderColor: tintColor
      };

      const activeInnerStyle: any = tintColor
        ? {
          backgroundColor: tintColor
        }
        : {};

      return (
        <TouchFeedback
          key={idx}
          disabled={disabled}
          activeClassName={`${prefixCls}-item-active`}
        >
          <div
            class={itemCls}
            style={itemStyle}
            role="tab"
            aria-selected={selected && !disabled}
            aria-disabled={disabled}
            onClick={disabled ? undefined : e => onClick(e, idx, value)}
          >
            <div class={`${prefixCls}-item-inner`} style={activeInnerStyle}/>
            {value}
          </div>
        </TouchFeedback>
      );
    };
    return {
      renderSegmentItem, state
    };
  },
  render() {
    const {prefixCls, disabled, values = []} = this;

    const wrapCls = classnames(prefixCls, {
      [`${prefixCls}-disabled`]: disabled
    });

    return (
      <div class={wrapCls} role="tablist">
        {values.map((value, idx) =>
          // tslint:disable-next-line:jsx-no-multiline-js
          this.renderSegmentItem(idx, value, idx === this.state.selectedIndex)
        )}
      </div>
    );
  }
});

export default SegmentedControl as any;
