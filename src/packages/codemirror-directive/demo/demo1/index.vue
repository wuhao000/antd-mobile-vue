<template>
  <div class="demo">
    <div v-codemirror="code"></div>
    <div v-codemirror.format="code2"
         style="margin-top:15px;"
         type="html"></div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import source from './index.txt';

  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public code = `@Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
  }`;
    public code2 = `<html><body><div>测试</div></body></html>`;
  }
</script>
