import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import Icon from '../../m-icon';
import getDataAttr from '../../mutils/getDataAttr';
import TouchFeedback from '../../vmc-feedback';

@Component({
  name: 'Tag'
})
class Tag extends Vue {
  @Prop({
    type: String,
    default: 'am-tag'
  })
  public prefixCls?: string;
  @Prop({
    type: Boolean,
    default: false
  })
  public disabled?: boolean;
  @Prop({
    type: Boolean,
    default: false
  })
  public selected?: boolean;
  @Prop({
    type: Boolean,
    default: false
  })
  public closable?: boolean;
  @Prop({
    type: Boolean,
    default: false
  })
  public small?: boolean;
  public state = {
    selected: this.selected,
    closed: false
  };

  @Watch('selected')
  public selectedChanged(selected: boolean) {
    this.state.selected = selected;
  }

  public onClick() {
    const {disabled} = this;
    if (disabled) {
      return;
    }
    const isSelect = this.state.selected;
    this.state.selected = !isSelect;
    this.$emit('change', !isSelect);
  }

  public onTagClose() {
    this.state.closed = true;
    this.$emit('close');
  }

  public render() {
    const {
      prefixCls,
      disabled,
      closable,
      small
    } = this;
    const wrapCls = classnames(prefixCls, {
      [`${prefixCls}-normal`]:
      !disabled && (!this.state.selected || small || closable),
      [`${prefixCls}-small`]: small,
      [`${prefixCls}-active`]:
      this.state.selected && !disabled && !small && !closable,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-closable`]: closable
    });

    const closableDom =
        closable && !disabled && !small ? (
            <TouchFeedback activeClassName={`${prefixCls}-close-active`}>
              <div
                  class={`${prefixCls}-close`}
                  role="button"
                  onClick={this.onTagClose.bind(this)}
                  aria-label="remove tag"
              >
                <Icon type="cross-circle" size="xs" aria-hidden="true"/>
              </div>
            </TouchFeedback>
        ) : null;

    return !this.state.closed ? (
        <div
            {...getDataAttr(this.$props)}
            class={wrapCls}
            onClick={this.onClick.bind(this)}
        >
          <div class={`${prefixCls}-text`}>{this.$slots.default}</div>
          {closableDom}
        </div>
    ) : null;
  }
}

export default Tag as any;
