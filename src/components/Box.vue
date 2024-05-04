<script setup lang="ts">
const props = defineProps({
  number: {
    type: Number,
    default: 0,
  },
});
function Color() {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return "rgba(" + r + "," + g + "," + b + ",0.8)";
}
const color = Color();
</script>

<template>
  <div class="box" :style="`background-color:${color} ;`">
    <slot> small-{{ number }} </slot>
  </div>
</template>
<style lang="scss">
.box {
  height: 100vh;
  max-height: 800px;
  font-size: 54px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
