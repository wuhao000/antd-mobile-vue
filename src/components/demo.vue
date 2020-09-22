<template>
  <router-view/>
</template>
<script lang="ts">
  import {Options, Vue} from 'vue-class-component';

  @Options({
    name: 'Components'
  })
  export default class Components extends Vue {
    public refreshing = false;

    get component(): string {
      return this.$route.query && this.$route.query['component'] as string;
    }

    public refresh() {
      this.refreshing = true;
      setTimeout(() => {
        this.refreshing = false;
      }, 2000);
    }
  }
</script>
<style lang="less" type="text/less">
  #app-content {
    padding: 0;
  }

  body, html {
    font-family: PingFang SC, Helvetica Neue, Hiragino Sans GB, Helvetica, Microsoft YaHei, Arial
  }
</style>
