class Obstacles {

    constructor(ctx, canvasSize, velocity) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.velocity = velocity
        this.dimensions = {
            pos: {
                x: this.canvasSize.w,
                y: Math.random() * this.canvasSize.h - 100
            },
            size: {
                w: 30,
                h: Math.random() * 300
            },



        }
        this.init()
    }

    init() {
        this.draw()
        this.move()
    }

    draw() {
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.dimensions.pos.x, this.dimensions.pos.y, this.dimensions.size.w, this.dimensions.size.h)
    }
    move() {
        this.dimensions.pos.x -= this.velocity
    }

}

