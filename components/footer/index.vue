<template>
  <footer class="footer flexCenter">
    <img src="~/assets/images/filings.png" class="icon" alt="" />
    ICP备案号：<a href="https://beian.miit.gov.cn" target="_blank">蜀ICP备2024045204号-1</a>
  </footer>
</template>

<style lang="less" scoped>
.footer {
  width: 100%;
  height: 100%;
  line-height: 50px;
  text-align: center;
  color: var(--el-menu-text-color);
  font-size: 13px;

  .icon {
    width: 20px;
    margin-right: 4px;
    vertical-align: middle;
  }

  a {
    color: #999;
    text-decoration: none;
  }
  a:hover {
    color: rgb(44 126 248);
  }
}
</style>
