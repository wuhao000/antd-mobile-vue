import classNames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'Notice'
})
export default class Notice extends Vue {

  @Prop(Number)
  public duration: number;
  @Prop(Function)
  public onClose: any;
  @Prop()
  public children: any;
  public closeTimer: any;
  @Prop(String)
  private prefixCls: string;
  @Prop(Boolean)
  private closable: boolean;

  public componentDidMount() {
    this.startCloseTimer();
  }

  public componentWillUnmount() {
    this.clearCloseTimer();
  }

  public close() {
    this.clearCloseTimer();
    this.onClose();
  }

  public startCloseTimer() {
    if (this.duration) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, this.duration * 1000);
    }
  }

  public clearCloseTimer() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  public render() {
    const componentClass = `${this.prefixCls}-notice`;
    const className = {
      [`${componentClass}`]: 1,
      [`${componentClass}-closable`]: this.closable
    };
    return (
      <div class={classNames(className)}>
        <div class={`${componentClass}-content`}>{this.$slots.default}</div>
        {this.closable ?
          <a tabIndex={0} onClick={this.close} class={`${componentClass}-close`}>
            <span class={`${componentClass}-close-x`}/>
          </a> : null
        }
      </div>
    );
  }
}
