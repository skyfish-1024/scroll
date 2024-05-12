<template>
  <div id="part1">
    <img src="../assets/image/first.webp" alt="" />
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
#part1 {
  height: calc(100vh - var(--scale) * 60px);
  width: 100vw;
  // background-color: red;
  // scale: ;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
@media screen and (max-width: 780px) {
  #part1 {
    height: auto;
  }
}
</style>
