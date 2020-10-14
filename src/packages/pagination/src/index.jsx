import classnames from 'classnames';
import { defineComponent, reactive, watch } from 'vue';
import Button from '../../button';
import Flex from '../../flex';
import { getComponentLocale } from '../../utils/getLocale';
export default defineComponent({
    install: null,
    name: 'Pagination',
    props: {
        prefixCls: {
            type: String,
            default: 'am-pagination'
        },
        mode: {
            default: 'button'
        },
        simple: {
            type: Boolean,
            default: false
        },
        value: {
            type: Number,
            default: 1
        },
        total: {
            type: Number,
            default: 0
        },
        prevText: {
            type: String
        },
        nextText: {
            type: String
        }
    },
    setup(props, { emit, slots }) {
        const state = reactive({
            current: props.value
        });
        watch(() => props.value, (value) => {
            if (state.current !== value) {
                state.current = value;
            }
        });
        const onChange = (p) => {
            state.current = p;
            emit('update:value', p);
        };
        return {
            state, onChange
        };
    },
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        const { prefixCls, mode, total, simple } = this;
        const { current } = this.state;
        const locale = getComponentLocale(this.$props, this.$root, 'Pagination', () => require('./locale/zh_CN'));
        const { prevText, nextText } = locale;
        let markup = (<Flex>
        <Flex.Item class={`${prefixCls}-wrap-btn ${prefixCls}-wrap-btn-prev`}>
          <Button inline disabled={current <= 1} onClick={() => this.onChange(current - 1)}>
            {(_f = (_c = (_b = (_a = this.$slots).prevText) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : (_e = (_d = this.$slots)['prev-text']) === null || _e === void 0 ? void 0 : _e.call(_d)) !== null && _f !== void 0 ? _f : prevText}
          </Button>
        </Flex.Item>
        {this.$slots.default ? (<Flex.Item>{(_h = (_g = this.$slots).default) === null || _h === void 0 ? void 0 : _h.call(_g)}</Flex.Item>) : (!simple && (<Flex.Item class={`${prefixCls}-wrap`} aria-live="assertive">
              <span class="active">{current}</span>/<span>{total}</span>
            </Flex.Item>))}
        <Flex.Item class={`${prefixCls}-wrap-btn ${prefixCls}-wrap-btn-next`}>
          <Button inline disabled={current >= total} onClick={() => this.onChange(this.state.current + 1)}>
            {(_p = (_l = (_k = (_j = this.$slots).nextText) === null || _k === void 0 ? void 0 : _k.call(_j)) !== null && _l !== void 0 ? _l : (_o = (_m = this.$slots)['next-text']) === null || _o === void 0 ? void 0 : _o.call(_m)) !== null && _p !== void 0 ? _p : nextText}
          </Button>
        </Flex.Item>
      </Flex>);
        if (mode === 'number') {
            markup = (<div class={`${prefixCls}-wrap`}>
          <span class="active">{current}</span>/<span>{total}</span>
        </div>);
        }
        else if (mode === 'pointer') {
            const arr = [];
            for (let i = 0; i < total; i++) {
                arr.push(<div key={`dot-${i}`} class={classnames(`${prefixCls}-wrap-dot`, {
                    [`${prefixCls}-wrap-dot-active`]: i + 1 === current
                })}>
            <span />
          </div>);
            }
            markup = <div class={`${prefixCls}-wrap`}>{arr}</div>;
        }
        const cls = classnames(prefixCls);
        return (<div class={cls}>
        {markup}
      </div>);
    }
});
//# sourceMappingURL=index.jsx.map