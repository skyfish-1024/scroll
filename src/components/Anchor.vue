<template>
  <div class="anchor">
    <div class="nav" :class="direction">
      <div
        class="item"
        :class="index == currentIndex ? 'active' : ''"
        v-for="(item, index) in nav"
        @click="clickNav(item.id, index)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, nextTick } from "vue";
interface navObj {
  id: string;
  name: string;
  component: string;
}
const props = defineProps({
  nav: {
    type: Array<navObj>,
    default: [],
  },
  selector: {
    type: String,
    default: "",
  },
  direction: {
    type: String,
    default: "horizontal", // vertical horizontal
  },
  containerId: {
    type: String,
    default: "", // vertical horizontal
  },
});

const currentIndex = ref(0);
const visibleEl = new Map();

function clickNav(id: string, index: number) {
  let el = document.getElementById(id);
  el?.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
}

const ob = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        visibleEl.set(entry.target.id, entry);
      } else {
        visibleEl.delete(entry.target.id);
      }
    });
    let full: Array<number> = [];
    let targetIndex = 99;
    visibleEl.forEach((entry) => {
      let index = parseInt(entry.target.getAttribute("data-index") || "0");
      if (index <= targetIndex) {
        targetIndex = index;
      }
      if (entry.intersectionRatio >= 0.9) {
        full.push(index);
      }
    });
    currentIndex.value = full.length ? Math.min(...full) : targetIndex;
  },
  {
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    root: document.getElementById(props.containerId),
  }
);

function initOB() {
  const parts = document.getElementsByClassName(props.selector);
  let i = 0;
  for (let part of parts) {
    ob.observe(part);
    part.setAttribute("data-index", i + "");
    i++;
  }
}
nextTick(() => {
  initOB();
});
</script>
<style scoped lang="scss">
.anchor {
  .nav {
    font-size: 20px;
    .item {
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
      &:hover {
        color: #09968c;
      }
    }
    &.vertical {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 10px;

      .item {
        padding-left: 10px;
        position: relative;
        &.active {
          color: #09968c;

          &::after {
            content: "";
            position: absolute;
            display: block;
            width: 5px;
            height: 100%;
            background: #09968c;
            border-radius: 20px;
            left: 0;
            top: 0;
          }
        }
      }
    }
    &.horizontal {
      display: flex;
      gap: 20px;
      .item {
        &.active {
          color: #09968c;
          &::after {
            content: "";
            position: absolute;
            display: block;
            width: 100%;
            height: 5px;
            background: #09968c;
            border-radius: 20px;
            bottom: -5px;
          }
        }
      }
    }
  }
}
</style>
