import React, {Component} from 'react';
import Vue from 'vue';
import {Prop} from 'vue-property-decorator';
import ListItem from './list-item';
import style from './list-view.less';
const styles = style as any;
@Component({
  name: 'ListItemWrap'
})
class ListItemWrap extends Vue {

  @Prop({type: Array, required: true})
  public itemArr: any[];

  public render() {
    const {itemArr} = this;
    return (
      <div class={styles.listItemContent}>
        {[...itemArr].map((item, index) => {
          return <ListItem key={index} item={item.title}/>;
        })}
      </div>
    );
  }
}

export default ListItemWrap as any;
