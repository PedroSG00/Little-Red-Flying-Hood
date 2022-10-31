class Player {
    constructor(ctx, keys, canvasSize) {
        this.ctx = ctx
        this.keys = keys
        this.canvasSize = canvasSize
        this.lifes = 3
        this.topAndFloor = {
            top: 100,
            floor: this.canvasSize.h - 100,
        }
        this.canFly = false
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
        this.move()
    }

    drawPlayer() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.cardPlayer.pos.x, this.cardPlayer.pos.y, this.cardPlayer.size.w, this.cardPlayer.size.h)
    }


    fly() {

        if (this.canFly === true) {
            this.cardPlayer.pos.y -= 3
            this.playerSpeed.y -= 4

        }


    }

    setListeners() {
        document.addEventListener("keydown", e => {
            if (this.keys.fly) {
                this.canFly = true
                this.fly()
                console.log('subo')
            }
        })

        document.addEventListener('keyup', e => {
            if (!this.keys.fly) {
                this.canFly === false
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

        if (this.cardPlayer.pos.y <= this.topAndFloor.top) {
            this.cardPlayer.pos.y = this.topAndFloor.top
            this.cardPlayer.pos.y += 3
            this.playerSpeed.y += 4

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
