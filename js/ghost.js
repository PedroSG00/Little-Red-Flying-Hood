
class Obstacles {
    constructor(ctx, canvasSize, velocity, timer) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.velocity = velocity
        this.timer = timer
        this.dimensions = {
            pos: {
                x: this.canvasSize.w,
                y: Math.floor(Math.random() * ((this.canvasSize.h - 200) - 100 + 1) + 100)
            },
            size: {
                w: 100,
                h: 100
            },
        }

        this.image = new Image();
        this.image.src = "./img/ghostNew.png";
        this.image.rows = 6;

        this.image.rowsIndex = 0;

        this.init()
    }
    init() {
        this.draw()
        this.move()
    }
    draw(timer) {

        this.ctx.drawImage(
            this.image,
            this.image.rowsIndex * (this.image.width / (this.image.rows)),
            0,
            this.image.width / this.image.rows,
            this.image.height,
            this.dimensions.pos.x,
            this.dimensions.pos.y,
            this.dimensions.size.w,
            this.dimensions.size.h
        )

        this.moveAnimation(timer)
        // this.ctx.fillStyle = 'red'
        // this.ctx.fillRect(this.dimensions.pos.x, this.dimensions.pos.y, this.dimensions.size.w, this.dimensions.size.h)
    }

    move() {
        this.dimensions.pos.x -= this.velocity
    }

    moveAnimation(timer) {

        // console.log('k')
        if (timer % 10 == 0) {
            this.image.rowsIndex++


        }

        if (this.image.rowsIndex >= this.image.rows) {
            this.image.rowsIndex = 0
        }

    }



}