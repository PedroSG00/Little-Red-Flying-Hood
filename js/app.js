
const app = {
    appName: 'Little Red Flying Hood',
    version: '1.0.0',
    license: undefined,
    author: 'Miguel García y Pedro Suárez',
    description: 'Endless-Runner of Flying',
    ctx: undefined,
    fps: 60,
    background: undefined,
    lifes: 3,
    coinsCounter: 0,
    distance: 0,
    score: 0,
    obstacleCounter: 175,
    boxesCounter: 553,
    velocity: 2,
    colTime: 0,
    canColission: true,
    lastObstacle: -1,
    lastBox: -1,
    lifesCheck: false,
    boxes: [],
    obstacles: [],
    coins: [],
    powerDown: [],
    timer: 0,
    gameOverSound: new Audio('./sound/gameover.mp3'),

    musicBackground: new Audio('./sound/spookymusic.mp3'),
    canvasSize: {
        w: undefined,
        h: undefined,
    },
    keys: {
        fly: {
            key: ' ',
            pressed: false,
        },
        goDown: {
            key: 'ArrowDown',
            pressed: false,
        }
    },
    init() {

        this.setDimensions()

        this.start()
        this.musicBackground.loop = true
        this.musicBackground.volume = 0.07
        this.musicBackground.play()
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
        this.coins.push(new Coins(this.ctx, this.canvasSize, this.velocity, this.timer))
    },

    drawPowerDown() {
        this.powerDown.push(
            new PowerDown(this.ctx, this.canvasSize, this.velocity, this.timer, this.player)
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
        this.ctx.font = '35px Griffy'
        this.ctx.fillText(`${this.lifes}`, 150, 75)
    },
    drawDistance() {
        this.ctx.fillStyle = 'white'
        this.ctx.font = '35px Griffy'
        this.ctx.fillText(`SCORE ${this.score}`, 200, 75)
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
        this.ctx.font = '35px  Griffy'
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

            let accObstacle = 175
            let accBoxes = 553

            if (this.timer % 10 === 0) {
                this.score++
            }

            if (this.distance === 1) {
                this.distance = 0
                this.velocity += 0.2
                accBoxes -= 0.2
                accObstacle -= 0.2
                console.log(accBoxes)
            }

            if (this.timer % 175 === 0) {
                this.distance++

            }


            if (this.timer % accObstacle === 0) {
                this.drawObstacle()
            }

            if (this.timer % accBoxes === 0) {

                this.drawBoxes()

            }

            if (this.timer % 324 === 0) {
                this.drawCoins()
            }

            if (this.timer % 463 === 0) {
                this.drawPowerDown()
            }


            this.clearObstacles()
            this.clearAll()
            this.moveAll()
            this.obstacleColissions()
            this.coinColissions()
            this.boxColissions()
            this.powerDownColissions()
            this.coinsToLifeConverter()

            this.drawAll()

            if (this.lifes === 0) {
                this.gameOver()
                this.canColission = false
            }



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

        this.powerDown = this.powerDown.filter(element => element.dimensions.pos.x >= 0)

    },
    moveAll() {
        this.player.move()
        this.obstacles.forEach(element => element.move())
        this.boxes.forEach(element => element.move())
        this.coins.forEach(element => element.move())
        this.powerDown.forEach(element => element.move())
        // console.log('holi')
    },
    drawAll() {
        this.background.draw()
        this.drawLifes()
        this.drawCoinsCounter()
        this.drawDistance()
        this.player.drawPlayer(this.timer)
        this.boxes.forEach(element => element.draw(this.timer))
        this.powerDown.forEach(element => element.draw(this.timer))
        this.obstacles.forEach(element => element.draw(this.timer))
        this.coins.forEach(element => element.draw(this.timer))

        // console.log('holi')
    },


    obstacleColissions() {
        this.obstacles.some((element, obstacleID) => {
            if (this.canColission && element.dimensions.pos.x < this.player.cardPlayer.pos.x + this.player.cardPlayer.size.w &&
                element.dimensions.pos.x + element.dimensions.size.w > this.player.cardPlayer.pos.x &&
                element.dimensions.pos.y < this.player.cardPlayer.pos.y + this.player.cardPlayer.size.h &&
                element.dimensions.size.h + element.dimensions.pos.y > this.player.cardPlayer.pos.y
            ) {
                if (this.lastObstacle !== obstacleID) {

                    console.log('---- VIDAS ----', this.lifes)


                    this.lifes--
                    this.lastObstacle = obstacleID

                    let ghostSound = new Audio('./sound/hurt.wav')
                    ghostSound.volume = 0.2
                    ghostSound.play()

                    console.log('---- VIDAS ----', this.lifes)

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
                this.coins.splice(element[index], 1)
                this.coinsCounter++
                let coinsSound = new Audio('./sound/coin.mp3')
                coinsSound.volume = 0.3
                coinsSound.play()
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
    powerDownColissions() {

        this.powerDown.forEach((element, index) => {
            if (element.dimensions.pos.x < this.player.cardPlayer.pos.x + this.player.cardPlayer.size.w &&
                element.dimensions.pos.x + element.dimensions.size.w > this.player.cardPlayer.pos.x &&
                element.dimensions.pos.y < this.player.cardPlayer.pos.y + this.player.cardPlayer.size.h &&
                element.dimensions.size.h + element.dimensions.pos.y > this.player.cardPlayer.pos.y) {
                this.powerDown.splice(element[index], 1)
                this.lifes = 0
                let powerDownSound = new Audio('./sound/hurt.wav')
                powerDownSound.volume = 0.2
                powerDownSound.play()
            }


        })
    },

    boxColissions() {
        this.boxes.forEach((element, index) => {
            if (element.dimensions.pos.x < this.player.cardPlayer.pos.x + this.player.cardPlayer.size.w &&
                element.dimensions.pos.x + element.dimensions.size.w > this.player.cardPlayer.pos.x &&
                element.dimensions.pos.y < this.player.cardPlayer.pos.y + this.player.cardPlayer.size.h &&
                element.dimensions.size.h + element.dimensions.pos.y > this.player.cardPlayer.pos.y
            ) {


                // console.log('holiwis')
                if (this.lastBox !== index) {
                    this.lifes--
                    this.lastBox = index
                    let boxSound = new Audio('./sound/hurt.wav')
                    boxSound.volume = 0.2
                    boxSound.play()

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
            let lifesSound = new Audio('./sound/magic.mp3')
            lifesSound.play()
        }


    },






    gameOver() {
        this.player.isAlive = false
        this.canColission = false
        this.player.deadAnimation(this.timer)
        this.musicBackground.pause()
        this.gameOverSound.volume = 0.1
        this.gameOverSound.play()



        setTimeout(() => {
            clearInterval(1)




            this.ctx.fillStyle = '#eb2646'
            this.ctx.font = '75px Griffy'
            this.ctx.fillText(`SCORE: ${this.score}`, this.canvasSize.w / 2 - 200, this.canvasSize.h / 2 + 100)
            this.ctx.fillStyle = 'white'
            this.ctx.font = '100px Griffy'
            this.ctx.fillText(`YOU`, this.canvasSize.w / 2 - 300, this.canvasSize.h / 2 - 20)
            this.ctx.fillStyle = '#eb2646'
            this.ctx.font = '100px Griffy'
            this.ctx.fillText(`DEAD`, this.canvasSize.w / 2, this.canvasSize.h / 2 - 20)
            this.ctx.fillStyle = 'white'
            this.ctx.font = '30px Griffy'
            this.ctx.fillText(`TU AWELA ESTARIA ORGULLOSA klk :D`, this.canvasSize.w / 2 - 280, this.canvasSize.h / 2 + 300)




        }, 3000)

        setTimeout(() => {

            window.location.reload()

        }, 10000)



    }
}

