<template>
  <div>
    <demo/>
  </div>
</template>
<script lang="ts">
  import demo from '@/packages/global/demo/index.vue';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Global',
    components: {demo}
  })
  export default class Global extends Vue {

  }
</script>
