class Coins {
    constructor(ctx, canvasSize, velocity, timer) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.velocity = velocity
        this.timer = timer
        this.dimensions = {
            size: {
                w: 20,
                h: 20
            },
            pos: {
                x: this.canvasSize.w,
                y: Math.floor(Math.random() * ((canvasSize.h - 200) - 100 + 1) + 100)
            }
        }

        this.image = new Image();
        this.image.src = "./img/coin.png";
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
            this.image.rowsIndex * (this.image.width / this.image.rows),
            0,
            this.image.width / this.image.rows,
            this.image.height,
            this.dimensions.pos.x,
            this.dimensions.pos.y,
            35,
            35
        )

        this.coinAnimation(timer)


    }

    move() {
        this.dimensions.pos.x -= this.velocity

    }

    coinAnimation(timer) {
        if (timer % 5 == 0) {
            this.image.rowsIndex++
        }

        if (this.image.rowsIndex >= this.image.rows) {
            this.image.rowsIndex = 0
        }
    }






}

