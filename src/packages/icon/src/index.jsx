import { __rest } from "tslib";
import classnames from 'classnames';
import { defineComponent, onMounted } from 'vue';
import loadSprite from './load-sprite';
const Icon = defineComponent({
    inheritAttrs: false,
    name: 'MIcon',
    props: {
        size: { type: [String, Number], default: 'md' },
        type: { type: String, required: true },
        color: String
    },
    setup(props, { emit, attrs }) {
        onMounted(() => {
            loadSprite();
        });
        return {};
    },
    render() {
        const _a = this, { type, size } = _a, restProps = __rest(_a, ["type", "size"]);
        const cls = classnames('am-icon', `am-icon-${type}`, `am-icon-${size}`);
        const style = {};
        if (this.color) {
            style.color = this.color;
        }
        if (typeof this.size === 'number') {
            style.width = this.size + 'px';
            style.height = this.size + 'px';
        }
        return (<svg class={cls} style={style} {...{ props: restProps }}>
        <use xlinkHref={`#${type}`}/>
      </svg>);
    }
});
export default Icon;
//# sourceMappingURL=index.jsx.map