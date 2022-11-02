
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
    lastBox: -1,
    lifesCheck: false,
    boxes: [],
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
        document.querySelector('.start').style.display = 'none'
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
            new Obstacles(this.ctx, this.canvasSize, this.velocity, this.timer)
        )
    },
    drawBoxes() {
        this.boxes.push(
            new Boxes(this.ctx, this.canvasSize, this.velocity, this.timer)
        )
    },
    drawCoins() {
        this.coins.push(
            new Coins(this.ctx, this.canvasSize, this.velocity, this.timer)
        )
    },
    drawLifes() {

        this.image = new Image();
        this.image.src = "./img/heart.png";
        this.image.rows = 6;
        this.image.rowsIndex = 0;

        this.ctx.drawImage(
            this.image,
            this.image.rowsIndex * (this.image.width / this.image.rows),
            0,
            this.image.width,
            this.image.height,
            100,
            45,
            35,
            35
        )

        this.ctx.fillStyle = 'white'
        this.ctx.font = '35px Sans Serif'
        this.ctx.fillText(`${this.lifes}`, 150, 75)
    },
    drawDistance() {
        this.ctx.fillStyle = 'white'
        this.ctx.font = '35px Sans Serif'
        this.ctx.fillText(`SCORE: ${this.distance}`, 200, 75)
    },
    drawCoinsCounter() {
        this.image = new Image();
        this.image.src = "./img/coin.png";
        this.image.rows = 6;
        this.image.rowsIndex = 0;

        this.ctx.drawImage(
            this.image,
            this.image.rowsIndex * (this.image.width / this.image.rows),
            0,
            this.image.width / this.image.rows,
            this.image.height,
            400,
            45,
            35,
            35
        )

        this.ctx.fillStyle = 'yellow'
        this.ctx.font = '35px Sans Serif'
        this.ctx.fillText(`${this.coinsCounter}`, 450, 75)
    },
    reset() {
        this.background = new Background(this.ctx, this.canvasSize, this.velocity, this.timer)
        this.player = new Player(this.ctx, this.keys, this.canvasSize, this.timer)
        this.obstacles = []
    },
    start() {
        this.reset()
        setInterval(() => {
            this.timer++
            if (this.timer % 175 === 0) {
                this.distance++
                this.drawObstacle()


                if (this.distance > 1) {
                    this.velocity += 0.2

                }
            }

            if (this.timer % 553 === 0) {
                this.distance++

                this.drawBoxes()

            }



            if (this.timer % 324 === 0) {
                this.drawCoins()
            }
            this.clearObstacles()
            this.clearAll()
            this.drawAll()
            this.coinColissions()
            this.obstacleColissions()
            this.boxColissions()
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
        this.obstacles = this.obstacles.filter(element => element.dimensions.pos.x >= -100)
        const after = this.obstacles.length
        this.lastObstacle -= (before - after)

        const beforeBox = this.boxes.length
        this.boxes = this.boxes.filter(element => element.dimensions.pos.x >= -100)
        const afterBox = this.boxes.length
        this.lastBox -= (beforeBox - afterBox)

        this.coins = this.coins.filter(element => element.dimensions.pos.x >= 0)

    },
    moveAll() {
        this.player.move()
        this.obstacles.forEach(element => element.move())
        this.boxes.forEach(element => element.move())
        this.coins.forEach(element => element.move())
        // console.log('holi')
    },
    drawAll() {
        this.background.draw()
        this.drawLifes()
        this.drawCoinsCounter()
        this.drawDistance()
        this.player.drawPlayer(this.timer)
        this.obstacles.forEach(element => element.draw(this.timer))
        this.boxes.forEach(element => element.draw(this.timer))
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
                // console.log(obstacleID)
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
                        this.coins.splice(element[index], 1)
                    }
                })
            })

        })
    },

    boxColissions() {
        this.boxes.forEach((element, index) => {
            if (element.dimensions.pos.x < this.player.cardPlayer.pos.x + this.player.cardPlayer.size.w &&
                element.dimensions.pos.x + element.dimensions.size.w > this.player.cardPlayer.pos.x &&
                element.dimensions.pos.y > this.player.cardPlayer.pos.y + this.player.cardPlayer.size.h &&
                element.dimensions.size.h + element.dimensions.pos.y > this.player.cardPlayer.pos.y
            ) {
                // console.log('holiwis')
                if (this.lastBox !== index) {
                    this.lifes--
                    this.lastBox = index
                }
            } else {
                if (this.lastBox === index) {
                    this.lastBox = -1
                }
            }

        })


    },
    coinsToLifeConverter() {
        if (this.lifes < 3 && this.coinsCounter >= 3) {
            this.coinsCounter = 0
            this.lifes++
        }


    },
    gameOver() {
        this.player.isAlive = false

        this.player.deadAnimation(this.timer)

        setTimeout(() => {
            clearInterval(1)
        }, 2000)
    }
}

