import {defineComponent, PropType} from 'vue';
import {Locale} from '../data-types';

export default defineComponent({
  name: 'WeekPanel',
  props: {
    locale: {
      type: Object as PropType<Locale>
    }
  },
  setup(props) {


    return {};
  },
  render() {
    const {locale} = this;
    const {week} = locale;
    return (
      <div class="week-panel">
        <div class="cell cell-grey">{week[0]}</div>
        <div class="cell">{week[1]}</div>
        <div class="cell">{week[2]}</div>
        <div class="cell">{week[3]}</div>
        <div class="cell">{week[4]}</div>
        <div class="cell">{week[5]}</div>
        <div class="cell cell-grey">{week[6]}</div>
      </div>
    );
  }
});
