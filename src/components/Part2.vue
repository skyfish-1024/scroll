<template>
  <div id="part2" class="part">
    <div class="part2-anchor">
      <Anchor
        :nav="list"
        direction="vertical"
        :selector="`game-wrapper`"
        container-id="part2"
        v-show="showAnchor"
      ></Anchor>
    </div>
    <div class="part-top">
      <div class="part-top-title">小游戏类</div>
      <div class="part-top-content">
        <p class="part-top-content-p">
          教育小游戏定制服务是一项创新的数字教育解决方案，将传统教材内容与互动式游戏设计相结合，根据客户的教材内容和教学需求定制开发，确保游戏与课程紧密相关；通过互动和娱乐的方式提高学生的学习动力和效果，增加学习的互动性和参与感；为学生提供一种全新的学习体验。同时，我们会针对多种设备适配，包括电脑、平板和智能手机等，方便学生随时随地进行学习。
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

    <div class="game game-wrapper" id="game1">
      <div class="icon1">
        <img src="../assets/image/icon-2.png" alt="" />
      </div>
      <div class="sup-part-header">
        <div class="title">编程类</div>
        <div class="sub-title">浮动布局（Flexible Box）</div>
      </div>
      <div class="main1">
        <img src="@/assets/image/game-1.png" alt="" />
        <p class="sub-title" style="margin-top: 40px">
          为练习flexible布局增添趣味性
        </p>
        <div class="text-line" style="top: 150px; left: 0px; text-align: left">
          关卡设置
        </div>
        <div class="text-line" style="top: 400px; left: 0px; text-align: left">
          <p>
            玩家输入代码，控制 <br />
            小球进入篮筐
          </p>
        </div>
        <div
          class="text-line"
          style="top: 360px; right: 0px; text-align: right"
        >
          <p>
            玩家可实时查看 <br />
            小球移动情况
          </p>
        </div>
      </div>
    </div>
    <div class="game game-wrapper" id="game2">
      <div class="icon2">
        <img src="../assets/image/icon-1.png" alt="" />
      </div>

      <div class="sup-part-header">
        <div class="title">益智类</div>
        <!-- <div class="sub-title">浮动布局（Flexible Box）</div> -->
      </div>
      <div class="main2">
        <img src="@/assets/image/game-2.png" alt="" />
        <div class="text" style="margin-left: 40px; flex: 1">
          <div class="title">电路拼图</div>
          <div class="describe">
            游戏介绍：玩家通过点击空板块相邻的图片板块与其的交换位置，完成拼图。拼图期间，用户可点击空白板块，查看原图。闯关成功后，观察图中电路的连接方式，体会物理的奥秘。
          </div>
        </div>
      </div>
      <div class="main3">
        <div class="text" style="margin-right: 40px; width: 330px">
          <div class="title">黄金分割比</div>
          <div class="describe">
            游戏介绍：玩家需要仔细观察黄金分割构图，将带有白色模糊背景的小图标拖动至分割比例的位置，观察1:0.618带来的审美体验。挑战成功后可点击蒙层查看原图。
          </div>
        </div>
        <img src="@/assets/image/game-3.png" alt="" />
      </div>
    </div>
    <div class="game game-wrapper" id="game3">
      <div class="icon3">
        <img src="../assets/image/icon-1.png" alt="" />
      </div>

      <div class="sup-part-header">
        <div class="title">闯关理财类</div>
        <!-- <div class="sub-title">浮动布局（Flexible Box）</div> -->
      </div>
      <div class="main4">
        <img src="@/assets/image/game-4.png" alt="" />
        <div class="text" style="margin-left: 80px; width: 600px">
          <div class="title">挑战理财师</div>
          <div class="describe">
            游戏介绍：玩家在游戏开始之前，为自己取一个昵称，即可开始答题，所有题目都答正确之后，即可获得证书，进入下一关。游戏过程中，玩家回答错误会有重新选择答案的机会，回答正确后也可查看解析。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import Anchor from "./common/Anchor.vue";
import Swiper from "./common/Swiper.vue";
import { getImage } from "../util/Assets";
import { type navObj } from "../components/common/nav";
const list: Array<navObj> = [
  {
    name: "编程类",
    id: "game1",
    component: "game1",
  },
  {
    name: "益智类",
    id: "game2",
    component: "game2",
    children: ["电路拼图", "黄金分割比"],
  },
  {
    name: "闯关理财类",
    id: "game3",
    component: "game3",
    children: ["挑战理财师"],
  },
];
const swiperList: Array<{
  name: string;
  img: string;
  url: string;
}> = [
  {
    name: "浮动布局",
    img: getImage("s-1-1.png"),
    url: "https://cqupthub.codeghub.com/project/web/flex-box/",
  },
  {
    name: "电路拼图",
    img: getImage("s-1-2.png"),
    url: "https://cqupthub.codeghub.com/project/engineering/circuit-jigsaw/",
  },
  {
    name: "答题闯关",
    img: getImage("s-1-3.png"),
    url: "https://cqupthub.codeghub.com/project/finance/financial-planner/",
  },
  {
    name: "黄金分割比",
    img: getImage("s-1-4.png"),
    url: "https://cqupthub.codeghub.com/project/art/golden-ratio/",
  },
];
const showAnchor = ref(false);
const pc = window.innerWidth > 780;
const ob = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
        showAnchor.value = true;
      } else {
        showAnchor.value = false;
      }
    });
  },
  {
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
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
  .part2-anchor {
    position: fixed;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }

  .game {
    padding-top: 140px;
    position: relative;
    &#game3 {
      padding-top: 100px;
    }
    .main1 {
      position: relative;
      text-align: center;
      justify-content: center;
      padding: 50px 0;
      .sub-title {
        font-size: 16px;
        font-weight: 250;
        height: fit-content;
        line-height: 16px;
        margin-left: 10px;
        color: rgba(3, 53, 49, 0.8);
      }
    }
    .main2,
    .main3,
    .main4 {
      // margin-top: 70px;
      padding: 50px 0;
      display: flex;
      align-items: center;
      .text {
        .title {
          line-height: 48px;
          font-size: 18px;
          letter-spacing: 0.54px;
          color: #033531;
        }
        .describe {
          font-size: 16px;
          font-weight: normal;
          line-height: 26px;
          letter-spacing: 0.48px;
          color: rgba(3, 53, 49, 0.8);
        }
      }
    }
    .main3 {
      justify-content: flex-end;
    }

    .icon1 {
      position: absolute;
      left: 400px;
      top: 90px;
    }
    .icon2 {
      position: absolute;
      z-index: -1;
      width: 200px;
      overflow: hidden;
      left: -200px;
      top: 20px;
      height: 500px;
      img {
        position: absolute;
        right: -320px;
        // background-color: red;
      }
    }
    .icon3 {
      position: absolute;
      z-index: -1;
      width: 1400px;
      overflow: visible;
      left: -280px;
      bottom: -100px;
      height: 390px;
      overflow: hidden;
      // background-color: red;
      img {
        position: absolute;
        right: 80px;
      }
    }
  }
}
</style>
