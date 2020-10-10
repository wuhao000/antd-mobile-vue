<template>
  <m-list>
    <m-list-item wrap>
      <m-stepper slot="extra"
                 v-model="state.val"
                 :max="10"
                 :min="1"
                 :style="{width : '120px'}"/>
      范围1-10
    </m-list-item>
    <m-list-item wrap>
      <m-stepper slot="extra"
                 v-model="state.value2"
                 :style="{width : '120px'}"
                 step="2"/>
      步进2
    </m-list-item>
    <m-list-item wrap>
      <m-stepper slot="extra"
                 v-model="state.value3"
                 :style="{width : '120px'}" read-only
      />
      只读
    </m-list-item>
    <m-list-item wrap>
      <m-stepper slot="extra"
                 v-model="state.value4"
                 :style="{width : '120px'}"
                 :value-editable="false"/>
      禁止编辑
    </m-list-item>
    <m-list-item>
      <m-stepper slot="extra"
                 :defaultValue="3"
                 :max="10"
                 :min="1"
                 :style="{width : '120px'}" disabled/>
      禁用状态
    </m-list-item>
    <m-list-item>
      <m-stepper slot="extra"
                 v-model="state.value5"
                 :max="100"
                 :min="1"
                 :style="{width : '120px'}"/>
      字符串转数值
    </m-list-item>
  </m-list>
</template>
<script lang="ts">
import {defineComponent, reactive} from 'vue';

export default defineComponent({
  name: 'Demo',
  props: {},
  setup(props, {emit, slots}) {
    const state = reactive({
      val: 3,
      val1: 2,
      value4: 0,
      value3: 0,
      value2: 0,
      value5: '20'
    });


    const onChange = (val) => {
      console.log(val);
      // this.val = val;
    };


    return {
      onChange, state
    };
  }

});

</script>
