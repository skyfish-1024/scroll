<template>
  <!-- 轮播组件 滑轨 -->
  <div class="swiper" ref="swiperRef">
    <!--轮播容器 滑块 -->
    <div class="swiper-wrapper" ref="trackRef">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, nextTick, onMounted, useSlots } from "vue";

const props = defineProps({
  align: {
    type: String,
    default: "center",
  },
});

let pc = window.innerWidth > 780;
const trackRef = ref(null);
const swiperRef = ref(null);

//对齐方式，对应的值
let AlignMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
};
//初始化swiper  可封装成对象
function initSwiper(container: HTMLElement, align = "center") {
  if (!container) {
    return;
  }
  //设置对齐样式
  container.style.justifyContent = AlignMap[align] || "center";

  //用swiper-wrapper-slide包裹子元素，劫持事件，在滑动过程中禁用事件，如点击事件
  let children = trackRef.value.children;
  let newChildren: Array<Node> = [];
  while (children.length) {
    let div = document.createElement("div");
    div.appendChild(children[0]);
    div.classList.add("swiper-wrapper-slide");
    newChildren.push(div);
  }
  newChildren.forEach((child) => {
    trackRef.value.append(child);
  });

  // 绑定滑动相关事件
  initEvents(container, align);
}

let translateX = 0; //鼠标按下时的位移距离
let mousedownX = 0; //鼠标按下的x坐标
let flag = false; //鼠标是否按下的标志，false不响应mousemove事件，及不滑动
let preX = 0; //鼠标上一次位置的坐标x
let perTime = 0; //鼠标上一次的时间戳
let v: number = 0; //鼠标移动速度

//位移临界值
let options = {
  minTranslateX: 0,
  maxTranslateX: 0,
};
//是否在位移中
let moved = false;

//定义移动函数
function move(dx: number) {
  let nextTranslateX = translateX + dx;
  //临界值判断
  if (nextTranslateX < options.minTranslateX) {
    nextTranslateX = options.minTranslateX;
  } else if (nextTranslateX > options.maxTranslateX) {
    nextTranslateX = options.maxTranslateX;
  }
  //滑动
  trackRef.value.style.transform = `translateX(${nextTranslateX}px)`;
}

//兼容移动端
function getClientX(e: MouseEvent | TouchEvent) {
  if ((e as MouseEvent)?.clientX) {
    return (e as MouseEvent).clientX;
  } else {
    return (e as TouchEvent).touches[0].clientX;
  }
}

function mousedownHandler(e: MouseEvent | TouchEvent) {
  if (pc) {
    e.preventDefault();
  }

  let clientX = getClientX(e);
  moved = false;

  trackRef.value.style.cursor = "grabbing";
  //清除之前的动画过渡效果
  (trackRef.value as HTMLElement).style.transition = "none";

  //记录当前初始位移
  translateX = parseInt(trackRef.value.style.transform.slice(11) || "0");

  //记录鼠标点下初始位置
  mousedownX = clientX;
  preX = mousedownX;
  perTime = new Date().getTime(); //记录鼠标点下时间戳，用于后续计算速度
  flag = true;
}

function mouseupHandler(e: MouseEvent | TouchEvent) {
  // e.preventDefault();
  trackRef.value.style.cursor = "grab";
  flag = false;
  if (v == 0) {
    return;
  }

  //模拟惯性
  let a = 1; //加速度
  let x = ((v * v) / (2 * a)) * 100 * Math.sign(v); //计算总位移
  let nextTranslateX =
    parseInt(trackRef.value.style.transform.slice(11) || "0") + x;
  if (nextTranslateX < options.minTranslateX) {
    nextTranslateX = options.minTranslateX;
  } else if (nextTranslateX > options.maxTranslateX) {
    nextTranslateX = options.maxTranslateX;
  }

  (trackRef.value as HTMLElement).style.transition = "0.5s";
  (
    trackRef.value as HTMLElement
  ).style.transform = `translateX(${nextTranslateX}px)`;
  if (translateX == nextTranslateX) {
    moved = false;
  }
  translateX = nextTranslateX;
  v = 0;
}
function mousemoveHandler(e: MouseEvent | TouchEvent) {
  if (pc) {
    e.preventDefault();
  }
  moved = true;
  if (!flag) {
    return;
  }
  let clientX = getClientX(e);

  //记录当前鼠标位置信息
  let curX = clientX;
  let curTime = new Date().getTime();
  v = (curX - preX) / (curTime - perTime);
  perTime = curTime;
  preX = curX;
  let dx = clientX - mousedownX;
  move(dx);
}
function handleClick(e: PointerEvent) {
  if (moved) {
    if (pc) {
      e.preventDefault();
      e.stopPropagation();
    }
  } else {
    moved = false;
  }
}

function initEvents(container: HTMLElement, align = "center") {
  if (!container.children && container.children.length != 1) {
    return;
  }

  //计算轨道和容器的宽度
  let containerWidth = container.getBoundingClientRect().width;
  let trackWidth = trackRef.value.getBoundingClientRect().width;
  if (containerWidth >= trackWidth) {
    return;
  }
  //根据对齐方式计算临界值
  switch (align) {
    case "start":
      options.maxTranslateX = 0;
      options.minTranslateX = containerWidth - trackWidth;
      break;
    case "center":
      options.maxTranslateX = -(containerWidth - trackWidth) / 2;
      options.minTranslateX = (containerWidth - trackWidth) / 2;
      break;
    case "end":
      options.maxTranslateX = trackWidth - containerWidth;
      options.minTranslateX = 0;
      break;
  }
  //初始化位移及其他参数
  trackRef.value.style.transform = "translateX(0px)";
  trackRef.value.addEventListener("mousedown", mousedownHandler);
  trackRef.value.addEventListener("mouseup", mouseupHandler);
  trackRef.value.addEventListener("mouseleave", (e) => {
    trackRef.value.style.cursor = "grab";
    flag = false;
    (trackRef.value as HTMLElement).style.transition = "none";
  });
  trackRef.value.addEventListener("mousemove", mousemoveHandler);

  trackRef.value.addEventListener("touchstart", mousedownHandler);
  trackRef.value.addEventListener("touchmove", mousemoveHandler);
  trackRef.value.addEventListener("touchend", mouseupHandler);
  trackRef.value.addEventListener("click", handleClick);
  trackRef.value.addEventListener("tap", handleClick);
}

onMounted(() => {
  initSwiper(swiperRef.value, props.align);
  window.addEventListener("resize", () => {
    pc = window.innerWidth > 780;
  });
});
</script>
<style lang="scss">
.swiper {
  display: flex;
  overflow: visible;
  width: 100%;
  .swiper-wrapper {
    display: flex;
    width: fit-content;
    gap: 20px;
    cursor: grabbing;
    .swiper-wrapper-slide {
      width: fit-content;
      position: relative;
      // &::after {
      //   content: "";
      //   position: absolute;
      //   background-color: red;
      //   top: 0;
      //   height: 100%;
      //   width: 100%;
      // }
    }
  }
}
</style>
