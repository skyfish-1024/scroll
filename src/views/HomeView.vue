<template>
  <div id="view-box">
    <header>
      <div>cqupthub</div>
      <div class="right">
        <div
          v-for="i in 6"
          class="item"
          :class="i - 1 == current ? 'active' : ''"
          @click="scrollTo(i - 1)"
        >
          small-{{ i }}
        </div>
      </div>
    </header>
    <main id="app-body">
      <div class="container part" v-for="i in 6" :data-index="i - 1">
        <component :is="i == 3 ? BigBox : Box" :number="i"></component>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import Box from "@/components/Box.vue";
import BigBox from "@/components/BigBox.vue";
import { onMounted, ref, reactive } from "vue";

const containerWidth = 1380;
const current = ref(0);
function scaleToFix() {
  if (window.innerWidth > containerWidth) return;

  let appBody = document.getElementById("view-box");
  let scale = window.innerWidth / containerWidth;
  (appBody as HTMLElement).style.zoom = scale;
}

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
    threshold: 0.8,
  }
);

function initOB() {
  const parts = document.getElementsByClassName("part");
  for (let part of parts) {
    ob.observe(part);
  }
}

function scrollTo(index: number) {
  const parts = document.getElementsByClassName("part");
  parts[index].scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
}

window.addEventListener("resize", scaleToFix);
onMounted(() => {
  scaleToFix();
  initOB();
});
</script>
<style lang="scss">
#view-box {
}
#app-body {
  transform-origin: top left;
  position: relative;
  width: 1380px;
  // height: 100vh;
  margin: auto;
  overflow: visible;
  scroll-snap-type: y mandatory;
}
header {
  position: sticky;
  max-width: 1380px;
  top: 0px;
  margin: 0 auto;
  z-index: 1;
  box-sizing: border-box;
  padding: 5px 20px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  background-color: white;
  .right {
    display: flex;
    gap: 20px;

    .item {
      padding: 5px 10px;
      &:hover {
        background-color: #efefef;
        cursor: pointer;
      }
      &.active {
        border-bottom: 5px solid rgb(150, 150, 239);
      }
    }
  }
}
.container {
  width: 1380px;
  overflow: hidden;
  margin: 0 auto;
  scroll-snap-align: center;
}
main {
}
</style>
