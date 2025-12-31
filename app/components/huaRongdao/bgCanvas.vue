<template>
  <canvas ref="canvasRef" id="stars" class="meteor-canvas"></canvas>
</template>

<script setup lang="ts">
import { Star, MeteorRain } from '~/assets/js/meteorRain'
const canvasRef = ref()
const context = ref<CanvasRenderingContext2D | null>(null)
// 星星数量
const starClass = ref()
const starCount = ref(800)
const starArr = ref(new Array())
const startTimer = ref<NodeJS.Timeout | null>(null)
// 流星雨
const rainCount = ref(20)
const rainsArr = ref(new Array())
const rainsTimer = ref<NodeJS.Timeout | null>(null)

onMounted(() => {
  nextTick(() => {
    initLoadData()
  })
})

function initLoadData() {
  init()
  //画星星
  for (var i = 0; i < starCount.value; i++) {
    starClass.value = new Star(context.value)
    starClass.value.init()
    starClass.value.draw()
    starArr.value.push(starClass.value)
  }
  playStars() //绘制闪动的星星
  //画流星
  for (var i = 0; i < rainCount.value; i++) {
    var rain = new MeteorRain(context.value)
    rain.init()
    rain.draw()
    rainsArr.value.push(rain)
  }
  playRains() //绘制流星
  // drawMoon() //绘制月亮
}

function init() {
  //获取canvas
  const canvas = canvasRef.value
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  //获取context
  context.value = canvas.getContext('2d') || null
}

//星星闪起来
function playStars() {
  if (startTimer.value) clearTimeout(startTimer.value)
  for (var n = 0; n < starCount.value; n++) {
    starArr.value[n].getColor()
    starArr.value[n].draw()
  }

  startTimer.value = setTimeout(playStars, 100)
}

//画月亮
// function drawMoon() {
//   var moon = new Image()
//   moon.src = './images/moon_fill.png'
//   context.value.drawImage(moon, -5, -10)
// }

//绘制流星
function playRains() {
  if (rainsTimer.value) clearTimeout(rainsTimer.value)
  for (var n = 0; n < rainCount.value; n++) {
    var rain = rainsArr.value[n]
    rain.context = context.value
    rain.move() //移动
    if (rain.y > window.innerHeight) {
      //超出界限后重来
      context.value?.clearRect(rain.x, rain.y - rain.height, rain.width, rain.height)
      rainsArr.value[n] = new MeteorRain()
      rainsArr.value[n].init()
    }
  }
  rainsTimer.value = setTimeout(playRains, 2)
}
</script>

<style scoped>
.meteor-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
