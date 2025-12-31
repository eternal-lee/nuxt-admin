<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <div class="_error">
    <div class="newtons-cradle">
      <div class="newtons-cradle__dot"></div>
      <div class="newtons-cradle__dot"></div>
      <div class="newtons-cradle__dot"></div>
      <div class="newtons-cradle__dot"></div>
    </div>
    <h1>NOT FOUND</h1>
    <h1>{{ error?.statusCode }}</h1>
    <NuxtLink to="/">
      <button class="btn">
        <span class="txt"> Back home </span>
      </button></NuxtLink
    >
  </div>
</template>

<style lang="less" scoped>
._error {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  user-select: none;

  h1 {
    font-size: 20px;

    & + h1 {
      margin-top: 15px;
    }
  }

  /* From uiverse.io by @Ali-Tahmazi99 */
  .btn {
    margin-top: 25px;
    display: inline-block;
    width: 150px;
    height: 50px;
    border-radius: 10px;
    border: 1px solid #03045e;
    position: relative;
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

.newtons-cradle {
  --uib-size: 50px;
  --uib-speed: 1.2s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--uib-size);
  height: var(--uib-size);
  margin-bottom: 20px;
}

@media (prefers-color-scheme: light) {
  .newtons-cradle {
    --uib-color: #333;
  }
}

@media (prefers-color-scheme: dark) {
  .newtons-cradle {
    --uib-color: #fff;
  }
}

.newtons-cradle__dot {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  width: 25%;
  transform-origin: center top;
}

.newtons-cradle__dot::after {
  content: '';
  display: block;
  width: 100%;
  height: 25%;
  border-radius: 50%;
  background-color: var(--uib-color);
}

.newtons-cradle__dot:first-child {
  animation: swing var(--uib-speed) linear infinite;
}

.newtons-cradle__dot:last-child {
  animation: swing2 var(--uib-speed) linear infinite;
}

@keyframes swing {
  0% {
    transform: rotate(0deg);
    animation-timing-function: ease-out;
  }

  25% {
    transform: rotate(70deg);
    animation-timing-function: ease-in;
  }

  50% {
    transform: rotate(0deg);
    animation-timing-function: linear;
  }
}

@keyframes swing2 {
  0% {
    transform: rotate(0deg);
    animation-timing-function: linear;
  }

  50% {
    transform: rotate(0deg);
    animation-timing-function: ease-out;
  }

  75% {
    transform: rotate(-70deg);
    animation-timing-function: ease-in;
  }
}
</style>
