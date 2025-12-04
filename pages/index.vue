<template>
  <div class="home card">
    <img src="~/assets/images/welcome.png" class="welcome" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .welcome {
    width: 70%;
    max-width: 1200px;
    margin-bottom: 20px;
  }
}
</style>
