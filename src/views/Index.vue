<template>
  <div class="index" id="index">
    <div class="wrapper header scaleBox">
      <Header :nav="components" :container-ref="containerRef"></Header>
    </div>
    <div id="containerBox1" class="container" ref="containerRef">
      <div class="scaleBox">
        <div
          class="part-wrapper"
          v-for="item in components"
          :data-name="item.name"
          :id="item.id"
        >
          <component
            :is="componentMap[item.component]"
            :key="item.name"
          ></component>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from "@/components/Header.vue";
import Part1 from "@/components/Part1.vue";
import Part2 from "@/components/Part2.vue";
import Part3 from "@/components/Part3.vue";
import Part4 from "@/components/Part4.vue";
import Part5 from "@/components/Part5.vue";

import { onMounted, ref } from "vue";
const containerRef = ref(null);
const componentMap: {
  [key: string]: typeof Part1;
} = {
  part1: Part1,
  part2: Part2,
  part3: Part3,
  part4: Part4,
  part5: Part5,
};

const components: Array<{
  id: string;
  name: string;
  component: string;
}> = [
  {
    id: "part1-wrapper",
    name: "首页",
    component: "part1",
  },
  {
    id: "part2-wrapper",
    name: "小游戏",
    component: "part2",
  },
  {
    id: "part3-wrapper",
    name: "可交互图像",
    component: "part3",
  },
  {
    id: "part4-wrapper",
    name: "工程模型 ",
    component: "part4",
  },
  {
    id: "part5-wrapper",
    name: "网页托管 ",
    component: "part5",
  },
];

const containerWidth = 1400;

function scaleToFix() {
  if (window.innerWidth > containerWidth) return;
  let scaleBoxes = document.querySelectorAll("div.scaleBox");
  let scale = window.innerWidth / containerWidth;
  console.log(scale.toFixed(2));
  scaleBoxes.forEach((el) => {
    (el as HTMLElement).style.zoom = scale;
  });
}

onMounted(() => {
  scaleToFix();
});
</script>
<style lang="scss" scoped>
.index {
  height: 100vh;
  width: 100vw;
  max-width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .scaleBox {
    transform-origin: top left;
    width: 1380px;
  }
  .container {
    width: fit-content;
    flex: 1;
    // overflow: scroll;
    overflow-x: hidden;
  }
}
</style>
