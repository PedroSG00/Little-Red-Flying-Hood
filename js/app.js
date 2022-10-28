const app = {
    appName: 'Iron-Jet',
    version: '1.0.0',
    license: undefined,
    author: 'Miguel García y Pedro Suárez',
    description: 'Endless-Runner of Jetpacks',
    ctx: undefined,
    fps: 60,
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

    reset() {
        this.drawBackground()
        this.player = new Player(this.ctx, this.keys)
    },


    start() {

        this.reset()

        setInterval(() => {
            this.clearAll()
            this.drawAll()
        }, 1000 / this.fps)
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    moveAll() {

    },

    drawAll() {
        this.drawBackground()
        this.player.drawPlayer()
    },



}