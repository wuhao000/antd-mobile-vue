import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'PropsType'
})
export default class PropsType extends Vue {
  @Prop({})
  public dataSource: any;
  @Prop({type: Number})
  public initialListSize?: number;
  @Prop({})
  public onEndReached?: (e?: any) => void;
  @Prop({type: Number})
  public onEndReachedThreshold?: number;
  @Prop({type: Number})
  public pageSize?: number;
  @Prop({})
  public renderHeader?: () => VNode;
  @Prop({})
  public renderFooter?: () => VNode;
  @Prop({})
  public renderRow: (
      rowData: any,
      sectionID: string | number,
      rowID: string | number,
      highlightRow?: boolean
  ) => VNode;
  @Prop({})
  public renderScrollComponent?: (p: any) => VNode;
  @Prop({})
  public renderSectionHeader?: (
      sectionData: any,
      sectionId: string | number
  ) => VNode;
  @Prop({})
  public renderSeparator?: (
      sectionID: string | number,
      rowID: string | number,
      adjacentRowHighlighted?: boolean
  ) => VNode;
  @Prop({type: Number})
  public scrollRenderAheadDistance?: number;
  @Prop({type: Boolean})
  public horizontal?: boolean;
  @Prop({})
  public onContentSizeChange?: (w: number, h: number) => void;
  @Prop({})
  public onScroll?: (e?: any) => void;
  @Prop({type: Number})
  public scrollEventThrottle?: number;
  @Prop({})
  public onLayout?: (event: any) => void;
  /** The following is new added and does not exist in react-native */
  @Prop({})
  public contentContainerStyle?: any;
  @Prop({})
  public renderBodyComponent?: () => VNode;
  @Prop({})
  public renderSectionWrapper?: () => VNode;
  @Prop({})
  public renderSectionBodyWrapper?: () => VNode;
  @Prop({type: Boolean})
  public useBodyScroll?: boolean;
  @Prop({})
  public pullToRefresh?: VNode;
  @Prop({type: String})
  public prefixCls?: string;
  @Prop({type: String})
  public listPrefixCls?: string;
  @Prop({type: String})
  public listViewPrefixCls?: string;
  @Prop({type: String})
  public sectionBodyClassName?: string;
}
