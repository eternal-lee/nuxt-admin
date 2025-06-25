<template>
  <div class="home-page">
    <bgCanvas />
    <HuaRongdaoIndex />

    <button class="btn" @click="goHome">
      <span class="txt"> Back home </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import HuaRongdaoIndex from '~/components/huaRongdao/index.vue'
import bgCanvas from '~/components/huaRongdao/bgCanvas.vue'

const router = useRouter()
function goHome() {
  router.replace('/')
}
</script>

<style lang="less" scoped>
.home-page {
  position: relative;
  width: 100%;
  height: 100%;

  .btn {
    position: absolute;
    top: 0;
    margin-top: 25px;
    display: inline-block;
    width: 150px;
    height: 50px;
    border-radius: 10px;
    border: 1px solid #03045e;
    overflow: hidden;
    transition: all 0.5s ease-in;
    z-index: 1;
    cursor: pointer;

    &::after,
    &::before {
      content: '';
      position: absolute;
      top: 0;
      width: 0;
      height: 100%;
      transform: skew(15deg);
      transition: all 0.5s;
      overflow: hidden;
      z-index: -1;
    }

    &::before {
      left: -10px;
      background: #240046;
    }

    &::after {
      right: -10px;
      background: #5a189a;
    }

    &:hover::before,
    &:hover::after {
      width: 58%;
    }

    &:hover .txt {
      color: #e0aaff;
      transition: 0.3s;
    }

    & .txt {
      color: #03045e;
      font-size: 18px;
      transition: all 0.3s ease-in;
    }
  }
}
</style>
