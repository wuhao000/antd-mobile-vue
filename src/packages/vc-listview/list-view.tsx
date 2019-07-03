import React, {Component} from 'react';
import Vue from 'vue';
import {Prop} from 'vue-property-decorator';
import ListHeader from './list-header';
import ListItemWrap from './list-item-wrap';
import style from './list-view.less';

const styles = style as any;

@Component({
  name: 'ListView'
})
class ListView extends Vue {

  @Prop({type: Array, required: true})
  public data: any[];
  @Prop({type: String, required: true})
  public headerAttrName: string;
  @Prop({type: String, required: true})
  public itemsAttrName: string;

  public state = {
    data: this.data
  };

  public handleToggle(index) {
    let newData = [...this.state.data];
    newData[index].isOpened = !newData[index].isOpened;
    this.data = newData;
  }

  public render() {
    const {headerAttrName, itemsAttrName} = this;
    const {data} = this.state;

    return (
      <div ref="listview">
        <ul class={styles.listviewWrap}>
          {
            data.map((dataItem, index) => {
              const header = dataItem[headerAttrName];
              const itemArr = dataItem[itemsAttrName];
              const {isOpened, height} = dataItem;

              return (
                <div key={index}>
                  <li>
                    <ListHeader
                      header={header}
                      headerIdx={index}
                      isOpened={isOpened}
                      handleToggle={() => this.handleToggle(index)}
                    />
                    <div class={styles.listContent}>
                      <ListItemWrap
                        itemArr={itemArr}
                      />
                    </div>
                  </li>
                </div>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default ListView;
