<template>
  <div id="part3" class="part">
    <div class="part-top">
      <div class="part-top-title">可交互图像</div>
      <div class="part-top-content">
        <p class="part-top-content-p">
          智能图表交互可视化服务是一项专业的数字教育增强服务，利用最新的可视化技术和交互设计，将传统纸质教材中的图表、数据、函数公式等抽象、复杂的信息转化为生动、直观的交互式图表。我们的服务通过增强信息的可视化效果和互动性，帮助学生更好地理解和分析教材内容，提升学习效率和兴趣。
        </p>

        <p class="part-top-content-p">
          目前我平台技术团队总计研发了3种不同类型的游戏，包含编程类、益智类、答题闯关类，其中具有代表性的游戏有通过编写代码进行板块移动的编程类游戏”浮动布局：、益智类拼图游戏“电路拼图”、答题闯关类游戏“挑战理财师、数学知识类“黄金分割比”等。
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
      <div class="icon1">
        <img src="../assets/image/icon-1.png" alt="" />
      </div>
      <div class="sup-part-header">
        <div class="title">函数可视化</div>
        <a class="play">去试玩</a>
      </div>
      <div class="main">
        <img src="@/assets/image/func.png" alt="" />

        <div class="text-line" style="top: 150px; left: 0px; text-align: left">
          显示方程
        </div>
        <div class="text-line" style="top: 400px; left: 0px; text-align: left">
          <p>显示函数图像</p>
        </div>
        <div
          class="text-line"
          style="top: 120px; right: 0px; text-align: right"
        >
          <p>调整参数</p>
        </div>
      </div>
    </div>
    <Swiper align="flex-start">
      <div
        class="swiper-slide"
        style="min-width: 4400px; width: 4400px; overflow: hidden"
      >
        <img
          src="@/assets/image/s-3.webp"
          style="transform: translateX(-194px)"
        />
      </div>
    </Swiper>
    <Swiper align="flex-start">
      <div
        class="swiper-slide"
        style="min-width: 2500px; width: 2500px; overflow: hidden"
      >
        <img
          src="@/assets/image/s-4.svg"
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
    name: "函数可视化",
    img: getImage("s-2-1.png"),
    url: "https://cqupthub.codeghub.com/project/math/csfc/",
  },
  {
    name: "数据图表可视化",
    img: getImage("s-2-2.png"),
    url: "https://cqupthub.codeghub.com/project/math/calculator/#/?graph=H4sIAAAAAAAAA9VXS3uqSBD9QbPhIea6mEUQadvYeBUEune8wsPGMB8qj19%2FqzGJmkzmc3bJSpoU3V3nVJ1TSbrFkXoyx8VLroXjozZOThrN0cNDF4yXY03TPKLRv07j5dTQKk%2FStH9mbzE4b%2FLAW%2BerHPdUWTfMmalWJ%2FOVse6WzoYzY31YGaQnuZxT57EnhbsjTqSycp0vp4s%2BRqbEbDxOuoXC%2FEUfeJMj3KMldpNHpXlkaHLYKi5nUzzGxayD7zTqEYkZZsEck8POGpwlEYcXVv%2FYUGWzYw7txL2YusgilOarfZ3HJeexqp%2Bi%2FXpYJ0iuwhyPlw4%2BrpytCvs0K4M2pCAyMR5VuJsWelzc5UDskWz1tCXGVrKKaLRyaE%2F6tYgZhZ45gphuWew0yEuBu4xI%2F6gQh7aWEdV4zw%2FUhzsUMzhnp0JMC2dJAybOViN7eQL78GSud8y3hvyjbsCjDnxLwkUVwrOU%2BPrAT4zcUTzFNS75TqzhHIGjxPxMEuu1kp1C1eIYmcfE1svY04oY8VOYLybLOeAw543AG5fuKJoveKRaVaiMxB7VGWMsnotQaU8R4INzohDgkp7Pqam%2F4YmIK1nko5az%2FfolMdsoKvk%2BmK%2Br324bhcgt42naLv0sIfzyN99sRZ7v3y0hlu0XGVXr9tmvu%2BcP8YLDEJk581on8Kshf2JD7ns9g9o4MH%2FTBZ41CxU5C7zRwOsrZzkZMJKz5Fw3%2BTPUEyt5Hc4mDfWsKp7vRM02y2Kow91de%2FhS%2Fd9cpDdcbPJs9GTrVdTpUoC2aeBpEvPijnpNGio0ZbleRuXkgNEsjdGvNJney9HsA0dWSZ2YE2d3y9Hua47EXXzFTBJ0iYndSwybb897eQsemlaVlFuBVys4iZDZCb2I54uKSpsT9MDQS4DNYcAQcB24O%2FcGcLYQNV4GXls7qp5RhUuJyK94PFoDfvft8Wy3D3i%2F0SIk7vKK80V%2FuoGvPeQ%2BF%2BsFekK4woj3eL55YbbeDxqHzLd1FUKs0Ihwqp8EFxixLlSklNq6FHZ6jve3fMN5TVS6faSIfrrm%2FfG%2Bnrnig%2F6gOv86b%2FIx735lZIVlfMibX%2BqNlj%2B23m40%2BqruZPFMlUkdqlisC1bOVPBB7ZVXqNNUfJ%2F9tqV2WRDFEtyWWcXQhos7QF4ys39mDZzxtE4hmnRiDVNAYxmLzBpi2kxopHhPCwnOj6SfmPsnnT975LvOb5UsY6DvgM9%2BqI15%2FAKzDGgNP8K3%2B2GOmQ4%2B0IA3V%2BDHCrNH%2BZ311X%2BsL9oDjsa6ua0v3IC%2F1qBr2utvOfx6THqaZ5EPvcOUTHp682fwg0R%2B8%2BosA6%2F%2BHDPN8pv3TiPOAC7iF%2FH9s33mmJZuvVX4ePCsszc11Add9VwJ%2BrvYwAxHB6yrB8B56DvoRRF3no1En4PWwkxRhaj9Df1eBP5GO3MzGjSe3bWHfOufr15wNdsMe73yCbpkvVBvwzF4LBvqWlcD5HY33lCu08AnaQjcgp5Vcbk93u8Ln2apjhlRQwty1yx1w6fzNjdtgI%2FDxUdsefTOyZRf3ufX73e%2FyPu%2B4nvpu2vtJ28f9OTi7VaoMqi7FrjTT8JbzjOWKWHQFej%2F4zWH5%2FlXz0PVPbI5%2BR%2F83Tln8as%2BApzx1UxF3Rs%2B3%2Fj47vh%2FpUXKnV53VZ9t5E919K5FyLzRmZ8%2BA1ndff53yR%2FXvtmk7FIz%2BU3%2FvmHz3bX1y%2F9N0vtm4av8h56Z%2Ffts%2FK17xpUnUCd%2F%2FwEYc%2BhZQBEAAA%3D%3D",
  },
  {
    name: "思维导图",
    img: getImage("s-2-3.png"),
    url: "https://cqupthub.codeghub.com/project/common/draw-tool/#/mind/embed?id=8",
  },
  {
    name: "流程图",
    img: getImage("s-2-4.png"),
    url: "https://cqupthub.codeghub.com/project/common/draw-tool/#/flow/embed?id=6",
  },
];
</script>

<style scoped lang="scss">
#part3 {
  padding-bottom: 0;
  .container1 {
    padding-top: 100px;
    // padding-bottom: 250px;
    position: relative;
    .play {
      all: unset;
      margin-left: auto;
      border: 2px solid #15c5b8;
      border-radius: 20px;
      padding: 3px 20px;
      box-sizing: border-box;
      transition: all 0.5s;
      color: #10c4b7;
      cursor: pointer;
      &:hover {
        background-color: #15c5b8;
        color: #ffffff;
      }
    }
    .main {
      padding-top: 50px;
      position: relative;
      display: flex;
      justify-content: center;
    }
    .icon1 {
      position: absolute;
      left: -200px;
      bottom: -100px;
      overflow: hidden;
      height: 350px;
      width: 1000px;
      img {
        transform: translateX(-50%);
      }
    }
  }
}
</style>
