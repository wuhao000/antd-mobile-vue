<template>
  <div class="demo">
    <span v-time="time"></span>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public time = new Date();
  }
</script>
