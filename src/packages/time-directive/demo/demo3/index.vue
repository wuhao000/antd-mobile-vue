<template>
  <div class="demo">
    <div v-time.pretty="time1"
         class="m-t-b">
    </div>
    <div v-time.pretty="time2"
         class="m-t-b">
    </div>
    <div v-time.pretty="time3"
         class="m-t-b">
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public time1 = new Date().getTime() - 60 * 12 * 1000;
    public time2 = new Date().getTime() - 60 * 65 * 1000;
    public time3 = new Date().getTime() - 60 * 60 * 1000 * 24 * 365;
  }
</script>
