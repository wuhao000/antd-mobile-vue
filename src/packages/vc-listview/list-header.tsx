import React from 'react';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import style from './list-view.less';

const styles = style as any;
@Component({
  name: ''
})

class ListHeader extends Vue {

  @Prop({type: Function, required: true})
  public handleToggle: (arg: any) => any;
  @Prop({type: Number, required: true})
  public headerIdx: number;
  @Prop({type: String, required: true})
  public header: string;
  @Prop({type: Boolean})
  public isOpened: boolean;

  public handleClick(headerIdx) {
    this.handleToggle(headerIdx);
  }

  public render() {
    const {header, headerIdx, isOpened} = this;

    return (
      <div ref="header"
           class={styles.listHeader}
           onclick={() => {
             this.handleClick(headerIdx);
           }}>
        <span class={isOpened ? styles.icon + `${styles.icon} ${styles['arrow-down']}` : `${styles.icon} ${styles['arrow-right']}`}/>{header}</div>
    );
  }
}

export default ListHeader as any;
