<template>
  <div>
    <m-grid :data="data"
            @click="itemClicked">
    </m-grid>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'MobileDemoHome'
  })
  export default class MobileDemoHome extends Vue {

    public data = [
      {icon: 'check-circle', text: '标签页', route: 'm-tabs'},
      {icon: 'check-circle', text: '下拉刷新', route: 'm-pull-request'},
      {icon: 'check-circle', text: '单选', route: 'm-radio'},
      {icon: 'check-circle', text: '复选', route: 'm-checkbox'}
    ];

    public itemClicked(item) {
      this.$router.push({
        name: item.route
      });
    }
  }
</script>
<style lang="less">
</style>
