import {pureInputComponentProps} from '../../mixins/pure-input-component';
import {simpleFormComponentProps} from '../../mixins/simple-form-component';
import {defineComponent, PropType, Ref, ref, watch} from 'vue';
import List from '../../list';
import {useBaseInputComponent} from '../../mixins/base-input-component';
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
        emit('input', [value1, value2]);
      } else {
        currentValue.value = [value1];
        emit('input', value1);
      }
    };
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
    return <List.Item text={!!this.displayValue}
                      required={this.required}
                      arrow="horizontal"
                      title={this.title}
                      onClick={this.onClick}>
      <Calendar {...this.inputProps}
                value={this.stateValue}
                visible={this.visible}
                onClose={this.onClose}
                onConfirm={this.onConfirm}
                defaultValue={this.currentValue}
                slots={this.inputSlots}
                on={this.listeners}
                style={this.cssStyle}>
        {this.getDefaultSlot()}
      </Calendar>
      <span>{this.title}</span>
      <span slot="extra">{this.displayValue || this.placeholder}</span>
    </List.Item>;
  }
});
