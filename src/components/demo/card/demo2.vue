<template>
  <div>
    <m-white-space size="lg"/>
    <m-card full>
      <m-card-header thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                     title="This is title">
        <span slot="extra">this is extra</span>
      </m-card-header>
      <m-card-body>
        <div>This is content of `Card`</div>
      </m-card-body>
      <m-card-footer content="footer content">
        <div slot="extra">extra footer content</div>
      </m-card-footer>
    </m-card>
  </div>
</template>
