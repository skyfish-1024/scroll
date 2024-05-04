<template>
  <div class="big-box" ref="boxRef" :style="`background-color:${color} ;`">
    <div class="side-nav">
      <div
        class="item"
        v-for="i in 3"
        @click="scrollTo(i - 1)"
        :class="i - 1 == current ? 'active' : ''"
      >
        big-{{ i }}
      </div>
    </div>
    <div class="sub-part" v-for="i in 3" :data-index="i - 1">
      <Box style="scroll-snap-align: center">big-{{ i }}</Box>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
const props = defineProps({
  number: {
    type: Number,
    default: 0,
  },
});
const boxRef = ref(null);
function Color() {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return "rgba(" + r + "," + g + "," + b + ",0.8)";
}
const color = Color();
import Box from "./Box.vue";
function scrollTo(index: number) {
  const parts = document.getElementsByClassName("sub-part");
  parts[index].scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
}
const current = ref(0);

function initOB() {
  const ob = new IntersectionObserver(
    (entries) => {
      let target: unknown;
      let ratio = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio > ratio) {
            ratio = entry.intersectionRatio;
            target = entry.target;
            return;
          }
        }
      });
      if (!target) return;
      const index = (target as Element).getAttribute("data-index") || "0";
      current.value = parseInt(index);
    },
    {
      root: boxRef.value,
      threshold: 0.5,
    }
  );
  const parts = document.getElementsByClassName("sub-part");
  for (let part of parts) {
    ob.observe(part);
  }
}
onMounted(() => {
  initOB();
});
</script>
<style lang="scss">
.big-box {
  height: 100vh;
  max-height: 800px;
  overflow: scroll;
  scroll-snap-type: y mandatory;
  position: relative;
  .side-nav {
    position: sticky;
    margin-left: 20px;

    top: 50%;
    .item {
      cursor: pointer;
      width: fit-content;
      padding: 5px;
      box-sizing: border-box;
      font-size: 42px;
      &.active {
        border-left: 5px solid rgb(191, 137, 242);
      }
    }
  }
}
</style>
