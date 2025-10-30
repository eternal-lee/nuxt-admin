<template>
  <div class="huaRongdao">
    <div class="boxs">
      <div v-if="!loading" class="box" :style="{ width, height }">
        <div
          class="item"
          :class="{ empty: item == -1 }"
          v-for="(item, index) in list"
          @click="onSwitch(item, index)"
          ref="item"
        >
          {{ item != -1 ? item : '' }}
        </div>
      </div>
      <div v-else class="box pos">计算中，请稍后</div>
      <div class="bottomBox">
        <input class="input" ref="inputRef" placeholder="输入阶数..." type="text" :value="col" />
        <div class="txt">阶华容道</div>
        <div class="resetBtn" @click="setCol">设置</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(true)
const list = ref<number[]>([])
const answerList = ref([])
const width = ref('306px')
const height = ref('306px')
const col = ref(3)
const inputRef = ref<HTMLInputElement | null>(null)

onMounted(async () => {
  await reset()
  loading.value = false
})

function setCol() {
  if (inputRef.value) {
    col.value = Number(inputRef.value?.value)
  }
  reset()
}
function reset() {
  list.value = []
  const maxCount = col.value * col.value
  width.value = 102 * col.value + 'px'
  height.value = 102 * col.value + 'px'
  for (let i = 0; i < maxCount; i++) {
    list.value.push(i == maxCount - 1 ? -1 : i + 1)
  }
  answerList.value = JSON.parse(JSON.stringify(list.value)) //备份一份答案
  list.value = list.value.sort(() => 0.5 - Math.random())
}
function onSwitch(item: number, index: number) {
  if (item != -1) {
    const lastItem = (index % col.value) + 1 //是否右边最后一个
    const eIdx = list.value.findIndex((d) => d == -1) //空闲的位置
    if (lastItem != col.value || (lastItem == col.value && list.value[index + 1] != -1)) {
      //判断当前格如果不是右边最后一格或者当前当前格是最后一格并且下一格不是空格
      if (list.value[index + 1] == -1 || list.value[index - 1] == -1) {
        //如果左边或者右边有空位
        ;[list.value[index], list.value[eIdx]] = [list.value[eIdx], list.value[index]]
      }
    }
    if (list.value[index - col.value] == -1) {
      //当前格子上面有格子
      ;[list.value[index], list.value[eIdx]] = [list.value[eIdx], list.value[index]]
    }
    if (list.value[index + col.value] == -1) {
      //当前格子下面有格子
      ;[list.value[index], list.value[eIdx]] = [list.value[eIdx], list.value[index]]
    }
    if (list.value.toString() == answerList.value.toString()) {
      setTimeout(() => {
        alert('恭喜，通关了')
        reset()
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.huaRongdao {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .boxs {
    position: relative;
    width: 320px;
    min-height: 320px;
    color: #fff;
  }

  .box {
    width: 315px;
    height: 315px;
    border: 5px solid rgb(218, 195, 147);
    display: flex;
    flex-wrap: wrap;
    background-color: black;
    margin-bottom: 10px;
    border-radius: 4px;

    .item {
      width: 100px;
      height: 100px;
      background-color: rgb(247, 170, 3);
      border: 1px solid rgb(189, 133, 12);
      color: white;
      text-align: center;
      line-height: 100px;
      font-size: 20px;
      cursor: pointer;
      user-select: none;
      position: relative;
      left: 0;

      &.empty {
        background-color: #000;
      }
    }

    &.pos {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.bottomBox {
  display: flex;
  justify-content: center;
  flex-direction: row;
  height: 30px;
  line-height: 30px;
  font-size: 16px;

  .input {
    max-width: 80px;
    background-color: #f5f5f5;
    color: #242424;
    font-weight: bold;
    padding: 0.15rem 0.5rem;
    min-height: inherit;
    border-radius: 4px 0 0 4px;
    outline: none;
    border: none;
    box-shadow: 0px 10px 20px -18px;
    text-align: center;
  }

  .txt {
    color: #333;
    background: #f5f5f5;
    padding: 0 4px;
    margin-right: 6px;
    border-radius: 0 4px 4px 0;
  }

  .resetBtn {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 60px;
    padding: 5px 8px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    overflow: hidden;
    background: #000;

    &::before {
      content: ' ';
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: -2;
      width: 200%;
      height: 200%;
      background: #f00;
      transform-origin: left top;
      animation: roration 3s linear infinite;
    }

    &::after {
      content: ' ';
      position: absolute;
      --w: 2px;
      width: calc(100% - var(--w) * 2);
      height: calc(100% - var(--w) * 2);
      left: var(--w);
      top: var(--w);
      background: inherit;
      border-radius: inherit;
      z-index: -1;
    }
  }
}

@keyframes roration {
  to {
    transform: rotate(1turn);
  }
}
</style>
