import { __rest } from "tslib";
import { filterHTMLAttrs } from '../../utils/dom';
import { defineComponent, onBeforeUpdate, ref } from 'vue';
import { getPxStyle, getTransformPropValue } from './utils';
const TabPane = defineComponent({
    inheritAttrs: false,
    name: 'TabPane',
    props: {
        role: {
            type: String
        },
        active: {
            type: Boolean
        },
        fixX: {
            type: Boolean,
            default: true
        },
        fixY: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        const layout = ref(null);
        const offsetX = ref(0);
        const offsetY = ref(0);
        const setLayout = (div) => {
            layout.value = div;
        };
        onBeforeUpdate(() => {
            if (props.active !== props.active) {
                if (props.active) {
                    offsetX.value = 0;
                    offsetY.value = 0;
                }
                else {
                    offsetX.value = layout.value.scrollLeft;
                    offsetY.value = layout.value.scrollTop;
                }
            }
        });
        return {
            setLayout,
            offsetX, offsetY
        };
    },
    render() {
        const _a = this, { active, fixX, fixY } = _a, props = __rest(_a, ["active", "fixX", "fixY"]);
        const style = Object.assign(Object.assign({}, fixX && this.offsetX ? getTransformPropValue(getPxStyle(-this.offsetX, 'px', false)) : {}), fixY && this.offsetY ? getTransformPropValue(getPxStyle(-this.offsetY, 'px', true)) : {});
        return <div style={style} {...filterHTMLAttrs(Object.assign(Object.assign({}, this.$props), this.$attrs))} ref={this.setLayout}>
      {this.$slots.default()}
    </div>;
    }
});
export default TabPane;
//# sourceMappingURL=tab-pane.jsx.map