<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/image/logo.svg" alt="" />
    </div>
    <div class="nav">
      <Anchor
        :nav="nav"
        :selector="`part-wrapper`"
        container-id="containerBox1"
      ></Anchor>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Anchor from "./Anchor.vue";
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
});
</script>
<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  .logo {
    width: 100px;
    img {
      height: 30px;
    }
  }
  .nav {
    display: flex;
    gap: 20px;
    font-size: 20px;

    .item {
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
      &:hover {
        color: #09968c;
      }
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
</style>
