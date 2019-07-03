import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import MListView from '../../vmc-list-view';
import handleProps from './handle-props';
import IndexedList from './indexed';
import ListViewPropsType from './props-type';

@Component({
  name: 'ListView'
})
class ListView extends ListViewPropsType {
  @Prop({})
  public onQuickSearch?: (sectionID: any, topId?: any) => void;
  @Prop({})
  public quickSearchBarStyle?: any;
  @Prop({})
  public quickSearchBarTop?: {
    value: string;
    label: string;
  };
  @Prop({type: Number})
  public delayTime?: number;
  @Prop({})
  public delayActivityIndicator?: any;
  public static DataSource = MListView.DataSource;
  public static IndexedList = IndexedList;
  public listviewRef: any;
  public scrollTo = (...args: any[]) => this.listviewRef.scrollTo(...args);
  public getInnerViewNode = () => this.listviewRef.getInnerViewNode();

  public render() {
    const {restProps, extraProps} = handleProps(this.props, false);
    return (
        <MListView
            ref={(el: any) => (this.listviewRef = el)}
            {...restProps}
            {...extraProps}
        />
    );
  }
}

export default ListView as any;
