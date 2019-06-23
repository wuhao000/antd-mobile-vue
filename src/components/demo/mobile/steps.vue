<template>
  <div style="height:100%">
    <m-steps>
      <m-step>
        <ae-icon slot="icon"
                 type="check"></ae-icon>
      </m-step>
      <m-step>
        <img slot="icon" src="http://p.qpic.cn/wwhead/nMl9ssowtibVGyrmvBiaibzDkbTTtujEz586TdUkcdV2UE4N0Zq780loXUkq1Ua5lYkfI2Sluibm11I/0" class="avatar avatar--icon">
      </m-step>
    </m-steps>
  </div>
</template>
<script lang="ts">
  import PullRefresh from '@/packages/m-pull-refresh';
  import MTabs from '@/packages/m-tabs';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  Vue.use(PullRefresh);
  Vue.use(MTabs);

  @Component({
    name: 'Components'
  })
  export default class Components extends Vue {

    public refreshing = false;

    public refresh() {
      this.refreshing = true;
      setTimeout(() => {
        this.refreshing = false;
      }, 2000);
    }
  }
</script>
<style lang="less" type="text/less">
</style>
