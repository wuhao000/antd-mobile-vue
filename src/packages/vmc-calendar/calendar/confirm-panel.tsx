import {defineComponent, PropType} from 'vue';
import {Locale} from '../data-types';
import {formatDate as _formatDate} from '../util';

const ConfirmPanel = defineComponent({
  name: 'ConfirmPanel',
  props: {
    type: {type: String},
    locale: {type: Object as PropType<Locale>},
    onlyConfirm: {type: Boolean},
    disableBtn: {type: Boolean},
    startDateTime: {type: Date as PropType<Date>},
    endDateTime: {type: Date as PropType<Date>},
    formatStr: {type: String as PropType<string>}
  },
  setup(props, {emit}) {
    const onConfirm = () => {
      if (!props.disableBtn) {
        emit('confirm');
      }
    };
    const formatDate = (date: Date) => {
      const {formatStr = '', locale} = props;
      return _formatDate(date, formatStr, locale);
    };
    return {onConfirm, formatDate};
  },
  render() {
    const {type, locale, disableBtn} = this;
    let {startDateTime, endDateTime} = this;
    if (startDateTime && endDateTime && +startDateTime > +endDateTime) {
      const tmp = startDateTime;
      startDateTime = endDateTime;
      endDateTime = tmp;
    }

    const startTimeStr = startDateTime ? this.formatDate(startDateTime) : locale.noChoose;
    const endTimeStr = endDateTime ? this.formatDate(endDateTime) : locale.noChoose;
    let btnCls = disableBtn ? 'button button-disable' : 'button';
    if (type === 'one') {
      btnCls += ' button-full';
    }

    return (
      <div class="confirm-panel">
        {
          type === 'range' &&
          <div class={'info'}>
            <p>{locale.start}: <span class={!startDateTime ? 'grey' : ''}>{startTimeStr}</span></p>
            <p>{locale.end}: <span class={!endDateTime ? 'grey' : ''}>{endTimeStr}</span></p>
          </div>
        }
        <div class={btnCls} onClick={this.onConfirm}>
          {locale.confirm}
        </div>
      </div>
    );
  }
});
export default ConfirmPanel as any;
