import {isVNode} from '../../utils/vnode';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import IconRes from '../../../mixins/icon-res';
import Badge from '../../m-badge';

@Component({
  name: 'Tab'
})
export default class Tab extends Vue {
  @Prop({type: Boolean})
  public dot?: boolean;
  @Prop({type: [String, Number]})
  public badge?: string | number;
  @Prop({type: Boolean})
  public selected?: boolean;
  @Prop()
  public selectedIcon?: any;
  @Prop()
  public icon?: any;
  @Prop({type: String})
  public title?: string;
  @Prop({type: String, default: 'am-tab-item'})
  public prefixCls: string;
  @Prop({type: String})
  public unselectedTintColor?: string;
  @Prop({type: String})
  public tintColor?: string;
  @Prop()
  public dataAttrs?: {
    [key: string]: string;
  };

  public renderIcon() {
    const {
      dot,
      badge,
      selected,
      selectedIcon,
      icon,
      title,
      prefixCls
    } = this;
    const IconRes2 = IconRes as any;
    const realIcon = selected ? selectedIcon : icon;
    const iconDom = realIcon ? (
      isVNode(realIcon) ? realIcon : <IconRes2
        class={`${prefixCls}-image`}
        props={
          {
            type: realIcon
          }
        }
      />
    ) : null;
    if (badge) {
      return (
        <Badge text={badge} class={`${prefixCls}-badge tab-badge`}>
          {' '}
          {iconDom}{' '}
        </Badge>
      );
    }
    if (dot) {
      return (
        <Badge dot class={`${prefixCls}-badge tab-dot`}>
          {iconDom}
        </Badge>
      );
    }
    return iconDom;
  }

  public onClick() {
    this.$emit('click');
  }

  public render() {
    const {
      title,
      prefixCls,
      selected,
      unselectedTintColor,
      tintColor
    } = this;
    const iconColor = selected ? tintColor : unselectedTintColor;
    return (
      <div
        {...this.dataAttrs}
        onClick={this.onClick}
        class={`${prefixCls}`}
      >
        <div class={`${prefixCls}-icon`} style={{color: iconColor}}>
          {this.renderIcon()}
        </div>
        <p
          class={`${prefixCls}-title`}
          style={{color: selected ? tintColor : unselectedTintColor}}
        >
          {title}
        </p>
      </div>
    );
  }
}
