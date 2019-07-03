import React from 'react';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'ListItem'
})
class ListItem extends Vue {

  @Prop({type: String, required: true})
  public item: string;

  public render() {
    const {item} = this;
    return (
      <p>{item}</p>
    );
  }
}

export default ListItem as any;
