<template>
  <div class="_layout">
    <slot name="header">
      <header class="header h bgWhite">
        <div class="logo">
          <img src="~/assets/images/logo.png" class="icon" alt="" />
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
    </slot>
    <div class="section">
      <aside class="aside flexCenter bgWhite">导航栏</aside>
      <div class="layout__content">
        <main class="main flexCenter">
          <slot />
        </main>
        <slot name="footer">
          <footer class="footer flexCenter h">
            <img src="~/assets/images/filings.png" class="icon" alt="" />
            ICP备案号：<a href="https://beian.miit.gov.cn" target="_blank">蜀ICP备2024045204号-1</a>
          </footer>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
function loginOut() {
  localStorage.removeItem('token')
  router.replace('/login')
}
</script>

<style lang="less" scoped>
._layout {
  width: 100%;
  height: 100%;
  min-width: 700px;
  display: flex;
  flex-direction: column;

  &.minW {
    min-width: 500px;
  }

  .h {
    height: 50px;
  }

  .flexCenter {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bgWhite {
    background-color: #b3c0d1;
    color: #333;
    font-size: 14px;
  }

  .header {
    position: relative;
    display: flex;
    justify-content: space-between;
    background: #fff;

    .logo {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200px;

      .icon {
        width: 40px;
        height: 40px;
      }
    }

    .center {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    .right {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      box-sizing: border-box;
      padding-right: 20px;
      min-width: 150px;
      max-width: 180px;

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

  .section {
    width: 100%;
    flex: 1;
    display: flex; // flex布局，主内容和侧边栏横向排列
    overflow: hidden;

    .aside {
      width: 200px; // 固定宽度
      background-color: #d3dce6;
      /* 可选：防止收缩 */
      flex-shrink: 0;
    }

    .layout__content {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      min-width: 500px;
      display: flex;
      flex-direction: column;
      flex-basis: auto;
      box-sizing: border-box;
      overflow: auto;

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: ' ';
        width: 100%;
        height: 8px;
        background: #f7f7f7;
      }

      &::after {
        position: absolute;
        top: 0;
        left: 0;
        content: ' ';
        width: 8px;
        height: 100%;
        background: #f7f7f7;
      }

      .main {
        flex: 1; // 占据剩余空间
        background-color: transparent;
      }
    }
  }
}

.footer {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #333;
  font-size: 13px;

  .icon {
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

  @media (prefers-color-scheme: dark) {
    color: #fff;
  }
}
</style>
