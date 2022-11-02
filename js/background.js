class Background {
    constructor(ctx, canvasSize, velocity) {
        this.ctx = ctx;
        this.canvasSize = canvasSize
        this.isAlive = true
        this.image = new Image();
        this.image.src = './img/Flat Night 2 BG.png'
        this.dimensions = {
            size: {
                w: canvasSize.w,
                h: canvasSize.h
            },
            position: {
                x: 0,
                y: 0

            }

        }
        this.velocity = velocity
    }

    draw() {
        this.ctx.drawImage(this.image, this.dimensions.position.x, this.dimensions.position.y,
            this.dimensions.size.w, this.dimensions.size.h)
        this.ctx.drawImage(this.image, this.dimensions.position.x + this.dimensions.size.w,
            this.dimensions.position.y, this.dimensions.size.w, this.dimensions.size.h);

        if (this.isAlive = true) { this.move() }

    }

    move() {
        if (this.dimensions.position.x <= -this.dimensions.size.w) {
            this.dimensions.position.x = 0;

        }
        this.dimensions.position.x -= this.velocity
    }


} 