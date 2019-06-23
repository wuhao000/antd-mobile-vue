import Button from './src/button';
import './style';

Button.install = Vue => {
  Vue.component('DButton', Button);
  Vue.component('DButtonGroup', Button.Group);
};
export default Button;
