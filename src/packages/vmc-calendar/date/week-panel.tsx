import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {Models} from './data-types';

@Component({
  name: 'WeekPanel'
})
class WeekPanel extends Vue {
  @Prop({})
  public locale: Models.Locale;

  public render() {
    const {locale} = this;
    const {week} = locale;
    return (
        <div class={'week-panel'}>
          <div class={'cell cell-grey'}>{week[0]}</div>
          <div class={'cell'}>{week[1]}</div>
          <div class={'cell'}>{week[2]}</div>
          <div class={'cell'}>{week[3]}</div>
          <div class={'cell'}>{week[4]}</div>
          <div class={'cell'}>{week[5]}</div>
          <div class={'cell cell-grey'}>{week[6]}</div>
        </div>
    );
  }
}

export default WeekPanel as any;
