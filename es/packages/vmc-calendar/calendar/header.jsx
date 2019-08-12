import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let Header = class Header extends Vue {
    render() {
        const { title, locale = {}, showClear, closeIcon, clearIcon } = this;
        return (<div class={'header'}>
          <span class={'left'} onClick={() => this.$emit('cancel')}>{closeIcon}</span>
          <span class={'title'}>{title || locale.title}</span>
          {showClear &&
            <span class={'right'} onClick={() => this.$emit('clear')}>{clearIcon || locale.clear}</span>}
        </div>);
    }
};
tslib_1.__decorate([
    Prop({ type: String })
], Header.prototype, "title", void 0);
tslib_1.__decorate([
    Prop({})
], Header.prototype, "locale", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], Header.prototype, "showClear", void 0);
tslib_1.__decorate([
    Prop({ default: 'X' })
], Header.prototype, "closeIcon", void 0);
tslib_1.__decorate([
    Prop({})
], Header.prototype, "clearIcon", void 0);
Header = tslib_1.__decorate([
    Component({
        name: 'Header'
    })
], Header);
export default Header;
//# sourceMappingURL=header.jsx.map