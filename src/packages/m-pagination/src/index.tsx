import classnames from 'classnames';
import PropTypes from 'prop-types';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import Button from '../../m-button';
import Flex from '../../m-flex';
import {getComponentLocale} from '../../mutils/getLocale';

@Component({
  name: 'Pagination'
})
export default class Pagination extends Vue {
  @Prop({
    type: String,
    default: 'am-pagination'
  })
  public prefixCls?: string;
  @Prop({default: 'button'})
  public mode?: 'button' | 'number' | 'pointer';
  @Prop({
    type: Boolean,
    default: false
  })
  public simple?: boolean;
  @Prop({
    type: Number,
    default: 1
  })
  public value: number;
  @Prop({
    type: Number,
    default: 0
  })
  public total: number;
  @Prop({type: String})
  public prevText?: string;
  @Prop({type: String})
  public nextText?: string;
  public static contextTypes = {
    antLocale: PropTypes.object
  };

  public state = {
    current: this.value
  };
  public static install: (Vue) => void;

  @Watch('value')
  public valueChanged(value: number) {
    if (this.state.current !== value) {
      this.state.current = value;
    }
  }

  public onChange(p: number) {
    this.state.current = p;
    this.$emit('input', p);
  }

  public render() {
    const {prefixCls, mode, total, simple} = this;
    const {current} = this.state;
    const locale = getComponentLocale(
        this.$props,
        this.$root,
        'Pagination',
        () => require('./locale/zh_CN')
    );
    const {prevText, nextText} = locale;

    let markup = (
        <Flex>
          <Flex.Item
              class={`${prefixCls}-wrap-btn ${prefixCls}-wrap-btn-prev`}
          >
            <Button
                inline
                disabled={current <= 1}
                onClick={() => this.onChange(current - 1)}
            >
              {prevText}
            </Button>
          </Flex.Item>
          {this.$slots.default ? (
              <Flex.Item>{this.$slots.default}</Flex.Item>
          ) : (
              !simple && (
                  <Flex.Item class={`${prefixCls}-wrap`} aria-live="assertive">
                    <span class="active">{current}</span>/<span>{total}</span>
                  </Flex.Item>
              )
          )}
          <Flex.Item
              class={`${prefixCls}-wrap-btn ${prefixCls}-wrap-btn-next`}
          >
            <Button
                inline
                disabled={current >= total}
                onClick={() => this.onChange(this.state.current + 1)}
            >
              {nextText}
            </Button>
          </Flex.Item>
        </Flex>
    );
    if (mode === 'number') {
      markup = (
          <div class={`${prefixCls}-wrap`}>
            <span class="active">{current}</span>/<span>{total}</span>
          </div>
      );
    } else if (mode === 'pointer') {
      const arr: any = [];
      for (let i = 0; i < total; i++) {
        arr.push(
            <div
                key={`dot-${i}`}
                class={classnames(`${prefixCls}-wrap-dot`, {
                  [`${prefixCls}-wrap-dot-active`]: i + 1 === current
                })}
            >
              <span/>
            </div>
        );
      }
      markup = <div class={`${prefixCls}-wrap`}>{arr}</div>;
    }
    const cls = classnames(prefixCls);
    return (
        <div class={cls}>
          {markup}
        </div>
    );
  }
}
