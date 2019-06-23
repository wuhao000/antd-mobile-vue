const reg = '((/\\*\\*\\s(.*?)\\s\\*/\\s+)|(/\\*\\*\\s+(\\*\\s+\\S+\\s+)*\\*/\\s+))?(@Prop\\(([\\s\\S]*?)\\))\\s+public\\s(.*?):\\s(.*?);';
const propReg = new RegExp(reg, 'g');
const script = `
  /** ab c */
  @Prop({default: 'am-tabs'})
  public prefixCls: string;
  /** abc */
  @Prop({type: Boolean, default: true})
  public useOnPan: boolean;
  public contentPos: string = '';
  public isMoving = false;
  /**
   * 标签数据
   */
  @Prop({
    default: () => {
      return [];
    }
  })
  public tabs: Models.TabData[];
  /** TabBar's position | default: top */
  @Prop({default: 'top'})
  public tabBarPosition?: 'top' | 'bottom' | 'left' | 'right';
  @Prop({type: [String, Number], default: 0})
  public value?: number | string;
  @Prop({type: Number})
  public page?: number | string;
  @Prop({type: Boolean, default: true})
  public swipeable?: boolean;
  @Prop({default: 1})
  public prerenderingSiblingsNumber?: number;
  /**
   * 切换标签时是否有动画
   */
  @Prop({type: Boolean, default: true})
  public animated?: boolean;
  @Prop({type: Boolean, default: false})
  public destroyInactiveTab?: boolean;
  @Prop({type: Number, default: 0.3})
  public distanceToChangeTab?: number;
  @Prop({type: Boolean, default: true})
  public usePaged?: boolean;
  @Prop({type: String, default: 'horizontal'})
  public tabDirection?: 'horizontal' | 'vertical';
  /** 标签下划线样式 */
  @Prop({type: Object})
  public tabBarUnderlineStyle?: any;
  /** 标签页背景颜色 */
  @Prop({type: String})
  public tabBarBackgroundColor?: string;
  /** 激活的标签页文字颜色 */
  @Prop({type: String})
  public tabBarActiveTextColor?: string;
  /** 未激活的标签页文字颜色 */
  @Prop({type: String})
  public tabBarInactiveTextColor?: string;
  /** 标签栏文字样式 */
  @Prop({type: Object})
  public tabBarTextStyle?: any;
  /** use left instead of transform | default: false */
  @Prop({type: Boolean})
  public useLeftInsteadTransform?: boolean;
`;
const res = script.match(propReg);
res.forEach(it => {
  console.log(it);
  console.log('---------------------')
});
