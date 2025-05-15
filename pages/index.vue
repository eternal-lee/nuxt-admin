<template>
  <div class="home-page">
    <bgCanvas />
    <HuaRongdaoIndex />
    <footer class="footer">
      <img src="~/assets/images/filings.png" class="icon" alt="" />
      ICP备案号：<a href="https://beian.miit.gov.cn" target="_blank">蜀ICP备2024045204号-1</a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import HuaRongdaoIndex from '~/components/huaRongdao/index.vue'
import bgCanvas from '~/components/huaRongdao/bgCanvas.vue'
</script>

<style lang="less" scoped>
.home-page {
  width: 100%;
  height: 100%;
}

.footer {
  position: absolute;
  left: 0%;
  bottom: 0%;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  font-size: 13px;
}
.footer .icon {
  width: 20px;
  vertical-align: middle;
}

a {
  color: #999;
  text-decoration: none;
}
a:hover {
  color: rgb(44 126 248);
}
</style>
