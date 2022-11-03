
const game = document.querySelector('.canvasScreen')
const start = document.querySelector('#start')
const startButton = document.querySelector('#start-button')

startButton.addEventListener('click', () => {
    start.classList.add('hidden')
    game.classList.remove('hidden')
    app.init()
})


