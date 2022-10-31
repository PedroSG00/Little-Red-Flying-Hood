const app = {
    appName: 'Iron-Jet',
    version: '1.0.0',
    license: undefined,
    author: 'Miguel García y Pedro Suárez',
    description: 'Endless-Runner of Jetpacks',
    ctx: undefined,
    fps: 60,
    lifes: 3,
    coinsCounter: 0,
    distance: 0,
    velocity: 2,
    lifesCheck: false,
    obstacles: [],
    coins: [],
    timer: 0,
    canvasSize: {
        w: undefined,
        h: undefined,
    },



    keys: {

        fly: ' ',
        // goDown: 'ArrowDown'
    },
    init() {
        this.setDimensions();
        this.drawObstacle()
        this.drawCoins()
        this.start()

    },
    setDimensions() {
        this.canvasSize = {
            w: window.innerWidth,
            h: window.innerHeight,
        }
        document.querySelector('#canvas').setAttribute('height', this.canvasSize.h)
        document.querySelector('#canvas').setAttribute('width', this.canvasSize.w)
        this.ctx = document.querySelector('#canvas').getContext('2d');

    },

    drawBackground() {
        this.ctx.fillStyle = 'grey'
        this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    drawObstacle() {
        this.obstacles.push(
            new Obstacles(this.ctx, this.canvasSize, this.velocity)
        )
    },

    drawCoins() {
        this.coins.push(
            new Coins(this.ctx, this.canvasSize, this.velocity)
        )
    },

    drawLifes() {
        this.ctx.fillStyle = 'white'
        this.ctx.font = '20px Arial'
        this.ctx.fillText(`Lifes: ${this.lifes}`, 100, 100)
    },

    drawDistance() {

        this.ctx.fillStyle = 'white'
        this.ctx.font = '20px Arial'
        this.ctx.fillText(`Meters: ${this.distance}`, 200, 100)

    },

    drawCoinsCounter() {

        this.ctx.fillStyle = 'white'
        this.ctx.font = '20px Arial'
        this.ctx.fillText(`Coins: ${this.coinsCounter}`, 300, 100)

    },

    reset() {

        this.drawBackground()
        this.player = new Player(this.ctx, this.keys, this.canvasSize)
        this.obstacles = []

    },


    start() {

        this.reset()



        setInterval(() => {

            this.timer++
            if (this.timer % 250 === 0) {
                this.distance++
                this.drawObstacle()
                // console.log('holi')

                if (this.distance > 1) {
                    this.velocity += 0.5
                    console.log(this.velocity)
                }

            }

            if (this.timer % 324 === 0) {
                this.drawCoins()
            }

            if (this.lifesCheck === true) {

            }

            this.clearObstacles()
            this.clearAll()
            this.drawAll()
            this.coinColissions()
            this.obstacleColissions()
            this.coinsToLifeConverter()
            this.moveAll()

        }, 1000 / this.fps)
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
        // console.log('holi')
    },

    clearObstacles() {
        this.obstacles = this.obstacles.filter(element => element.dimensions.pos.x >= 0)
        this.coins = this.coins.filter(element => element.dimensions.pos.x >= 0)
    },

    moveAll() {
        this.player.move()
        this.obstacles.forEach(element => element.move())
        this.coins.forEach(element => element.move())
        // console.log('holi')
    },

    drawAll() {
        this.drawBackground()
        this.drawLifes()
        this.drawCoinsCounter()
        this.drawDistance()
        this.player.drawPlayer()
        this.obstacles.forEach(element => element.draw())
        this.coins.forEach(element => element.draw())
        // console.log('holi')

    },

    obstacleColissions() {


        this.obstacles.forEach(element => {
            if (
                element.dimensions.pos.x < this.player.cardPlayer.pos.x + this.player.cardPlayer.size.w &&
                element.dimensions.pos.x + element.dimensions.size.w > this.player.cardPlayer.pos.x &&
                element.dimensions.pos.y < this.player.cardPlayer.pos.y + this.player.cardPlayer.size.h &&
                element.dimensions.size.h + element.dimensions.pos.y > this.player.cardPlayer.pos.y
            ) {
                this.lifesCheck = true
                console.log(this.lifesCheck)
            }


        })
    },

    restLifes() {

    },

    coinColissions() {
        this.coins.forEach(element => {
            if (element.dimensions.pos.x < this.player.cardPlayer.pos.x + this.player.cardPlayer.size.w &&
                element.dimensions.pos.x + element.dimensions.size.w > this.player.cardPlayer.pos.x &&
                element.dimensions.pos.y < this.player.cardPlayer.pos.y + this.player.cardPlayer.size.h &&
                element.dimensions.size.h + element.dimensions.pos.y > this.player.cardPlayer.pos.y) {
                this.coins.splice(element, 1)
                this.coinsCounter++
            }

            this.coins.forEach(element => {
                this.obstacles.forEach(eachObstacle => {
                    if (element.dimensions.pos.x < eachObstacle.dimensions.pos.x + eachObstacle.dimensions.size.w &&
                        element.dimensions.pos.x + element.dimensions.size.w > eachObstacle.dimensions.pos.x &&
                        element.dimensions.pos.y < eachObstacle.dimensions.pos.y + eachObstacle.dimensions.size.h &&
                        element.dimensions.size.h + element.dimensions.pos.y > eachObstacle.dimensions.pos.y) {
                        console.log('Estoy pasando')
                        this.coins.splice(element, 1)

                    }


                })
            })

        })
    },

    coinsToLifeConverter() {
        if (this.lifes < 3 && this.coinsCounter === 10) {
            this.coinsCounter = 0
            this.lifes++
        }
    },


    // acelerateGame() {

    //     let coinAceleration = 0
    //     let obstaclesAceleration = 0
    //     this.coins.map(element => {
    //         if (this.distance % 2 === 0 && this.distance != 0) {
    //             coinAceleration = element.dimensions.pos.x -= 5
    //         }
    //     })
    //     this.obstacles.map(element => {
    //         if (this.distance % 2 === 0 && this.distance != 0) {
    //             obstaclesAceleration = element.dimensions.pos.x -= 5
    //             console.log(obstaclesAceleration)
    //         }
    //     })

    // },

    // acelerateGame() {


    //     this.coins.map(element => {
    //         if (this.distance > 4) {
    //             this.velocity = 10
    //         }
    //         if (this.distance > 8) {
    //             element.dimensions.pos.x -= 12
    //         }

    //         if (this.distance > 12) {
    //             element.dimensions.pos.x -= 20
    //         }
    //     })
    //     this.obstacles.map(element => {
    //         if (this.distance > 4) {
    //             element.dimensions.pos.x -= 3
    //         }
    //         if (this.distance > 8) {
    //             element.dimensions.pos.x -= 12
    //         }
    //         if (this.distance > 12) {
    //             element.dimensions.pos.x -= 20
    //         }
    //     })

    // },

    // restLifes() {
    //     if (this.lifesCheck = true) {
    //         this.lifes--
    //     }
    // },

    gameOver() {
        clearInterval(1)
    }


}

