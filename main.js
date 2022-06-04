import { setupGround, updateGround } from './ground.js'
import { setupCactus, updateCactus, getCactusRect } from './cactus.js'
import { setupDino, updateDino, getDinoRect } from './dino.js'

let lastTime, timeScale, score
const timeScaleRatio = 0.00002
const title = document.querySelector('.title')
const scoreElement = document.querySelector('[data-score]')
const highscoreElement = document.querySelector('[data-high-score]')
highscoreElement.innerText = Math.floor(localStorage.getItem('data'))


function handleStart() {
    timeScale = 1
    lastTime = null
    score = 0

    title.classList.add('hide')

    setupGround()
    setupCactus()
    setupDino()

    window.requestAnimationFrame(updateLoop)
}

function updateLoop(time) {
    if (lastTime == null) {
        lastTime = time
        requestAnimationFrame(updateLoop)
        return
    }
    const delta = time - lastTime
    lastTime = time

    updateGround(delta, timeScale)
    updateCactus(delta, timeScale)
    updateDino(delta, timeScale)
    updateTimeScale(delta)
    updataScore(delta)

    if(localStorage.getItem('data') === undefined) {
        localStorage.setItem('data', score)
    }
    highscoreElement.innerText = Math.floor(localStorage.getItem('data'))

    if (checkLose()) return handleLose()

    requestAnimationFrame(updateLoop)
}

function updateTimeScale(delta) {
    timeScale += delta * timeScaleRatio
}

function updataScore(delta) {
    score += delta * timeScale * 0.005
    scoreElement.innerText = Math.floor(score)
}

function checkLose() {
    return getCactusRect().some(cactus => isCollision(cactus, getDinoRect()))
}

function handleLose() {
    if (score > localStorage.getItem('data')) {
        localStorage.setItem('data', score)
    }
    document.querySelector('[data-dino]').src = 'imgs/dino-lose.png'
    setTimeout(() => {
        window.addEventListener('click', handleStart, { once: true })
        title.classList.remove('hide')
    }, 500)
}

function isCollision(rect1, rect2) {
    return (
        rect1.top < rect2.bottom &&
        rect1.left < rect2.right &&
        rect1.bottom > rect2.top &&
        rect1.right > rect2.left
    )
}

window.addEventListener('click', handleStart, { once: true })