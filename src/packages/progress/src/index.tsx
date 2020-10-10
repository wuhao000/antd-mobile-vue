import classnames from 'classnames';
import {defineComponent, onMounted, PropType, ref, Ref} from 'vue';

const Progress = defineComponent({
  install: null,
  name: 'Progress',
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-progress'
    },
    barStyle: {
      type: Object
    },
    percent: {
      type: Number as PropType<number>,
      default: 0
    },
    position: {
      default: 'fixed'
    },
    unfilled: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    appearTransition: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, {emit, slots}) {
    const barRef: Ref<HTMLDivElement | null> = ref(null);
    const noAppearTransition: Ref<boolean> = ref(true);


    onMounted(() => {
      if (props.appearTransition) {
        setTimeout(() => {
          if (barRef.value) {
            barRef.value.style.width = `${props.percent}%`;
          }
        }, 10);
      }
    });

    return {
      noAppearTransition, barRef
    };
  },
  render() {
    const {
      prefixCls,
      position,
      unfilled,
      barStyle = {}
    } = this;
    const percentStyle = {
      width:
        this.noAppearTransition || !this.appearTransition
          ? `${this.percent}%`
          : 0,
      height: 0
    };

    const wrapCls = classnames(`${prefixCls}-outer`, {
      [`${prefixCls}-fixed-outer`]: position === 'fixed',
      [`${prefixCls}-hide-outer`]: !unfilled
    });

    return (
      <div
        class={wrapCls}
        role="progressbar"
        aria-valuenow={this.percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          ref={el => (this.barRef = el)}
          class={`${prefixCls}-bar`}
          style={{...barStyle, ...percentStyle}}
        />
      </div>
    );
  }
});

export default Progress;
