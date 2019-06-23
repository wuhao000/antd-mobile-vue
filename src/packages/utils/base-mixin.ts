import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'BaseMixin'
})
export default class BaseMixin extends Vue {
  // directives: {
  //   ref: {
  //     bind: function (el, binding, vnode) {
  //       binding.value(vnode.componentInstance ? vnode.componentInstance : vnode.elm)
  //     },
  //     update: function (el, binding, vnode) {
  //       binding.value(vnode.componentInstance ? vnode.componentInstance : vnode.elm)
  //     },
  //     unbind: function (el, binding, vnode) {
  //       binding.value(null)
  //     },
  //   },
  // },
  public setState(state, callback?) {
    const newState = typeof state === 'function' ? state(this.$data, this.$props) : state;
    // if (this.getDerivedStateFromProps) {
    //   Object.assign(newState, this.getDerivedStateFromProps(getOptionProps(this), { ...this.$data, ...newState }, true) || {})
    // }
    Object.assign(this.$data, newState);
    this.$nextTick(() => {
      callback && callback();
    });
  }

  public __emit(...argv) {
    // 直接调用listeners，底层组件不需要vueTool记录events
    const args: any[] = [].slice.call(argv, 0);
    const filterEvent = [];
    const eventName = args[0];
    if (args.length && this.$listeners[eventName]) {
      if (filterEvent.includes(eventName)) {
        this.$emit(eventName, ...args.slice(1));
      } else {
        (this.$listeners[eventName] as any)(...args.slice(1));
      }
    }
  }
}
