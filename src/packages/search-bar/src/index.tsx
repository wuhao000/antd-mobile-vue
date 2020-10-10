import classnames from 'classnames';
import {defineComponent, onBeforeUnmount, onMounted, onUpdated, PropType, reactive, ref, Ref, watch} from 'vue';
import TouchFeedback from '../../vmc-feedback';

function onNextFrame(cb: () => void) {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(cb);
  }
  return window.setTimeout(cb, 1);
}

function clearNextFrameAction(nextFrameId: number) {
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(nextFrameId);
  } else {
    window.clearTimeout(nextFrameId);
  }
}

export default defineComponent({
  name: 'SearchBar',
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-search'
    },
    defaultValue: {
      type: String as PropType<string>
    },
    value: {
      type: String as PropType<string>
    },
    placeholder: {
      type: String as PropType<string>
    },
    showCancelButton: {
      type: Boolean as PropType<boolean>
    },
    cancelText: {
      type: String as PropType<string>
    },
    disabled: {
      type: Boolean as PropType<boolean>
    },
    autoFocus: {
      type: Boolean as PropType<boolean>
    },
    focused: {
      type: Boolean as PropType<boolean>
    },
    maxLength: {
      type: Number as PropType<number>
    }
  },
  setup(props, {emit, attrs, slots}) {
    const rightBtnInitMarginleft: Ref<string | null> = ref(null);
    const firstFocus: Ref<boolean> = ref(null);
    const blurFromOnClear: Ref<boolean> = ref(null);
    const onBlurTimeout: Ref<number | null> = ref(null);
    const state = reactive({
      value: props.value || '',
      focus: false
    });

    watch(() => props.value, (value: string) => {
      state.value = value;
    });
    watch(() => state.value, (value: string) => {
      emit('update:value', value);
    });
    const inputRef = ref(null);
    const rightBtnRef = ref(null);
    const syntheticPhContainerRef = ref(null);
    const syntheticPhRef = ref(null);
    const inputContainerRef = ref(null);
    const update = () => {
      if (syntheticPhRef.value) {
        if (
          inputContainerRef.value &&
          inputContainerRef.value.className.indexOf(
            `${props.prefixCls}-start`
          ) > -1
        ) {
          // 检测是否包含名为 ${this.props.prefixCls}-start 样式，生成动画
          // offsetWidth 某些时候是向上取整，某些时候是向下取整，不能用
          if (syntheticPhContainerRef.value) {
            const realWidth = syntheticPhContainerRef.value.getBoundingClientRect()
              .width; // 包含小数
            syntheticPhRef.value.style.width = `${Math.ceil(realWidth)}px`;
          }
          if (!props.showCancelButton && rightBtnRef.value) {
            rightBtnRef.value.style.marginRight = '0';
          }
        } else {
          syntheticPhRef.value.style.width = '100%';
          if (!props.showCancelButton && rightBtnRef.value) {
            rightBtnRef.value.style.marginRight = `-${rightBtnRef.value
              .offsetWidth +
            (rightBtnInitMarginleft.value != null
              ? parseInt(rightBtnInitMarginleft.value, 10)
              : 0)}px`;
          }
        }
      }
    };
    const onSubmit = (e) => {
      e.preventDefault();
      emit('submit', state.value || '');
      if (inputRef.value) {
        inputRef.value.blur();
      }
    };
    const onChange = (e) => {
      if (!state.focus) {
        state.focus = true;
      }
      const value = e.target.value;
      state.value = value;
      emit('change', value);
    };
    const onFocus = () => {
      state.focus = true;
      firstFocus.value = true;
      emit('focus');
    };
    const onBlur = () => {
      onBlurTimeout.value = onNextFrame(() => {
        if (!blurFromOnClear.value) {
          if (document.activeElement !== inputRef.value) {
            state.focus = false;
          }
        }
        blurFromOnClear.value = false;
      });
      // fix autoFocus item blur with flash
      if (attrs.onBlur) {
        setTimeout(() => {
          // fix ios12 wechat browser click failure after input
          if (document.body) {
            document.body.scrollTop = document.body.scrollTop;
          }
        }, 100);
        emit('blur');
      }
    };
    const onClear = () => {
      doClear();
    };
    const doClear = (value = true) => {
      blurFromOnClear.value = value;
      state.value = '';
      emit('clear');
      emit('change');
      if (blurFromOnClear) {
        focus();
      }
    };
    const onCancel = () => {
      emit('cancel');
      doClear(false);
    };
    const focus = () => {
      if (inputRef.value) {
        inputRef.value.focus();
      }
    };
    onMounted(() => {
      if (rightBtnRef.value) {
        const initBtn = window.getComputedStyle(rightBtnRef.value);
        rightBtnInitMarginleft.value = initBtn.marginLeft;
      }
      update();
    });
    onUpdated(() => {
      update();
    });
    onBeforeUnmount(() => {
      if (onBlurTimeout.value) {
        clearNextFrameAction(onBlurTimeout.value);
        onBlurTimeout.value = null;
      }
    });

    return {
      state, firstFocus, onClear, inputRef,
      rightBtnRef, syntheticPhContainerRef,
      syntheticPhRef, inputContainerRef,
      onCancel, onBlur, onChange, onFocus, onSubmit
    };
  },
  render() {
    const {
      prefixCls,
      showCancelButton,
      disabled,
      placeholder,
      maxLength
    } = this;

    // tslint:disable-next-line:variable-name
    const cancelText = '取消';

    const {value, focus} = this.state;

    const wrapCls = classnames(prefixCls, {
      [`${prefixCls}-start`]: (focus || (value && value.length > 0))
    });

    const clearCls = classnames(`${prefixCls}-clear`, {
      [`${prefixCls}-clear-show`]: (focus && value && value.length > 0)
    });

    const cancelCls = classnames(`${prefixCls}-cancel`, {
      [`${prefixCls}-cancel-show`]: (
        showCancelButton ||
        focus ||
        (value && value.length > 0)
      ),
      [`${prefixCls}-cancel-anim`]: this.firstFocus
    });
    const TouchFeedback2 = TouchFeedback as any;
    return (
      <form onSubmit={this.onSubmit}
            class={wrapCls}
            ref={this.inputContainerRef}
            action="#">
        <div class={`${prefixCls}-input`}>
          <div
            class={`${prefixCls}-synthetic-ph`}
            ref={this.syntheticPhRef}
          >
            <span
              class={`${prefixCls}-synthetic-ph-container`}
              ref={this.syntheticPhContainerRef}
            >
              <i class={`${prefixCls}-synthetic-ph-icon`}/>
              <span
                class={`${prefixCls}-synthetic-ph-placeholder`}
                // tslint:disable-next-line:jsx-no-multiline-js
                style={{
                  visibility: placeholder && !value ? 'visible' : 'hidden'
                }}
              >
                {placeholder}
              </span>
            </span>
          </div>
          <input
            type="search"
            class={`${prefixCls}-value`}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onInput={this.onChange}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            ref={this.inputRef}
            maxlength={maxLength}
          />
          <TouchFeedback2 activeclass={`${prefixCls}-clear-active`}>
            <a onClick={this.onClear} class={clearCls}/>
          </TouchFeedback2>
        </div>
        <div
          class={cancelCls}
          onClick={this.onCancel}
          ref={this.rightBtnRef}>
          {this.cancelText || cancelText}
        </div>
      </form>
    );
  }
});
