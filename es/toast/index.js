import Toast from './src';
import './style';

Toast.install = function (Vue) {
  if (!Vue.prototype.$toast) {
    Object.defineProperties(Vue.prototype, {
      $toast: {
        get: function get() {
          return Toast;
        }
      }
    });
  }
};

export default Toast;