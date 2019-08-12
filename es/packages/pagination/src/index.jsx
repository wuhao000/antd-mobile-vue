import * as tslib_1 from "tslib";
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Button from '../../button';
import Flex from '../../flex';
import { getComponentLocale } from '../../utils/getLocale';
let Pagination = class Pagination extends Vue {
    constructor() {
        super(...arguments);
        this.state = {
            current: this.value
        };
    }
    valueChanged(value) {
        if (this.state.current !== value) {
            this.state.current = value;
        }
    }
    onChange(p) {
        this.state.current = p;
        this.$emit('input', p);
    }
    render() {
        const { prefixCls, mode, total, simple } = this;
        const { current } = this.state;
        const locale = getComponentLocale(this.$props, this.$root, 'Pagination', () => require('./locale/zh_CN'));
        const { prevText, nextText } = locale;
        let markup = (<Flex>
          <Flex.Item class={`${prefixCls}-wrap-btn ${prefixCls}-wrap-btn-prev`}>
            <Button inline disabled={current <= 1} onClick={() => this.onChange(current - 1)}>
              {this.$slots.prevText || this.$slots['prev-text'] || prevText}
            </Button>
          </Flex.Item>
          {this.$slots.default ? (<Flex.Item>{this.$slots.default}</Flex.Item>) : (!simple && (<Flex.Item class={`${prefixCls}-wrap`} aria-live="assertive">
                    <span class="active">{current}</span>/<span>{total}</span>
                  </Flex.Item>))}
          <Flex.Item class={`${prefixCls}-wrap-btn ${prefixCls}-wrap-btn-next`}>
            <Button inline disabled={current >= total} onClick={() => this.onChange(this.state.current + 1)}>
              {this.$slots.nextText || this.$slots['next-text'] || nextText}
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
};
Pagination.contextTypes = {
    antLocale: PropTypes.object
};
tslib_1.__decorate([
    Prop({
        type: String,
        default: 'am-pagination'
    })
], Pagination.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ default: 'button' })
], Pagination.prototype, "mode", void 0);
tslib_1.__decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Pagination.prototype, "simple", void 0);
tslib_1.__decorate([
    Prop({
        type: Number,
        default: 1
    })
], Pagination.prototype, "value", void 0);
tslib_1.__decorate([
    Prop({
        type: Number,
        default: 0
    })
], Pagination.prototype, "total", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Pagination.prototype, "prevText", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Pagination.prototype, "nextText", void 0);
tslib_1.__decorate([
    Watch('value')
], Pagination.prototype, "valueChanged", null);
Pagination = tslib_1.__decorate([
    Component({
        name: 'Pagination'
    })
], Pagination);
export default Pagination;
//# sourceMappingURL=index.jsx.map