import Button from './src/button';
import Group from './src/group.vue';
import './style';

const CheckBox = window.antd.Checkbox;
CheckBox.Button = Button;
export default {
  install: Vue => {
    Vue.component('DCheckbox', CheckBox);
    Vue.component('DCheckboxGroup', Group);
    Vue.component('DCheckboxButton', Button);
  }
};
