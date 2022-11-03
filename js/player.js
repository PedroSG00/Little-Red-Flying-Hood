class Player {
    constructor(ctx, keys, canvasSize, timer) {
        this.ctx = ctx
        this.keys = keys
        this.canvasSize = canvasSize
        this.isAlive = true
        this.hit = false
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
            this.image.rowsIndex * (this.image.height / this.image.rows + 0.3),
            this.image.width / this.image.cols,
            this.image.height / this.image.rows,
            this.cardPlayer.pos.x,
            this.cardPlayer.pos.y,
            100,
            100
        )

        if (this.isAlive) { this.moveAnimation(timer) } else { this.deadAnimation(timer) }


    }


    fly() {


        this.cardPlayer.pos.y -= 3
        this.playerSpeed.y = -4
        console.log('klkklk')




    }

    goDown() {


        this.cardPlayer.pos.y += 5
        this.playerSpeed.y = 6





    }



    setListeners() {
        document.addEventListener("keydown", e => {
            switch (e.key) {
                case this.keys.fly.key:
                    this.keys.fly.pressed === true
                    this.fly()
                    // console.log('klk')
                    break;

                case this.keys.goDown.key:
                    this.keys.fly.pressed === true
                    this.goDown()
                    break;

            }
        })

        document.addEventListener('keyup', e => {
            switch (e.key) {
                case this.keys.fly.key:
                    this.keys.fly.pressed === false
                    break;
                case this.keys.goDown.key:
                    this.keys.goDown.pressed === false
                    break;


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
            this.cardPlayer.pos.y += 1
            this.playerSpeed.y += 1
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

        if (this.cardPlayer.pos.y !== this.cardPlayer.initPos.y)
            if (timer % 10 == 0) {
                this.image.rowsIndex = 5;
                this.image.colsIndex++
            }

        if (this.image.colsIndex >= this.image.cols) {
            this.image.colsIndex = 0
        }



    }

    deadAnimation(timer) {

        if (timer % 25 === 0) {
            this.image.rowsIndex = 7;
            this.image.colsIndex++
        }

        if (this.image.colsIndex >= 7) {
            this.image.colsIndex = 7;
        }
        console.log(this.image.colsIndex)



    }

    damageAnimation(timer) {
        if (timer % 10 === 0) {
            this.image.rowsIndex = 6;
            this.image.colsIndex++
        }

        if (this.image.colsIndex >= 2) {
            this.image.colsIndex = 0;
        }
        console.log(this.image.colsIndex)
    }




}

