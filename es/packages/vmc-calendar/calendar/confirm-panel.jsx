import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { formatDate } from '../util';
let ConfirmPanel = class ConfirmPanel extends Vue {
    onConfirm() {
        if (!this.disableBtn) {
            this.$emit('confirm');
        }
    }
    formatDate(date) {
        const { formatStr = '', locale } = this;
        return formatDate(date, formatStr, locale);
    }
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
        return (<div class={'confirm-panel'}>
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
};
tslib_1.__decorate([
    Prop({})
], ConfirmPanel.prototype, "type", void 0);
tslib_1.__decorate([
    Prop({})
], ConfirmPanel.prototype, "locale", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], ConfirmPanel.prototype, "onlyConfirm", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], ConfirmPanel.prototype, "disableBtn", void 0);
tslib_1.__decorate([
    Prop({})
], ConfirmPanel.prototype, "startDateTime", void 0);
tslib_1.__decorate([
    Prop({})
], ConfirmPanel.prototype, "endDateTime", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], ConfirmPanel.prototype, "formatStr", void 0);
ConfirmPanel = tslib_1.__decorate([
    Component({
        name: 'ConfirmPanel'
    })
], ConfirmPanel);
export default ConfirmPanel;
//# sourceMappingURL=confirm-panel.jsx.map