import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import loadSprite from './load-sprite';
let Icon = class Icon extends Vue {
    mounted() {
        loadSprite();
    }
    render() {
        const _a = this, { type, size } = _a, restProps = tslib_1.__rest(_a, ["type", "size"]);
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
};
tslib_1.__decorate([
    Prop({ type: [String, Number], default: 'md' })
], Icon.prototype, "size", void 0);
tslib_1.__decorate([
    Prop({ type: String, required: true })
], Icon.prototype, "type", void 0);
tslib_1.__decorate([
    Prop(String)
], Icon.prototype, "color", void 0);
Icon = tslib_1.__decorate([
    Component({
        name: 'MIcon'
    })
], Icon);
export default Icon;
//# sourceMappingURL=index.jsx.map