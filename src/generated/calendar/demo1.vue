<template>
  <div class="demo">
    <code-box :code="code"
              :markdown="md">
    </code-box>
  </div>
</template>
<script lang="ts">
  import source from './demo1.txt';
  import md from '../../packages/calendar/demo/demo1.md';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import CodeBox from '../../components/code-box.vue';

  @Component({
    name: 'Demo1',
    components: {CodeBox}
 })
  export default class Demo1 extends Vue {
    public code = source;
    public md = md;
  }
</script>
