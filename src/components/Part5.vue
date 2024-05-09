<template>
  <div id="part5" class="part">
    <div class="part-top">
      <div class="part-top-title">网页托管</div>
      <div class="part-top-content" style="text-align: center">
        <p class="part-top-content-p">
          如果您有一套电子教学方案，但与教材不在同一平台下，我们提供“网页托管”服务。让教学与实践不再分家
        </p>
      </div>
    </div>
    <Swiper>
      <a
        v-for="item in swiperList"
        class="swiper-item swiper-slide"
        :href="item.url"
        target="_blank"
        style="width: 557px; height: 452px"
      >
        <img :src="item.img" alt="" class="pic" />
        <img src="@/assets/image/to.svg" alt="" class="to" />
        <div class="name">{{ item.name }}</div>
      </a>
    </Swiper>
    <Swiper align="flex-start">
      <div class="swiper-slide" style="min-width: 1950px; width: 1950px">
        <img
          src="@/assets/image/s-9.svg"
          style="transform: translateX(-194px)"
        />
      </div>
    </Swiper>
    <div class="container1">
      <div class="sup-part-header">
        <div class="title">苗绣记忆</div>
        <div class="sub-title">一起来感受非遗文化的魅力</div>
      </div>
      <div class="main">
        <img src="@/assets/image/s-10.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Swiper from "./common/Swiper.vue";
import { getImage } from "../util/Assets";
const swiperList: Array<{
  name: string;
  img: string;
  url: string;
}> = [
  {
    name: "园艺技术",
    img: getImage("s-8-1.png"),
    url: "https://cqupthub.codeghub.com/project/art/env-design/unit-8/task-8/",
  },
  {
    name: "苗绣技艺",
    img: getImage("s-8-2.png"),
    url: "https://cqupthub.codeghub.com/project/traditional/PomegranateEmbroidery/",
  },
];
</script>

<style scoped lang="scss">
#part5 {
  .container1 {
    margin-top: 50px;
    .main {
      margin-top: 50px;
      text-align: center;
      img {
        width: 100%;
      }
    }
  }
}
</style>
