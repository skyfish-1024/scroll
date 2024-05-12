<template>
  <div id="part4" class="part">
    <div class="part-top">
      <div class="part-top-title">工程模型</div>
      <div class="part-top-content">
        <p class="part-top-content-p">
          仿真模型利用计算机技术对传统物理模型进行模拟，学生可以在学习过程中“真实”地感知模型的实际结构。这极大地改善了传统教学中理论与实践差异过大的问题。学生也可以在动手实践的过程中获得参与感和满足感，提升学习兴趣。
        </p>
        <p class="part-top-content-p">
          我团队可以为教材实现简单模型的定制化，同时，在过去的项目中，我们也积累了一些模板类项目，如您有类似需求可以使用模板进行模型的快速实现
        </p>
      </div>
    </div>
    <Swiper>
      <a
        v-for="item in swiperList"
        class="swiper-slide swiper-item"
        :href="item.url"
        target="_blank"
      >
        <img :src="item.img" alt="" class="pic" />
        <img src="@/assets/image/to.svg" alt="" class="to" />
        <div class="name">{{ item.name }}</div>
      </a>
    </Swiper>
    <div class="container1">
      <div class="sup-part-header">
        <div class="title">电子钢琴</div>
        <div class="sub-title">你的互联网钢琴替身</div>
      </div>
      <div class="main">
        <img src="@/assets/image/s-5-1.webp" alt="" />
      </div>
    </div>
    <Swiper class="swiper-slide" align="start">
      <div class="swiper-slide" style="min-width: 1950px; width: 1950px">
        <img
          src="@/assets/image/s-6.svg"
          style="transform: translateX(-194px)"
        />
      </div>
    </Swiper>
    <Swiper align="start">
      <div class="swiper-slide" style="min-width: 1950px; width: 1950px">
        <img
          src="@/assets/image/s-7.svg"
          style="transform: translateX(-194px)"
        />
      </div>
    </Swiper>
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
    name: "电子钢琴",
    img: getImage("s-5-1.webp"),
    url: "https://cqupthub.codeghub.com/project/art/piano/",
  },
  {
    name: "棘轮模型",
    img: getImage("s-5-2.png"),
    url: "https://cqupthub.codeghub.com/project/engineering/ratchet/",
  },
  {
    name: "魔方",
    img: getImage("s-5-3.png"),
    url: "https://cqupthub.codeghub.com/project/game/cube/",
  },
];
</script>

<style scoped lang="scss">
#part4 {
  padding-bottom: 0;
  .container1 {
    padding-top: 100px;
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
