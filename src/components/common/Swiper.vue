<template>
  <div class="swiper" ref="swiperRef">
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

const trackRef = ref(null);
const swiperRef = ref(null);

let AlignMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
};
function initSwiper(container: HTMLElement, align = "center") {
  if (!container) {
    return;
  }
  //设置对齐
  container.style.justifyContent = AlignMap[align] || "center";
  let children = trackRef.value.children;

  let newChildren: Array<Node> = [];
  while (children.length) {
    let div = document.createElement("div");

    div.appendChild(children[0]);
    div.classList.add("swiper-wrapper-slide");
    newChildren.push(div);
    // div.append();
  }
  newChildren.forEach((child) => {
    trackRef.value.append(child);
  });

  // 绑定事件
  initEvents(container, align);
}

let translateX = 0;
let mousedownX = 0;
let flag = false;
let preX = 0;
let perTime = 0;
let v: number = 0;
let options = {
  minTranslateX: 0,
  maxTranslateX: 0,
};
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
  trackRef.value.style.transform = `translateX(${nextTranslateX}px)`;
}

function mousedownHandler(e: MouseEvent | TouchEvent) {
  e.preventDefault();
  let clientX = 0;
  moved = false;
  if ((e as MouseEvent)?.clientX) {
    clientX = (e as MouseEvent).clientX;
  } else {
    clientX = (e as TouchEvent).touches[0].clientX;
  }
  trackRef.value.style.cursor = "grabbing";
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
  e.preventDefault();
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
  e.preventDefault();
  moved = true;
  if (!flag) {
    return;
  }
  let clientX = 0;
  if ((e as MouseEvent)?.clientX) {
    clientX = (e as MouseEvent).clientX;
  } else {
    clientX = (e as TouchEvent).touches[0].clientX;
  }

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
    e.stopPropagation();
    e.preventDefault();
  } else {
    moved = false;
  }

  // console.log(e);
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
  //初始化位移及其他参数-->函数闭包
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
}

onMounted(() => {
  initSwiper(swiperRef.value, props.align);
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
    // user-select: none;
    cursor: grabbing;
    // user-select: none;

    // overflow-x: auto;
    // overflow-y: visible;
    .swiper-wrapper-slide {
      width: fit-content;
      height: fit-content;
      position: relative;
      &:after {
        // position: absolute;
        content: "";
        display: block;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        background-color: red;
      }
    }
  }
}
</style>
