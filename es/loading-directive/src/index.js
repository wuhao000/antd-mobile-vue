import Toast from '../../toast';
var map = new Map();
export default {
  inserted: function inserted(el, binding, vnode) {
    var value = binding.value;

    if (value) {
      var toast = Toast.loading('加载中');
      map.set(el, toast);
    }
  },
  update: function update(el, binding, vnode) {
    var value = binding.value;

    if (binding.value !== binding.oldValue) {
      if (value) {
        var toast = Toast.loading('加载中', 30);
        map.set(el, toast);
      } else {
        var _toast = map.get(el);

        if (_toast) {
          _toast.destroy();
        }
      }
    }
  }
};