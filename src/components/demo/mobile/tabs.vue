<template>
  <div style="height:100%">
    <m-tabs style="height:100%;"
            tab-bar-position="top"
            tab-direction="horizontal"
            tabBarActiveTextColor="red"
            :tabs="[{title:'标签1'}, {title:'标签2'}]">
      <m-pull-refresh v-model="loading">
        <div class="m-t-b"
             style="display: flex; flex: 1;flex-direction: column">
          <div v-for="i in 100"
               :key="i">
            这是第一块内容
          </div>
        </div>
      </m-pull-refresh>
      <m-pull-refresh v-model="loading">
        <div style="display: flex;flex: 1;flex-direction: column">
          <div v-for="i in 100"
               :key="i">
            这是第二块内容
          </div>
        </div>
      </m-pull-refresh>
    </m-tabs>
  </div>
</template>
<script lang="ts">
  import PullRefresh from '@/packages/m-pull-refresh';
  import MTabs from '@/packages/m-tabs';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import {Watch} from 'vue-property-decorator';

  Vue.use(PullRefresh);
  Vue.use(MTabs);

  @Component({
    name: 'Components'
  })
  export default class Components extends Vue {

    public loading: boolean = false;

    @Watch('loading')
    public loadingChanged() {
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    }
  }
</script>
<style lang="less" type="text/less">
</style>
