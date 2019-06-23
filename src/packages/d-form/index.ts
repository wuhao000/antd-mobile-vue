import '../ae-grid/style';
import Form from './src/form';
import FormItem from './src/form-item';
import './style';

Form.Item = FormItem;
Form.install = (Vue) => {
  Vue.component('DForm', Form);
  Vue.component('DFormItem', FormItem);
};
export default Form;
