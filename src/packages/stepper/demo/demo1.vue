<template>
  <m-list>
    <m-list-item wrap>
      <m-stepper :style="{width : '120px'}"
                 :max="10"
                 :min="1"
                 slot="extra"
                 v-model="state.val"/>
      范围1-10
    </m-list-item>
    <m-list-item wrap>
      <m-stepper :style="{width : '120px'}"
                 slot="extra"
                 step="2"
                 v-model="state.value2"/>
      步进2
    </m-list-item>
    <m-list-item wrap>
      <m-stepper :style="{width : '120px'}" read-only
                 slot="extra"
                 v-model="state.value3"
      />
      只读
    </m-list-item>
    <m-list-item wrap>
      <m-stepper :style="{width : '120px'}"
                 slot="extra"
                 :value-editable="false"
                 v-model="state.value4"/>
      禁止编辑
    </m-list-item>
    <m-list-item>
      <m-stepper :style="{width : '120px'}"
                 slot="extra"
                 :max="10"
                 :min="1"
                 :defaultValue="3" disabled/>
      禁用状态
    </m-list-item>
    <m-list-item>
      <m-stepper :style="{width : '120px'}"
                 v-model="state.value5"
                 slot="extra"
                 :max="100"
                 :min="1"/>
      字符串转数值
    </m-list-item>
  </m-list>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Demo'
  })
  export default class Demo extends Vue {

    public state = {
      val: 3,
      val1: 2,
      value4: 0,
      value3: 0,
      value2: 0,
      value5: '20'
    };

    public onChange(val) {
      console.log(val);
      // this.val = val;
    }

  }
</script>
