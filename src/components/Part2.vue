<template>
  <div id="part2">
    <div class="part2-anchor">
      <Anchor
        :nav="list"
        direction="vertical"
        :selector="`game-wrapper`"
        container-id="part2"
        v-show="showAnchor && pc"
      ></Anchor>
    </div>
    <div v-for="item in list" class="game game-wrapper" :id="item.id">
      {{ item.name }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import Anchor from "./Anchor.vue";
interface navObj {
  id: string;
  name: string;
  component: string;
}
const list: Array<navObj> = [
  {
    name: "小游戏1",
    id: "game1",
    component: "game1",
  },
  {
    name: "小游戏2",
    id: "game2",
    component: "game2",
  },
  {
    name: "小游戏3",
    id: "game3",
    component: "game3",
  },
  {
    name: "小游戏4",
    id: "game4",
    component: "game4",
  },
];
const showAnchor = ref(false);
const pc = window.innerWidth > 1380;
const ob = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
        showAnchor.value = true;
      } else {
        showAnchor.value = false;
      }
    });
  },
  {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    root: document.getElementById("containerBox1"),
  }
);

function initOB() {
  const part = document.getElementById("part2");
  if (part) {
    ob.observe(part);
  }
}
onMounted(() => {
  initOB();
});
</script>
<style scoped lang="scss">
#part2 {
  font-size: 48px;
  font-weight: bold;
  .part2-anchor {
    position: fixed;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .game {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 400px;
    background: rgba(random(255), random(255), random(255), 0.8);
    &:nth-child(even) {
      height: 300px;
      background: rgba(random(255), random(255), random(255), 0.8);
    }
  }
}
</style>
