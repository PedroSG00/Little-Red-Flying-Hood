class Obstacles {

    constructor(ctx, canvasSize, distance) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.distance = distance
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
        this.dimensions.pos.x -= 2
        if (this.distance % 2 === 0) this.dimensions.pos.x * 0.5
    }

}

