<template>
  <m-wing-blank>
    <m-carousel autoplay infinite vertical
                class="my-carousel"
                :autoplayInterval="300"
                :dots="false"
                :dragging="false"
                :resetAutoplay="false"
                :speed="200"
                :swiping="false">
      <div v-for="type in ['ring', 'ruby', 'iPhone', 'iPod', 'sorry', 'tourism', 'coke', 'ticket', 'note']"
           class="v-item"
           :key="type">{{type}}
      </div>
    </m-carousel>
  </m-wing-blank>
</template>
