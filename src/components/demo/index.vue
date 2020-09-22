<template>
  <div>
    <m-grid :data="data"
            @click="itemClicked">
    </m-grid>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import {useRouter} from 'vue-router';

export default defineComponent({
  name: 'MobileDemoHome',
  setup() {
    const data = [
      {icon: 'check-circle', text: '标签页', route: 'm-tabs'},
      {icon: 'check-circle', text: '下拉刷新', route: 'm-pull-request'},
      {icon: 'check-circle', text: '单选', route: 'm-radio'},
      {icon: 'check-circle', text: '复选', route: 'm-checkbox'}
    ];
    const router = useRouter();
    return {
      data,
      itemClicked(item) {
        router.push({
          name: item.route
        });
      }
    };
  }
});
</script>
<style lang="less">
</style>
