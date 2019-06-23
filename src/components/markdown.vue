<template>
  <div v-hljs
       v-html="source"
       class="markdown-body">
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import {Prop} from 'vue-property-decorator';

  @Component({
    name: 'Markdown'
  })
  export default class Markdown extends Vue {
    @Prop({type: String})
    public source: string;
  }
</script>
