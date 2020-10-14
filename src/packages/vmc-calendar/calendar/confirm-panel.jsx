import { defineComponent } from 'vue';
import { formatDate as _formatDate } from '../util';
const ConfirmPanel = defineComponent({
    name: 'ConfirmPanel',
    props: {
        type: { type: String },
        locale: { type: Object },
        onlyConfirm: { type: Boolean },
        disableBtn: { type: Boolean },
        startDateTime: { type: Date },
        endDateTime: { type: Date },
        formatStr: { type: String }
    },
    setup(props, { emit }) {
        const onConfirm = () => {
            if (!props.disableBtn) {
                emit('confirm');
            }
        };
        const formatDate = (date) => {
            const { formatStr = '', locale } = props;
            return _formatDate(date, formatStr, locale);
        };
        return { onConfirm, formatDate };
    },
    render() {
        const { type, locale, disableBtn } = this;
        let { startDateTime, endDateTime } = this;
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
        return (<div class="confirm-panel">
        {type === 'range' &&
            <div class={'info'}>
            <p>{locale.start}: <span class={!startDateTime ? 'grey' : ''}>{startTimeStr}</span></p>
            <p>{locale.end}: <span class={!endDateTime ? 'grey' : ''}>{endTimeStr}</span></p>
          </div>}
        <div class={btnCls} onClick={this.onConfirm}>
          {locale.confirm}
        </div>
      </div>);
    }
});
export default ConfirmPanel;
//# sourceMappingURL=confirm-panel.jsx.map