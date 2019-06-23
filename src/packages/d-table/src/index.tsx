import {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {TableColumn} from '../../../../types/components/d-table';
import ProxyComponent from '../../../mixins/proxy-component';
import Empty from '../../d-empty';
import localeProvider from '../../locale-provider/zh_CN';


@Component({
  name: 'DTable'
})
export default class DTable extends ProxyComponent {

  @Prop({default: false})
  public pagination: any;
  public static install: (Vue) => void;
  @Prop({type: Boolean, default: false})
  public striped: boolean;
  @Prop({type: [String, Object]})
  public emptyText: string | VNode;
  @Prop({type: Object, default: () => localeProvider.Table})
  public locale: object;
  @Prop({type: String, default: 'ant-table'})
  public prefixCls: string;
  @Prop({type: Array})
  public dataSource: any[];
  @Prop({type: Array})
  public columns: TableColumn[];

  public getInputComponent() {
    return window.antd.Table;
  }

  get cssClass(): {} {
    return {[this.prefixCls + '-striped']: this.striped};
  }

  public getProps(): {} {
    const locale: any = Object.assign({}, this.locale);
    locale.emptyText = this.emptyText || <Empty/>;
    return {
      locale,
      columns: this.getColumns()
    };
  }

  private getColumns() {
    const columns = this.columns.map(col => Object.assign({}, col));
    columns.forEach(column => {
      if (column.dataType) {
        if (!column.scopedSlots) {
          column.scopedSlots = {};
        }
        if (column.dataType === 'date') {
          if (!column.scopedSlots.customRender && !column.customRender) {
            column.customRender = (value) => {
              if (column.dataTypeOptions && column.dataTypeOptions.pretty) {
                return <span vTime_pretty={value}
                             attrs={column.dataTypeOptions || {}}/>;
              } else {
                return <span vTime={value}
                             attrs={column.dataTypeOptions || {}}/>;
              }
            };
          }
        } else if (column.dataType === 'number') {
          if (!column.align) {
            column.align = 'right';
          }
        } else if (column.dataType === 'index') {
          column.align = 'center';
          if (!column.scopedSlots.customRender && !column.customRender) {
            column.customRender = (value, record, index) => {
              return <span>{index + 1}</span>;
            };
          }
        }
      }
    });
    return columns;
  }
}
