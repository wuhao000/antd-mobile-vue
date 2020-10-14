import { __rest } from "tslib";
import classnames from 'classnames';
import { defineComponent, ref } from 'vue';
import Icon from '../../icon';
import Marquee from './marquee';
export default defineComponent({
    inheritAttrs: false,
    install: null,
    name: 'NoticeBar',
    props: {
        marqueeProps: {
            type: Object
        },
        prefixCls: {
            type: String,
            default: 'am-notice-bar'
        },
        mode: {
            type: String,
            default: ''
        },
        icon: {
            type: [String, Object]
        },
        action: {
            type: Object
        }
    },
    setup(props, { emit, slots }) {
        const show = ref(true);
        const onClick = () => {
            const { mode } = props;
            emit('click');
            if (mode === 'closable') {
                show.value = false;
            }
        };
        return {
            onClick, show
        };
    },
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const _j = this, { mode, prefixCls, action, marqueeProps } = _j, restProps = __rest(_j, ["mode", "prefixCls", "action", "marqueeProps"]);
        const icon = (_d = (_c = (_b = (_a = this.$slots).icon) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : this.icon) !== null && _d !== void 0 ? _d : <Icon type="voice" size="xxs"/>;
        const extraProps = {};
        let operationDom = null;
        if (mode === 'closable') {
            operationDom = (<div class={`${prefixCls}-operation`} onClick={this.onClick} role="button" aria-label="close">
          {(_h = (_g = (_f = (_e = this.$slots).action) === null || _f === void 0 ? void 0 : _f.call(_e)) !== null && _g !== void 0 ? _g : action) !== null && _h !== void 0 ? _h : <Icon type="cross" size="md"/>}
        </div>);
        }
        else {
            if (mode === 'link') {
                operationDom = (<div class={`${prefixCls}-operation`} role="button" aria-label="go to detail">
            {action ? action : <Icon type="right" size="md"/>}
          </div>);
            }
            extraProps.onClick = this.onClick;
        }
        const wrapCls = classnames(prefixCls);
        return this.show ? (<div class={wrapCls} onClick={(e) => {
            if (extraProps.onClick) {
                extraProps.onClick(e);
            }
        }} role="alert">
        {icon && (
        // tslint:disable-next-line:jsx-no-multiline-js
        <div class={`${prefixCls}-icon`} aria-hidden="true">
            {icon}
          </div>)}
        <div class={`${prefixCls}-content`}>
          <Marquee {...marqueeProps} prefixCls={prefixCls} text={this.$slots.default ? this.$slots.default()[0] : null}/>
        </div>
        {operationDom}
      </div>) : null;
    }
});
//# sourceMappingURL=index.jsx.map