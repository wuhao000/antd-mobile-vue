<template>
  <div>
    <m-list section
            :touch-feedback="false">
      <m-list-item>
        <m-button>我是一个按钮</m-button>
      </m-list-item>
      <m-list-item>
        <m-button type="primary">primary</m-button>
      </m-list-item>
      <m-list-item>
        <m-button disabled
                  type="primary">primary disabled
        </m-button>
      </m-list-item>
      <m-list-item>
        <m-button type="warning">warning</m-button>
      </m-list-item>
      <m-list-item>
        <m-button disabled
                  type="warning">warning disabled
        </m-button>
      </m-list-item>
      <m-list-item>
        <m-button loading>loading</m-button>
      </m-list-item>
      <m-list-item>
        <m-button icon="check-circle-o">with icon</m-button>
      </m-list-item>
      <m-list-item>
        <m-button icon="https://gw.alipayobjects.com/zos/rmsportal/jBfVSpDwPbitsABtDDlB.svg">with custom icon</m-button>
      </m-list-item>
      <m-list-item>
        <m-button inline>inline</m-button>
      </m-list-item>
      <m-list-item>
        <m-button inline
                  icon="check-circle-o"
                  size="small">按钮
        </m-button>
        <m-button inline
                  icon="check-circle-o"
                  size="small">按钮
        </m-button>
      </m-list-item>
    </m-list>
  </div>
</template>
<script lang="ts">
  import List from '@/packages/list';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MButton from '../../index';

  Vue.use(List);
  @Component({
    name: 'Demo1',
    components: {MButton}
  })
  export default class Demo1 extends Vue {

  }
</script>
<style scoped>
</style>
