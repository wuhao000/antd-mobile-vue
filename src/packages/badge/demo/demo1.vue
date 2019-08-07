<template>
  <div>
    <m-list>
      <m-list-item arrow="horizontal"
                   extra="extra content">
        <m-badge dot>
          <span :style="{ width : '26px', height : '26px', background : '#ddd', display : 'inline-block' }"/>
        </m-badge>
        <span :style="{ marginLeft : '12px' }">Dot badge</span>
      </m-list-item>
      <m-list-item arrow="horizontal"
                   thumb="https://zos.alipayobjects.com/rmsportal/faMhXAxhCzLvveJ.png">
        <template>
          <m-badge slot="extra"
                   text='77'
                   :overflowCount="55"></m-badge>
        </template>
        Content
      </m-list-item>
      <m-list-item>
        <m-badge corner
                 text='促'>
          <div class="corner-badge">Use corner prop</div>
        </m-badge>
      </m-list-item>
      <m-list-item class="special-badge">
        <m-badge slot="extra"
                 text="促"/>
        Custom corner
      </m-list-item>
      <m-list-item arrow="horizontal"
                   extra="extra">
        <m-badge :text='0'
                 :style="{ marginLeft : '12px' }">
          Text number 0
        </m-badge>
        <m-badge text='new'
                 :style="{ marginLeft : '12px' }"/>
      </m-list-item>
      <m-list-item>
        Marketing:
        <m-badge hot
                 text="减"
                 :style="{ marginLeft : '12px' }"/>
        <m-badge hot
                 text="惠"
                 :style="{ marginLeft : '12px' }"/>
        <m-badge hot
                 text="免"
                 :style="{ marginLeft : '12px' }"/>
        <m-badge hot
                 text="反"
                 :style="{ marginLeft : '12px' }"/>
        <m-badge hot
                 text="HOT"
                 :style="{ marginLeft : '12px' }"/>
      </m-list-item>
      <m-list-item>
        Customize
        <m-badge text="券"
                 :textStyle="{ marginLeft : '12px', padding : '0 3px', backgroundColor : '#f19736', borderRadius : '2px'
                 }"/>
        <m-badge text="NEW"
                 :textStyle="{ marginLeft : '12px', padding : '0 3px', backgroundColor : '#21b68a', borderRadius : '2px'
                 }"/>
        <m-badge text="自动缴费"
                 :textStyle="{
               marginLeft : '12px',
               padding : '0 3px',
        backgroundColor : '#fff',
        borderRadius : '2px',
        color : '#f19736',
        border : '1px solid #f19736'
        }"
        />
      </m-list-item>
    </m-list>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'BadgeDemo1'
  })
  export default class BadgeDemo1 extends Vue {
  }
</script>
<style lang="less">
  .corner-badge {
    height: 50px;
    width: 200px;
  }

  .special-badge .am-list-line {
    padding-right: 0;
  }

  .special-badge .am-list-line .am-list-extra {
    padding: 0;
    height: 44px;
  }

  .special-badge .am-badge {
    transform: rotate(45deg);
    transform-origin: right bottom;
    right: 0;
    top: 13px;
    width: 50px;
  }

  .special-badge .am-badge-text {
    border-radius: 1px;
  }
</style>
