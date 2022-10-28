class Player {
    constructor(ctx, keys) {
        this.ctx = ctx
        this.keys = keys
        this.cardPlayer = {

            size: {
                w: 100,
                h: 100
            },
            pos: {
                x: 100,
                y: 500
            },

        }

        this.playerPhysics = {
            gravity: .4
        }

        this.playerSpeed = {
            x: 0,
            y: 5
        }



        this.init()
    }

    init() {
        this.drawPlayer()
        this.setListeners()
    }

    drawPlayer() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.cardPlayer.pos.x, this.cardPlayer.pos.y, this.cardPlayer.size.w, this.cardPlayer.size.h)
    }

    fly() {
        this.cardPlayer.pos.y -= 50
        this.playerSpeed.y -= 5
    }

    setListeners() {
        document.addEventListener("keydown", e => {
            if (this.keys.fly) {
                this.fly()
            }
        })
    }

}