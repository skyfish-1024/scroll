<template>
  <div class="index" id="index">
    <div class="wrapper header scaleBox">
      <Header :nav="components" :container-ref="containerRef"></Header>
    </div>

    <div id="containerBox1" class="container" ref="containerRef">
      <div class="" ref="scaleBoxRef">
        <div
          class="part-wrapper"
          :class="index != 0 ? 'scaleBox' : ''"
          v-for="(item, index) in components"
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
    <div class="toTop" @click="backTop" ref="showToTopRef">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        fill="none"
        version="1.1"
        width="45"
        height="45"
        viewBox="0 0 45 45"
      >
        <g>
          <g>
            <ellipse
              cx="22.5"
              cy="22.5"
              rx="21.5"
              ry="21.5"
              fill-opacity="0"
              stroke-opacity="1"
              stroke="#258398"
              fill="none"
              stroke-width="2"
            />
          </g>
          <g transform="matrix(0,-1,1,0,-17.864013671875,47.135986328125)">
            <path
              d="M15.635986328125,38.86396C15.083702328125,38.86396,14.635986328125,39.31167,14.635986328125,39.86396C14.635986328125,40.41624,15.083701328125,40.86396,15.635986328125,40.86396C15.635986328125,40.86396,15.635986328125,38.86396,15.635986328125,38.86396C15.635986328125,38.86396,15.635986328125,38.86396,15.635986328125,38.86396ZM33.843086328125,40.57107C34.233586328125,40.18055,34.233586328125,39.547380000000004,33.843086328125,39.15686C33.843086328125,39.15686,27.479086328125,32.792897,27.479086328125,32.792897C27.088586328125,32.4023675,26.455486328124998,32.4023675,26.064886328125,32.792897C25.674386328125,33.183417,25.674386328125,33.81658,26.064886328125,34.20711C26.064886328125,34.20711,31.721786328125,39.86396,31.721786328125,39.86396C31.721786328125,39.86396,26.064886328125,45.5208,26.064886328125,45.5208C25.674386328125,45.9113,25.674386328125,46.5445,26.064886328125,46.935C26.455486328124998,47.3256,27.088586328125,47.3256,27.479086328125,46.935C27.479086328125,46.935,33.843086328125,40.57107,33.843086328125,40.57107C33.843086328125,40.57107,33.843086328125,40.57107,33.843086328125,40.57107ZM15.635986328125,40.86396C15.635986328125,40.86396,33.135986328125,40.86397,33.135986328125,40.86397C33.135986328125,40.86397,33.135986328125,38.86396,33.135986328125,38.86396C33.135986328125,38.86396,15.635986328125,38.86396,15.635986328125,38.86396C15.635986328125,38.86396,15.635986328125,40.86396,15.635986328125,40.86396C15.635986328125,40.86396,15.635986328125,40.86396,15.635986328125,40.86396Z"
              fill="#258398"
              fill-opacity="1"
            />
          </g>
        </g>
      </svg>
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

import Swiper from "swiper";

import { onMounted, ref, type Ref } from "vue";
const containerRef: Ref = ref(null);
const scaleBoxRef: Ref = ref(null);
const showToTopRef: Ref = ref(null);
const showToTop = ref(false);
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

const containerWidth = 1460;

function scaleToFix() {
  if (window.innerWidth > containerWidth) return;
  let scaleBoxes = document.querySelectorAll("div.scaleBox");
  let scale = window.innerWidth / containerWidth;
  scaleBoxes.forEach((el) => {
    (el as HTMLElement).style.cssText = "zoom:" + scale;
  });
  document.documentElement.style.setProperty("--scale", scale + "");
}

const backTop = () => {
  if (scaleBoxRef.value) {
    scaleBoxRef.value.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    }); // 开启平滑滚动动画
  }
};

const initSwiper = () => {
  new Swiper(".swiper", {
    slidesPerView: "auto",
    freeMode: true,
    grabCursor: true,
  });
};

onMounted(() => {
  scaleToFix();
  // initSwiper();
  (containerRef.value as HTMLElement).addEventListener("scroll", (e) => {
    if ((containerRef.value as HTMLElement).scrollTop == 0) {
      //隐藏
      (showToTopRef.value as HTMLElement).style.opacity = "0";
    } else {
      //显示
      (showToTopRef.value as HTMLElement).style.opacity = "1";
    }
  });
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
    width: 1440px;
    box-sizing: content-box;
    margin: auto;
    // padding: 0 200px;
  }
  .container {
    width: fit-content;
    position: relative;
    flex: 1;
    // overflow: scroll;
    overflow-x: hidden;
  }
  .toTop {
    position: fixed;
    opacity: 0;
    transition: 0.3s;
    // background-color: yellow;
    z-index: 10000;
    width: 40px;
    height: 40px;
    bottom: 40px;
    right: 10vw;
    cursor: pointer;
    svg {
      path,
      ellipse {
        transition: all 0.4s;
      }
    }
    &:hover {
      svg {
        path {
          fill: darken($color: #06514c, $amount: 0.5);
        }
        ellipse {
          stroke: darken($color: #06514c, $amount: 0.5);
        }
      }
    }
  }
}
</style>
