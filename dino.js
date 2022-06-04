import { getProperty, setProperty, incProperty } from "./property.js";

const dino = document.querySelector('[data-dino]')
const DINO_FRAME = 2
const DINO_SPEED = 0.45
const GRAVITY = 0.0015
let velocity, count, dinoRun, isJumping

export function setupDino() {
    count = 0
    velocity = 0
    dinoRun = 0
    isJumping = false
    setProperty(dino, '--dino-bottom', 0)

    document.removeEventListener('keydown', onJump)
    document.addEventListener('keydown', onJump)
}

export function updateDino(delta, timeScale) {
    handleRun(delta, timeScale)
    handleJump(delta)
}

export function getDinoRect() {
    return dino.getBoundingClientRect()
}

function handleJump(delta) {
    if (!isJumping) return

    incProperty(dino, '--dino-bottom', delta * velocity)

    velocity -= delta * GRAVITY

    if (getProperty(dino, '--dino-bottom') <= 0) {
        setProperty(dino, '--dino-bottom', 0)
        isJumping = false
    }
}

function handleRun(delta, timeScale) {
    if (count >= 200) {
        dinoRun = (dinoRun + 1) % DINO_FRAME
        dino.src = `imgs/dino-run-${dinoRun}.png`
        count -= 200
    }

    count += delta * timeScale

    if (isJumping) {
        dino.src = 'imgs/dino-stationary.png'
    }
}

function onJump(e) {
    if (e.code !== "Space" || isJumping) return

    isJumping = true
    velocity = DINO_SPEED
}

window.addEventListener('click', () => {
    isJumping = true
    velocity = DINO_SPEED
})