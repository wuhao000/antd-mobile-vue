import React from 'react';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import handleProps from './handle-props';
import ListViewPropsType from './props-type';
import MListView from '../../vmc-list-view';

const IndexedList = MListView.IndexedList;

@Component({
  name: 'IndexedList'
})
class MIndexedList extends ListViewPropsType {
  @Prop({})
  public onQuickSearch?: (sectionID: any, topId?: any) => void;
  @Prop({})
  public quickSearchBarStyle?: React.CSSProperties;
  @Prop({})
  public quickSearchBarTop?: {
    value: string;
    label: string;
  };
  @Prop({type: Number})
  public delayTime?: number;
  @Prop({})
  public delayActivityIndicator?: React.ReactNode;
  public indexedListRef: any;

  public render() {
    const {prefixCls, listPrefixCls} = this;
    const {restProps, extraProps} = handleProps(this.$props, true);
    return (
        <IndexedList
            ref={(el: any) => (this.indexedListRef = el)}
            sectionHeaderClassName={`${prefixCls}-section-header ${listPrefixCls}-body`}
            sectionBodyClassName={`${prefixCls}-section-body ${listPrefixCls}-body`}
            {...restProps}
            {...extraProps}
        >
          {this.$slots.default}
        </IndexedList>
    );
  }
}
export default MIndexedList;
