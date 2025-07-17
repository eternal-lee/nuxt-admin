<template>
  <header class="header">
    <div class="left flexCenter" @click.stop="handleToggle">
      <el-icon size="24">
        <Fold v-if="!isCollapse" />
        <Expand v-else />
      </el-icon>
    </div>
    <div class="center flexCenter">ieternal | nuxt-admin</div>
    <div class="right">
      <div class="name">admin</div>
      <div class="portrait"></div>

      <div class="menuBox">
        <div class="menuIItem" @click.stop="loginOut">退出</div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useMenuStore } from '~/store/menu'

const useMenu = useMenuStore()
const { isCollapse } = storeToRefs(useMenu)

const router = useRouter()

function handleToggle() {
  useMenu.handleToggle()
}

function loginOut() {
  localStorage.removeItem('token')
  router.replace('/login')
}
</script>

<style lang="less" scoped>
.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 100%;
  background: #fff;
  color: #333;
  user-select: none;

  .left {
    position: relative;
    z-index: 1;
    padding: 0 20px;
    cursor: pointer;
  }

  .center {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .right {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    padding-right: 20px;
    min-width: 150px;
    max-width: 180px;
    margin-left: auto;

    .portrait {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #dedede;
      margin-left: 4px;
      /* 可选：防止收缩 */
      flex-shrink: 0;
    }

    .menuBox {
      display: none;
      box-sizing: border-box;
      position: absolute;
      z-index: 9;
      top: 100%; // 让菜单内容向下延申
      right: 0;
      padding: 5px;
      width: 100%;
      height: auto;
      border-radius: 8px;
      background: #fff;
      color: #333;
      cursor: default;

      .menuIItem {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 40px;
        cursor: pointer;

        & + .menuIItem {
          border-top: 1px solid #dedede;
        }
      }
    }

    &:hover .menuBox {
      display: block;
    }
  }
}
</style>
