import {defineComponent, PropType, Ref, ref, watch} from 'vue';
import List from '../../list';
import {useBaseInputComponent} from '../../mixins/base-input-component';
import {pureInputComponentProps} from '../../mixins/pure-input-component';
import {simpleFormComponentProps} from '../../mixins/simple-form-component';
import Calendar from './index';

const MIN_DATE = new Date(2000, 1, 1, 0, 0, 0);
const MAX_DATE = new Date(new Date().getFullYear() + 10, 12, 31, 23, 59, 59);

export default defineComponent({
  name: 'MCalendarItem',
  props: {
    /**
     * 标题
     */
    title: {type: [String, Object]},
    /**
     * 默认值
     */
    defaultDate: {type: Date, default: () => new Date()},
    minDate: {type: Date, default: () => MIN_DATE},
    maxDate: {type: Date, default: () => MAX_DATE},
    pickTime: {type: Boolean, default: false},
    type: {type: String as PropType<'one' | 'range'>, default: 'range'},
    placeholder: {type: String},
    ...simpleFormComponentProps,
    ...pureInputComponentProps
  },
  setup(props, {emit, attrs, slots}) {
    const {getDefaultSlot, stateValue, slots: inputSlots, cssStyle, listeners, props: inputProps} = useBaseInputComponent(props, {
      emit,
      attrs,
      slots
    });
    const currentValue: Ref<Date[]> = ref([]);
    const displayValue: Ref<string> = ref(null);
    const visible: Ref<boolean> = ref(false);
    watch(() => props.value, (value: any) => {
      if (props.type === 'one') {
        currentValue.value = [value];
      } else if (value) {
        currentValue.value = value;
      }
    }, {immediate: true});
    const getDisplayValue = () => {
      const valueStrs = currentValue.value.map(it => {
        if (props.pickTime) {
          return moment(it).format('YYYY/MM/DD HH:mm');
        } else {
          return moment(it).format('YYYY/MM/DD');
        }
      });
      if (props.type === 'range') {
        return valueStrs[0] + ' ~ ' + (valueStrs[1] || '');
      } else {
        return valueStrs[0];
      }
    };
    watch(() => currentValue.value, () => {
      if (currentValue.value.length) {
        displayValue.value = getDisplayValue();
      } else {
        displayValue.value = '';
      }
    }, {immediate: true});

    const getInputComponent = () => {
      return Calendar;
    };
    const onClick = () => {
      visible.value = true;
    };
    const onConfirm = (value1, value2) => {
      if (props.type === 'range') {
        currentValue.value = [value1, value2];
        emit('update:value', [value1, value2]);
      } else {
        currentValue.value = [value1];
        emit('update:value', value1);
      }
    };
    const onClose = () => {
      visible.value = false;
    };

    return {
      onClose, inputProps, displayValue,
      onClick, onConfirm, listeners,
      getDefaultSlot, cssStyle,
      inputSlots, visible, stateValue,
      currentValue
    };
  },
  render() {
    const slots = {
      default: () => {
        return [
          <Calendar {...this.inputProps}
                    {...this.listeners}
                    value={this.stateValue}
                    visible={this.visible}
                    onClose={this.onClose}
                    onConfirm={this.onConfirm}
                    defaultValue={this.currentValue}
                    slots={this.inputSlots}
                    style={this.cssStyle}>
            {this.getDefaultSlot()}
          </Calendar>,
          <span>{this.title}</span>
        ];
      },
      extra: () => {
        return <span>{this.displayValue || this.placeholder}</span>;
      }
    };
    return <List.Item text={!!this.displayValue}
                      required={this.required}
                      touchFeedback={true}
                      disabled={this.disabled}
                      arrow="horizontal"
                      v-slots={slots}
                      title={this.title}
                      onClick={this.onClick}>

    </List.Item>;
  }
});
