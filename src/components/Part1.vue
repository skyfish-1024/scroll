<template>
  <div id="part1">首屏</div>
</template>
<script setup lang="ts"></script>
<style lang="scss">
#part1 {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  background-color: lightblue;
}
@media screen and (max-width: 1380px) {
  #part1 {
    height: 400px;
  }
}
</style>
