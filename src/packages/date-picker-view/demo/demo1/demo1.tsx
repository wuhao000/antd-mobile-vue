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
    console.log(value2 && value2.getTime());
    return (<div>
      <div class="sub-title">Start datetime</div>
      {value2 && value2.getTime()}
      <DatePickerView
          vModel={this.value2}
      />
      <div class="sub-title">End datetime</div>
      {value && value.getTime()}
      <DatePickerView
          vModel={this.value}
      />
    </div>);
  }

});
