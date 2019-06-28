<template>
  <div>
    <m-chart :data="data"
             :width="400">
      <m-chart-scale x
                     mask="MM/DD"
                     type="timeCat"
                     :tick-count="3"/>
      <m-chart-scale y
                     alias="日均温度"
                     :min="0"
                     :tick-count="5"/>
      <m-chart-point shape="smooth"
                     :style="{
          stroke : '#fff',
          lineWidth : 1
        }"/>
      <m-chart-line shape="smooth"/>
    </m-chart>
  </div>
</template>
<script lang="ts">
  export default {
    name: 'Demo2Index',
    data() {
      return {
        data: [
          {time: '2016-08-08 00:00:00', tem: 10},
          {time: '2016-08-08 00:10:00', tem: 22},
          {time: '2016-08-08 00:30:00', tem: 20},
          {time: '2016-08-09 00:35:00', tem: 26},
          {time: '2016-08-09 01:00:00', tem: 20},
          {time: '2016-08-09 01:20:00', tem: 26},
          {time: '2016-08-10 01:40:00', tem: 28},
          {time: '2016-08-10 02:00:00', tem: 20},
          {time: '2016-08-10 02:20:00', tem: 18}
        ]
      };
    }
  };
</script>

