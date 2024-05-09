<template>
  <div class="swiper" :style="`justify-content:${align}`" ref="swiperRef">
    <div class="swiper-wrapper" ref="trackRef">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, nextTick, onMounted, type Ref } from "vue";

const props = defineProps({
  align: {
    type: String,
    default: "center",
  },
});

onMounted(() => {});
</script>
<style scoped lang="scss">
.swiper {
  display: flex;
  overflow: visible;
  width: 100%;
  .swiper-wrapper {
    display: flex;
    width: fit-content;
    gap: 20px;
    user-select: none;
    cursor: grabbing;
    // overflow-x: auto;
    // overflow-y: visible;
  }
}
</style>
