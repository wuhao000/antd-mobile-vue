import classNames from 'classnames';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop, Provide} from 'vue-property-decorator';

@Component({
  name: 'Step'
})
export default class Steps extends Vue {

  @Prop(String)
  public icon: string;
  @Prop({type: String, default: 'am-steps'})
  public prefixCls?: string;
  @Prop({type: String, default: 'ant'})
  public iconPrefix?: string;
  @Prop({type: String, default: 'vertical'})
  public direction?: string;
  @Prop({type: String, default: 'vertical'})
  public labelPlacement?: string;
  @Prop({type: String, default: 'process'})
  public status?: 'wait' | 'process' | 'finish' | 'error';
  @Prop({type: String, default: ''})
  public size?: string;
  @Prop({type: Boolean, default: false})
  public progressDot?: boolean | any;
  @Prop({type: Number, default: 0})
  public current?: number;
  @Provide('steps')
  public steps = this;

  public render() {
    const {
      prefixCls, direction,
      labelPlacement, iconPrefix, status, size, current, progressDot,
      ...restProps
    } = this;
    const adjustedlabelPlacement = !!progressDot ? 'vertical' : labelPlacement;
    const classString = classNames(prefixCls, `${prefixCls}-${direction}`, {
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-label-${adjustedlabelPlacement}`]: direction === 'horizontal',
      [`${prefixCls}-dot`]: !!progressDot
    });

    return (
        <div class={classString} {...restProps}>
          {
            this.$slots.default.map((child: VNode, index) => {
              if (!child) {
                return null;
              }
              const childProps = {
                stepNumber: index + 1,
                prefixCls,
                iconPrefix,
                icon: child.componentOptions.propsData['icon'] || '',
                wrapperStyle: {},
                progressDot,
                status: child.componentOptions.propsData['status'] || '',
                class: ''
              };
              let icon = this.icon;
              if (!icon) {
                if (index < current) {
                  // 对应 state: finish
                  icon = 'check-circle-o';
                } else if (index > current) {
                  // 对应 state: wait
                  icon = 'ellipsis';
                  childProps.class = 'ellipsis-item';
                }
                if ((status === 'error' && index === current)
                    || child.componentOptions.propsData['status'] === 'error') {
                  icon = 'cross-circle-o';
                }
              }
              if (icon) {
                childProps.icon = icon;
              }
              // fix tail color
              if (status === 'error' && index === current! - 1) {
                childProps.class = `${prefixCls}-next-error`;
              }
              if (!child.componentOptions.propsData['status']) {
                if (index === current) {
                  childProps.status = status;
                } else if (index < current!) {
                  childProps.status = 'finish';
                } else {
                  childProps.status = 'wait';
                }
              }
              Object.keys(childProps).forEach(key => {
                child.componentOptions.propsData[key] = childProps[key];
              });
              return child;
            })
          }
        </div>
    );
  }
}
