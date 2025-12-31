export class BallClass {
  private WIDTH
  private HEIGHT
  private canvasCtx
  private config
  private x
  private y
  private size
  private velX
  private velY
  constructor(
    WIDTH: number,
    HEIGHT: number,
    canvasCtx: CanvasRenderingContext2D | null,
    config: Record<string, any>,
    ballConfig: Record<string, any>
  ) {
    this.WIDTH = WIDTH
    this.HEIGHT = HEIGHT
    this.canvasCtx = canvasCtx
    this.config = config

    this.x = ballConfig.x
    this.y = ballConfig.y
    this.size = ballConfig.size
    this.velX = ballConfig.velX
    this.velY = ballConfig.velY
  }

  /**
   * define Ball draw method
   * @param i s
   */
  draw(i: number, ctx: CanvasRenderingContext2D | null = this.canvasCtx) {
    if (this.config.tag[i] == '' || !ctx) return false

    ctx.beginPath()
    ctx.fillStyle = '#b1efff'
    this.config.ballImg &&
      ctx.drawImage(
        this.config.ballImg,
        this.x - this.size,
        this.y - this.size,
        this.size * 2,
        this.size * 2
      )
    // ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillText(this.config.tag[i], this.x, this.y, this.size * 2)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle' //文本垂直方向，基线位置
    ctx.font = `${(this.size * 2) / (this.config.tag[i].length + 2)}px Georgia`
    ctx.fillStyle = '#1c1954'
  }

  /**
   * define Ball update method
   */
  update() {
    if (this.x + this.size >= this.WIDTH) {
      this.velX = -this.velX
    }
    if (this.x - this.size <= 0) {
      this.velX = -this.velX
    }

    if (this.y + this.size >= this.HEIGHT) {
      this.velY = -this.velY
    }
    if (this.y - this.size <= 0) {
      this.velY = -this.velY
    }

    this.x += this.velX
    this.y += this.velY
  }

  /**
   * define Ball collision detection
   */
  collisionDetect(balls: any[]) {
    for (let j = 0; j < balls.length; j++) {
      const ball = balls[j]
      if (this !== ball) {
        // be care of this line, we can't compare one with itself
        const dxv = this.x + this.velX - (ball.x + ball.velX) //detect the next step which will updated
        const dyv = this.y + this.velY - (ball.y + ball.velY)
        const distance = Math.sqrt(dxv * dxv + dyv * dyv)

        if (distance <= this.size + ball.size) {
          // rebound the balls when collision
          const dvx = this.velX - ball.velX
          const dvy = this.velY - ball.velY
          const dx = this.x - ball.x // but when update just use this step
          const dy = this.y - ball.y
          const xx_yy = dx * dx + dy * dy
          const v_dvx = (dvx * dx * dx + dvy * dx * dy) / xx_yy
          const v_dvy = (dvy * dy * dy + dvx * dx * dy) / xx_yy
          this.velX = this.checkSpeed(this.velX - v_dvx)
          this.velY = this.checkSpeed(this.velY - v_dvy)
          ball.velX = this.checkSpeed(ball.velX + v_dvx)
          ball.velY = this.checkSpeed(ball.velY + v_dvy)
        }
      }
    }
  }

  /**
   * validate the speed
   * @param speed d
   */
  checkSpeed(speed: number) {
    if (speed > this.config.speedMax) {
      speed = this.config.speedMax
    } else if (speed < this.config.speedMin) {
      speed = this.config.speedMin
    }
    return speed
  }
}
