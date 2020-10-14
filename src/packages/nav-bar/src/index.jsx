import classnames from 'classnames';
import { defineComponent } from 'vue';
import Icon from '../../icon';
const NavBar = defineComponent({
    install: null,
    name: 'NavBar',
    props: {
        prefixCls: {
            type: String,
            default: 'am-navbar'
        },
        className: {
            type: String
        },
        mode: {
            default: 'dark'
        },
        icon: {
            type: [String, Object]
        },
        leftContent: {
            type: [String, Object]
        },
        rightContent: {
            type: [String, Object]
        }
    },
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        const { prefixCls, className, mode, icon } = this;
        const rightContent = (_f = (_c = (_b = (_a = this.$slots).rightContent) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : (_e = (_d = this.$slots)['right-content']) === null || _e === void 0 ? void 0 : _e.call(_d)) !== null && _f !== void 0 ? _f : this.rightContent;
        const leftContent = (_m = (_j = (_h = (_g = this.$slots).leftContent) === null || _h === void 0 ? void 0 : _h.call(_g)) !== null && _j !== void 0 ? _j : (_l = (_k = this.$slots)['left-content']) === null || _l === void 0 ? void 0 : _l.call(_k)) !== null && _m !== void 0 ? _m : this.leftContent;
        return (<div class={classnames(className, prefixCls, `${prefixCls}-${mode}`)}>
        <div class={`${prefixCls}-left`} role="button" onClick={(e) => {
            this.$emit('left-click', e);
            this.$emit('leftClick', e);
        }}>
          {icon ? (<span class={`${prefixCls}-left-icon`} aria-hidden="true">
                  {typeof icon === 'string' ? <Icon type={icon}/> : icon}
                </span>) : (_p = (_o = this.$slots).icon) === null || _p === void 0 ? void 0 : _p.call(_o)}
          {leftContent}
        </div>
        <div class={`${prefixCls}-title`}>{this.$slots.default()}</div>
        <div class={`${prefixCls}-right`}>{rightContent}</div>
      </div>);
    }
});
export default NavBar;
//# sourceMappingURL=index.jsx.map