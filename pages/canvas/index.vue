<template>
  <div class="propaganda card">
    <div class="canvasBox">
      <canvas class="keyPop" :width="WIDTH" :height="HEIGHT"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import circle from '~/assets/images/circle.png'
import { BallClass } from '~/assets/js/ball'
import { randomFloor } from '~/assets/js/tool'

defineOptions({
  name: 'Propaganda'
})

const canvasCtx = ref<CanvasRenderingContext2D | null>(null)
const ballImg = ref<HTMLImageElement | null>(null)
const balls = ref<BallClass[]>([])
const createdBalls = ref<Record<string, any>[]>([])

const WIDTH = ref(650) // 画布宽高
const HEIGHT = ref(340) // 画布宽高
//获取tag标签
const tag = [
  '德玛西亚',
  '古典风格',
  '共和国的',
  '水电费',
  '让他把',
  '看i回复',
  '是的哇',
  '瑞特让他'
]
const config = {
  speedMin: -0.5,
  speedMax: 1,
  ballMin: 40,
  ballMax: 60,
  ballCount: tag.length,
  tag,
  ballImg: ballImg.value
}

onMounted(() => {
  nextTick(() => {
    const canvas = document.querySelector('canvas.keyPop') as HTMLCanvasElement
    canvasCtx.value = canvas.getContext('2d')
    canvas.width = WIDTH.value
    canvas.height = HEIGHT.value
    if (!canvasCtx.value) return
    canvasCtx.value.fillRect(0, 0, WIDTH.value, HEIGHT.value)
    canvasCtx.value.fill()
    ballImg.value = new Image()
    ballImg.value.src = circle
    loop()
  })
})

/**
 * draw the balls loops
 */
function loop() {
  if (!canvasCtx.value) return
  canvasCtx.value.fillRect(0, 0, WIDTH.value, HEIGHT.value)
  canvasCtx.value.clearRect(0, 0, WIDTH.value, HEIGHT.value)
  config.ballImg = ballImg.value
  while (balls.value.length < config.ballCount) {
    const b_var = createBall()
    const _ballconfig = {
      x: b_var.x,
      y: b_var.y,
      velX: randomFloor(config.speedMin, config.speedMax),
      velY: randomFloor(config.speedMin, config.speedMax),
      size: b_var.r
    }
    const ball = new BallClass(WIDTH.value, HEIGHT.value, canvasCtx.value, config, _ballconfig)
    balls.value.push(ball)
  }

  for (let i = 0; i < balls.value.length; i++) {
    balls.value[i].draw(i)
    balls.value[i].collisionDetect(balls.value) //detect before update
    balls.value[i].update()
  }

  // run again and again to realize the effect of the animation
  requestAnimationFrame(loop)
}

/**
 * ensure the created ball will not collision
 */
function createBall(): Record<string, any> {
  const x = randomFloor(0 + config.ballMax, WIDTH.value - config.ballMax)
  const y = randomFloor(0 + config.ballMax, HEIGHT.value - config.ballMax)
  const r = randomFloor(config.ballMin, config.ballMax)
  for (let i = 0; i < createdBalls.value.length; i++) {
    const dx = createdBalls.value[i].x - x
    const dy = createdBalls.value[i].y - y
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance < createdBalls.value[i].r + r) {
      return createBall()
    }
  }
  const ball = {
    x: x,
    y: y,
    r: r
  }
  createdBalls.value.push(ball)
  return ball
}
</script>

<style lang="less" scoped>
.propaganda {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .canvasBox {
    display: inline-block;
    border: 1px dashed #5757c6;
    background: rgba(87, 87, 198, 50%);
  }
}
</style>
