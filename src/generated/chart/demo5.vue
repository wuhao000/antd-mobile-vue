<template>
  <div class="demo">
    <code-box :code="code"
              :markdown="md">
    </code-box>
  </div>
</template>
<script lang="ts">
  import source from './demo5.txt';
  import md from '../../packages/chart/demo/demo5.md';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import CodeBox from '../../components/code-box.vue';

  @Component({
    name: 'Demo5',
    components: {CodeBox}
 })
  export default class Demo5 extends Vue {
    public code = source;
    public md = md;
  }
</script>
