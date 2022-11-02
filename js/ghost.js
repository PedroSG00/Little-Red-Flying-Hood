
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
                w: 130,
                h: 130
            },
        }

        this.image = new Image();
        this.image.src = "./img/ghost.png";
        this.image.rows = 8;
        this.image.cols = 6;
        this.image.rowsIndex = 0;
        this.image.colsIndex = 0;

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
            this.image.colsIndex * (this.image.height / this.image.cols),
            this.image.width / this.image.rows,
            this.image.height / this.image.cols,
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
            this.image.rowsIndex = 1
            this.image.colsIndex++

        }

        if (this.image.colsIndex >= 4) {
            this.image.colsIndex = 0
        }

    }



}