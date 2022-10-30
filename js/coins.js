class Coins {
    constructor(ctx, canvasSize, distance) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.distance = distance
        this.framesCounter = 0
        this.dimensions = {
            size: {
                w: 20,
                h: 20
            },
            pos: {
                x: this.canvasSize.w,
                y: Math.random() * this.canvasSize.h - 100
            }
        }
        this.init()
    }

    init() {
        this.draw()
        this.move()
    }

    draw() {
        this.ctx.fillStyle = 'yellow'
        this.ctx.fillRect(this.dimensions.pos.x, this.dimensions.pos.y, this.dimensions.size.w, this.dimensions.size.h)


    }

    move() {
        this.dimensions.pos.x -= 2

    }




}

