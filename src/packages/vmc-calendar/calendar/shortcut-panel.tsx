import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {Models} from '../date/data-types';

@Component({
  name: 'ShortcutPanel'
})
export default class ShortcutPanel extends Vue {
  @Prop({})
  public locale: Models.Locale;
  @Prop({})
  public onSelect: (startDate?: Date, endDate?: Date) => void;

  public onClick(type: string) {
    const today = new Date();
    switch (type) {
      case 'today':
        this.$emit(
            'select',
            new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0),
            new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12)
        );
        break;

      case 'yesterday':
        this.$emit('select',
            new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 0),
            new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 12)
        );
        break;

      case 'lastweek':
        this.$emit('select',
            new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6, 0),
            new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12)
        );
        break;

      case 'lastmonth':
        this.$emit('select',
            new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29, 0),
            new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12)
        );
        break;
    }
  }

  public render() {
    const {locale} = this;

    return (
        <div class={'shortcut-panel'}>
          <div class={'item'} onClick={() => this.onClick('today')}>{locale.today}</div>
          <div class={'item'} onClick={() => this.onClick('yesterday')}>{locale.yesterday}</div>
          <div class={'item'} onClick={() => this.onClick('lastweek')}>{locale.lastWeek}</div>
          <div class={'item'} onClick={() => this.onClick('lastmonth')}>{locale.lastMonth}</div>
        </div>
    );
  }
}
