<template>
  <div class="demo">
    <code-box :code="code"
              :markdown="md">
    </code-box>
  </div>
</template>
<script lang="ts">
  import source from './demo4.txt';
  import md from '../../packages/carousel/demo/demo4.md';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import CodeBox from '../../components/code-box.vue';

  @Component({
    name: 'Demo4',
    components: {CodeBox}
 })
  export default class Demo4 extends Vue {
    public code = source;
    public md = md;
  }
</script>
