<template>
  <div id="part1">
    <img src="../assets/image/first.webp" alt="" />
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
//默认样式
#part1 {
  //默认高度
  height: calc(100vh - var(--scale) * 60px);
  width: 100vw;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
//媒体查询，移动端样式
@media screen and (max-width: 780px) {
  #part1 {
    height: auto;
  }
}
</style>
