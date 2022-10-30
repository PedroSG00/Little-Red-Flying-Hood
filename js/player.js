class Player {
    constructor(ctx, keys, canvasSize) {
        this.ctx = ctx
        this.keys = keys
        this.lifes = 3

        this.cardPlayer = {

            size: {
                w: 50,
                h: 50
            },
            pos: {
                x: 300,
                y: 600
            },

            initPos: {
                x: 300,
                y: 600
            }

        }

        this.canvasSize = {
            w: window.innerWidth,
            h: window.innerHeight,
        },

            this.playerPhysics = {
                gravity: .2
            }

        this.playerSpeed = {
            x: 0,
            y: 6
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
        this.cardPlayer.pos.y -= 2
        this.playerSpeed.y -= 3
    }

    setListeners() {
        document.addEventListener("keydown", e => {
            if (this.keys.fly) {
                this.fly()
                console.log('subo')
            }
        })
    }

    move() {
        if (this.cardPlayer.pos.y < this.cardPlayer.initPos.y) {
            this.cardPlayer.pos.y += this.playerSpeed.y
            this.playerSpeed.y += this.playerPhysics.gravity
        } else {
            this.cardPlayer.pos.y = this.cardPlayer.initPos.y
        }

        if (this.cardPlayer.pos.y <= 100) {
            this.cardPlayer.pos.y = 100
        }
    }




}

// move() {

//     if (this.camelPos.x >= this.canvasSize.w - this.camelSize.w) {
//         this.camelSpeed *= -1
//     }

//     if (this.camelPos.x < 0) {
//         this.camelSpeed *= -1
//     }

//     this.camelPos.x += this.camelSpeed
// }
