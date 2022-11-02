class Boxes {
    constructor(ctx, canvasSize, velocity, timer) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.velocity = velocity
        this.timer = timer
        this.boxSpeed = 3
        this.dimensions = {
            pos: {
                x: this.canvasSize.w,
                y: 300
            },
            size: {
                w: Math.floor(Math.random() * (100 - 50 + 1) + 50),
                h: Math.floor(Math.random() * ((this.canvasSize.h - 300) - (this.canvasSize.h - 400) + 1) + (this.canvasSize.h - 600))
            },



        }
        this.init()
    }

    init() {
        this.draw()
        this.move()
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = '#473d69'
        this.ctx.fillRect(this.dimensions.pos.x, this.dimensions.pos.y - this.dimensions.size.h, this.dimensions.size.w, this.dimensions.size.h)

        this.ctx.strokeStyle = 'red'
        this.ctx.lineWidth = 7
        this.ctx.rect(this.dimensions.pos.x, this.dimensions.pos.y - this.dimensions.size.h, this.dimensions.size.w, this.dimensions.size.h)

        this.ctx.stroke()
        this.ctx.closePath()
    }


    move() {
        this.dimensions.pos.x -= this.velocity
        if (this.dimensions.pos.y >= this.canvasSize.h - 100) {
            this.boxSpeed *= -1
        }
        if (this.dimensions.pos.y < 300) {
            this.boxSpeed *= -1
        }

        this.dimensions.pos.y += this.boxSpeed

    }

}

