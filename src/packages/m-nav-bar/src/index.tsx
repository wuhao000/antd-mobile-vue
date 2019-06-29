import classnames from 'classnames';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Icon from '../../m-icon';

@Component({
  name: 'NavBar'
})
class NavBar extends Vue {
  @Prop({
    type: String,
    default: 'am-navbar'
  })
  public prefixCls?: string;
  @Prop({type: String})
  public className?: string;
  @Prop({default: 'dark'})
  public mode?: 'dark' | 'light';
  @Prop({})
  public icon?: string | VNode;
  @Prop({})
  public leftContent?: string | VNode;
  @Prop({})
  public rightContent?: string | VNode;
  public static install: (Vue) => void;

  public render() {
    const {
      prefixCls,
      className,
      mode,
      icon
    } = this;
    const rightContent = this.$slots.rightContent || this.rightContent;
    const leftContent = this.$slots.leftContent || this.leftContent;
    return (
        <div
            class={classnames(className, prefixCls, `${prefixCls}-${mode}`)}
        >
          <div
              class={`${prefixCls}-left`}
              role="button"
              onClick={(e) => {
                this.$emit('left-click', e);
                this.$emit('leftClick', e);
              }}
          >
            {icon ? (
                <span class={`${prefixCls}-left-icon`} aria-hidden="true">
                  {typeof icon === 'string' ? <Icon type={icon}/> : icon}
                </span>
            ) : null}
            {leftContent}
          </div>
          <div class={`${prefixCls}-title`}>{this.$slots.default}</div>
          <div class={`${prefixCls}-right`}>{rightContent}</div>
        </div>
    );
  }
}

export default NavBar as any;
