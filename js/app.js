const app = {
    appName: 'Iron-Jet',
    version: '1.0.0',
    license: undefined,
    author: 'Miguel García y Pedro Suárez',
    description: 'Endless-Runner of Jetpacks',
    ctx: undefined,
    fps: 60,
    background: undefined,
    lifes: 3,
    coinsCounter: 0,
    distance: 0,
    framesCounter: 0,
    velocity: 2,
    colTime: 0,
    lastObstacle: -1,
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
            new Coins(this.ctx, this.canvasSize, this.velocity, this.timer)
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

        this.background = new Background(this.ctx, this.canvasSize, this.velocity)
        this.player = new Player(this.ctx, this.keys, this.canvasSize, this.timer)
        this.obstacles = []

    },


    start() {

        this.reset()



        setInterval(() => {



            this.timer++
            if (this.timer % 170 === 0) {
                this.distance++
                this.drawObstacle()

                // console.log('holi')

                if (this.distance > 1) {
                    this.velocity += 0.2
                    // console.log(this.velocity)
                }

            }

            if (this.timer % 324 === 0) {
                this.drawCoins()
            }

            this.clearObstacles()
            this.clearAll()
            this.drawAll()
            this.coinColissions()
            this.obstacleColissions()
            if (this.lifes === 0) {
                this.gameOver()
            }
            this.coinsToLifeConverter()
            this.moveAll()

        }, 1000 / this.fps)
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
        // console.log('holi')
    },

    clearObstacles() {
        const before = this.obstacles.length
        this.obstacles = this.obstacles.filter(element => element.dimensions.pos.x >= 0)
        const after = this.obstacles.length
        this.lastObstacle -= (before - after)
        this.coins = this.coins.filter(element => element.dimensions.pos.x >= 0)
    },

    moveAll() {
        this.player.move()
        this.obstacles.forEach(element => element.move())
        this.coins.forEach(element => element.move())
        // console.log('holi')
    },

    drawAll() {
        this.background.draw()
        this.drawLifes()
        this.drawCoinsCounter()
        this.drawDistance()
        this.player.drawPlayer(this.timer)
        this.obstacles.forEach(element => element.draw())
        this.coins.forEach(element => element.draw(this.timer))
        // console.log('holi')

    },

    obstacleColissions() {



        this.obstacles.some((element, obstacleID) => {




            if (element.dimensions.pos.x < this.player.cardPlayer.pos.x + this.player.cardPlayer.size.w &&
                element.dimensions.pos.x + element.dimensions.size.w > this.player.cardPlayer.pos.x &&
                element.dimensions.pos.y < this.player.cardPlayer.pos.y + this.player.cardPlayer.size.h &&
                element.dimensions.size.h + element.dimensions.pos.y > this.player.cardPlayer.pos.y
            ) {

                console.log(obstacleID)
                if (this.lastObstacle !== obstacleID) {
                    this.lifes--
                    this.lastObstacle = obstacleID
                }

            } else {
                if (this.lastObstacle === obstacleID) {
                    this.lastObstacle = -1
                }
            }
        })

    },





    coinColissions() {
        this.coins.forEach((element, index) => {
            if (element.dimensions.pos.x < this.player.cardPlayer.pos.x + this.player.cardPlayer.size.w &&
                element.dimensions.pos.x + element.dimensions.size.w > this.player.cardPlayer.pos.x &&
                element.dimensions.pos.y < this.player.cardPlayer.pos.y + this.player.cardPlayer.size.h &&
                element.dimensions.size.h + element.dimensions.pos.y > this.player.cardPlayer.pos.y) {
                this.coins.splice(index, 1)
                this.coinsCounter++
            }

            this.coins.forEach((element, index) => {
                this.obstacles.forEach(eachObstacle => {
                    if (element.dimensions.pos.x < eachObstacle.dimensions.pos.x + eachObstacle.dimensions.size.w &&
                        element.dimensions.pos.x + element.dimensions.size.w > eachObstacle.dimensions.pos.x &&
                        element.dimensions.pos.y < eachObstacle.dimensions.pos.y + eachObstacle.dimensions.size.h &&
                        element.dimensions.size.h + element.dimensions.pos.y > eachObstacle.dimensions.pos.y) {
                        console.log('Estoy pasando')
                        this.coins.splice(index, 1)

                    }


                })
            })

        })
    },


    coinsToLifeConverter() {
        if (this.lifes < 3 && this.coinsCounter === 3) {
            this.coinsCounter = 0
            this.lifes++
        }
    },





    gameOver() {

        this.player.deadAnimation(this.timer)

        setTimeout(() => {
            clearInterval(1)
        }, 2000)

    }


}

