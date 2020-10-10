<template>
  <div>
    <m-notice-bar :marqueeProps="{ loop : true, style : { padding : '0 7.5px' } }">
      Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
    </m-notice-bar>
    <m-white-space size="lg"/>
    <m-notice-bar mode="link"
                  @click="clicked">
      Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
    </m-notice-bar>
    <m-white-space size="lg"/>
    <m-notice-bar mode="closable">Remove the default icon.</m-notice-bar>
    <m-white-space size="lg"/>
    <m-notice-bar mode="closable">
      <template v-slot:icon>
        <m-icon size="xxs"
                type="check-circle-o"/>
      </template>
      Customized icon.
    </m-notice-bar>
    <m-white-space size="lg"/>
    <m-notice-bar mode="closable">
      <template v-slot:action>
        <span :style="{ color : '#a1a1a1' }">不再提示</span>
      </template>
      Closable demo for `actionText`.
    </m-notice-bar>
    <m-white-space size="lg"/>
    <m-notice-bar mode="link">
      <template v-slot:action>
        <span>去看看</span>
      </template>
      Link demo for `actionText`.
    </m-notice-bar>
  </div>
</template>
<script lang="ts">
import {message} from 'ant-design-vue';
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'Demo1',
  props: {},
  setup(props, {emit, slots}) {
    const clickCount = ref(0);
    const messages = ref(['你点了我', '你点我干嘛', '轻点点', '别再点了']);


    const clicked = () => {
      message.success(messages.value[clickCount.value % messages.value.length]);
      clickCount.value++;
    };


    return {clicked};
  }

});

</script>
<style lang="less" scoped>
</style>
