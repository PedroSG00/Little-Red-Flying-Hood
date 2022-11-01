class Player {
    constructor(ctx, keys, canvasSize, timer) {
        this.ctx = ctx
        this.keys = keys
        this.canvasSize = canvasSize
        this.lifes = 3
        this.timer = timer
        this.topAndFloor = {
            top: 100,
            floor: this.canvasSize.h - 100,
        }

        this.image = new Image();
        this.image.src = "./img/AnimationSheet_Character.png";
        this.image.cols = 8;
        this.image.rows = 9;
        this.image.colsIndex = 0;
        this.image.rowsIndex = 0;

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
                y: this.canvasSize.h - 150
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

    drawPlayer(timer) {



        this.ctx.drawImage(
            this.image,
            this.image.colsIndex * (this.image.width / this.image.cols),
            this.image.rowsIndex * (this.image.height / this.image.rows),
            this.image.width / this.image.cols,
            this.image.height / this.image.rows,
            this.cardPlayer.pos.x,
            this.cardPlayer.pos.y,
            100,
            100
        )

        this.moveAnimation(timer)
        this.jumpAnimation(timer)

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

                // console.log('subo')
            }
        })

        document.addEventListener('keyup', e => {
            if (!this.keys.fly) {
                this.canFly === false
                this.fallAnimation(this.timer)
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

    moveAnimation(timer) {

        if (this.cardPlayer.pos.y === this.cardPlayer.initPos.y)

            if (timer % 5 == 0) {
                this.image.rowsIndex = 3;
                this.image.colsIndex++
            }

        if (this.image.colsIndex >= this.image.cols) {
            this.image.colsIndex = 0
        }


    }

    jumpAnimation(timer) {

        if (this.cardPlayer.pos.y !== this.cardPlayer.initPos.y)
            if (timer % 10 == 0) {
                this.image.rowsIndex = 5;
                this.image.colsIndex++
            }

        if (this.image.colsIndex >= this.image.cols) {
            this.image.colsIndex = 0
        }
    }

    // fallAnimation(timer) {


    //     if (timer % 30 == 0) {
    //         this.image.rowsIndex = 5;
    //         this.image.colsIndex = 4
    //         this.image.colsIndex
    //     }

    //     if (this.image.colsIndex <= 7) {
    //         this.image.colsIndex = 7
    //     }

    // }


    deadAnimation(timer) {
        if (timer % 333 === 0) {
            this.image.rowsIndex = 7;
            this.image.colsIndex++
        }

        if (this.image.colsIndex >= this.image.cols) {
            this.image.colsIndex = 7;
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
