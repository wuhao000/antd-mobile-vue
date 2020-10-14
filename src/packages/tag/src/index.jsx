import classnames from 'classnames';
import { defineComponent, reactive, watch } from 'vue';
import Icon from '../../icon';
import getDataAttr from '../../utils/get-data-attr';
import TouchFeedback from '../../vmc-feedback';
const Tag = defineComponent({
    name: 'Tag',
    props: {
        prefixCls: {
            type: String,
            default: 'am-tag'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        selected: {
            type: Boolean,
            default: false
        },
        closable: {
            type: Boolean,
            default: false
        },
        small: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit, slots }) {
        const state = reactive({
            selected: props.selected,
            closed: false
        });
        watch(() => props.selected, (selected) => {
            state.selected = selected;
        });
        const onClick = () => {
            const { disabled } = props;
            if (disabled) {
                return;
            }
            const isSelect = state.selected;
            state.selected = !isSelect;
            emit('change', !isSelect);
        };
        const onTagClose = () => {
            state.closed = true;
            emit('close');
        };
        return {
            onClick, state, onTagClose
        };
    },
    render() {
        var _a, _b;
        const { prefixCls, disabled, closable, small } = this;
        const wrapCls = classnames(prefixCls, {
            [`${prefixCls}-normal`]: !disabled && (!this.state.selected || small || closable),
            [`${prefixCls}-small`]: small,
            [`${prefixCls}-active`]: this.state.selected && !disabled && !small && !closable,
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-closable`]: closable
        });
        const closableDom = closable && !disabled && !small ? (<TouchFeedback activeClassName={`${prefixCls}-close-active`}>
          <div class={`${prefixCls}-close`} role="button" onClick={this.onTagClose.bind(this)} aria-label="remove tag">
            <Icon type="cross-circle" size="xs" aria-hidden="true"/>
          </div>
        </TouchFeedback>) : null;
        return !this.state.closed ? (<div {...getDataAttr(this.$props)} class={wrapCls} onClick={this.onClick}>
        <div class={`${prefixCls}-text`}>{(_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)}</div>
        {closableDom}
      </div>) : null;
    }
});
export default Tag;
//# sourceMappingURL=index.jsx.map