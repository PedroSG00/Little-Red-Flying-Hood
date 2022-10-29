const app = {
    appName: 'Iron-Jet',
    version: '1.0.0',
    license: undefined,
    author: 'Miguel García y Pedro Suárez',
    description: 'Endless-Runner of Jetpacks',
    ctx: undefined,
    fps: 60,
    lifes: 3,
    distance: 0,
    obstacles: [],
    timer: 0,
    canvasSize: {
        w: undefined,
        h: undefined,
    },

    keys: {

        fly: 'SPACE',
        // goDown: 'ArrowDown'
    },
    init() {
        this.setDimensions();
        this.drawObstacle()
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
            new Obstacle(this.ctx, this.canvasSize)
        )
    },

    drawLifes() {
        this.ctx.fillStyle = 'white'
        this.ctx.font = '50px Arial'
        this.ctx.fillText(`Lifes: ${this.lifes}`, 100, 100)
    },

    drawDistance() {

        this.ctx.fillStyle = 'white'
        this.ctx.font = '50px Arial'
        this.ctx.fillText(`Meters: ${this.distance}`, 100, 200)

    },

    reset() {

        this.drawBackground()
        this.player = new Player(this.ctx, this.keys)
        this.obstacles = []

    },


    start() {

        this.reset()

        setInterval(() => {

            this.timer++
            if (this.timer % 120 === 0) {
                this.distance++
                this.drawObstacle()
                // console.log('holi')
            }
            this.clearObstacles()
            this.clearAll()
            this.drawAll()
            this.colissions()
            this.moveAll()

        }, 1000 / this.fps)
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
        // console.log('holi')
    },

    clearObstacles() {
        this.obstacles = this.obstacles.filter(element => element.dimensions.pos.x >= 0)
    },

    moveAll() {
        this.player.move()
        this.obstacles.forEach(element => element.move())
        // console.log('holi')
    },

    drawAll() {
        this.drawBackground()
        this.drawLifes()
        this.drawDistance()
        this.player.drawPlayer()
        this.obstacles.forEach(element => element.draw())
        // console.log('holi')

    },

    colissions() {

        this.obstacles.forEach(element => {
            if (
                element.dimensions.pos.x < this.player.cardPlayer.pos.x + this.player.cardPlayer.size.w &&
                element.dimensions.pos.x + element.dimensions.size.w > this.player.cardPlayer.pos.x &&
                element.dimensions.pos.y < this.player.cardPlayer.pos.y + this.player.cardPlayer.size.h &&
                element.dimensions.size.h + element.dimensions.pos.y > this.player.cardPlayer.pos.y
            ) {
                this.gameOver()
            }
        })
    },

    gameOver() {
        clearInterval(1)
    }


}