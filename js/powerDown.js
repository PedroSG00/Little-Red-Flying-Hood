class PowerDown {
    constructor(ctx, canvasSize, velocity, timer, player) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.velocity = velocity
        this.timer = timer
        this.temporizer = 5
        this.player = player
        this.newPlayerSize = {
            w: this.player.cardPlayer.size.w - 10,
            h: this.player.cardPlayer.size.h - 10
        }
        this.dimensions = {
            pos: {
                x: this.canvasSize.w,
                y: Math.floor(Math.random() * ((this.canvasSize.h - 200) - 100 + 1) + 100)
            },
            size: {
                w: 40,
                h: 40
            },
        }

        this.image = new Image();
        this.image.src = "./img/apple.png";
        this.image.rows = 6;
        this.image.rowsIndex = 0;

        this.init()
    }
    init() {
        this.draw()
        this.move()

    }
    draw() {

        this.ctx.drawImage(
            this.image,
            0,
            0,
            this.image.width,
            this.image.height,
            this.dimensions.pos.x,
            this.dimensions.pos.y,
            this.dimensions.size.w,
            this.dimensions.size.h
        )


    }

    move() {
        this.dimensions.pos.x -= this.velocity
    }






}