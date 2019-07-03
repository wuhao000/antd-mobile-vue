import Vue from 'vue';
import DatePickerView from '../../index';

export default Vue.extend({
  data() {
    return {
      value: new Date(2019, 0, 1, 0, 1),
      value2: null
    };
  },
  methods: {
    onChange(value) {
      this.value = value;
    }
  },
  render() {
    const {value2, value} = this;
    return (<div>
      <div class="sub-title">Start datetime</div>
      <div vTime={value2}/>
      <DatePickerView
          vModel={this.value2}
      />
      <div class="sub-title">End datetime</div>
      <div vTime={value}/>
      <DatePickerView
          vModel={this.value}
      />
    </div>);
  }

});
