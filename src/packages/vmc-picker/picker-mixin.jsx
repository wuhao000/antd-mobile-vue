import { unwrapFragment } from '@/packages/utils/vue';
import { defineComponent } from 'vue';
const PickerItem = defineComponent({
    name: 'PickerItem',
    props: {
        value: {},
        label: {}
    }
});
export default function PickerMixin(ComposedComponent) {
    return defineComponent({
        name: 'PickerMixin',
        props: {
            value: {},
            disabled: {
                type: Boolean,
                default: false
            },
            selectedValue: {},
            itemStyle: {},
            prefixCls: {},
            indicatorStyle: {},
            indicatorClassName: {},
            defaultSelectedValue: {},
            noAnimate: {}
        },
        setup(props, { slots }) {
            const Item = PickerItem;
            const select = (value, itemHeight, scrollTo) => {
                var _a;
                const children = unwrapFragment(slots.default());
                if (children) {
                    for (let i = 0, len = children.length; i < len; i++) {
                        if (((_a = children[i].props) === null || _a === void 0 ? void 0 : _a.value) === value) {
                            selectByIndex(i, itemHeight, scrollTo);
                            return;
                        }
                    }
                    selectByIndex(0, itemHeight, scrollTo);
                }
            };
            const selectByIndex = (index, itemHeight, zscrollTo) => {
                if (index < 0 || index >= unwrapFragment(slots.default()).length || !itemHeight) {
                    return;
                }
                zscrollTo(index * itemHeight);
            };
            const computeChildIndex = (top, itemHeight, childrenLength) => {
                const index = Math.round(top / itemHeight);
                return Math.min(index, childrenLength - 1);
            };
            const doScrollingComplete = (top, itemHeight, fireValueChange) => {
                var _a;
                const children = unwrapFragment(slots.default());
                const index = computeChildIndex(top, itemHeight, children.length);
                const child = children[index];
                if (child) {
                    fireValueChange((_a = child.props) === null || _a === void 0 ? void 0 : _a.value);
                }
                else if (console.warn) {
                    console.warn('child not found', children, index);
                }
            };
            return {
                doScrollingComplete, computeChildIndex, select
            };
        },
        render() {
            return (<ComposedComponent {...Object.assign(Object.assign(Object.assign({}, this.$props), this.$attrs), { doScrollingComplete: this.doScrollingComplete, computeChildIndex: this.computeChildIndex, select: this.select })}>{this.$slots.default()}</ComposedComponent>);
        }
    });
}
//# sourceMappingURL=picker-mixin.jsx.map