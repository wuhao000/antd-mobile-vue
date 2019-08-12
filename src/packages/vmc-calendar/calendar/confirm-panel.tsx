import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {Models} from '../date/data-types';
import {formatDate} from '../util';

@Component({
  name: 'ConfirmPanel'
})
class ConfirmPanel extends Vue {
  @Prop({})
  public type?: 'one' | 'range';
  @Prop({})
  public locale: Models.Locale;
  @Prop({type: Boolean})
  public onlyConfirm?: boolean;
  @Prop({type: Boolean})
  public disableBtn?: boolean;
  @Prop({})
  public startDateTime?: Date;
  @Prop({})
  public endDateTime?: Date;
  @Prop({type: String})
  public formatStr?: string;

  public onConfirm() {
    if (!this.disableBtn) {
      this.$emit('confirm');
    }
  }

  public formatDate(date: Date) {
    const {formatStr = '', locale} = this;
    return formatDate(date, formatStr, locale);
  }

  public render() {
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
        <div class={'confirm-panel'}>
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
}

export default ConfirmPanel as any;
