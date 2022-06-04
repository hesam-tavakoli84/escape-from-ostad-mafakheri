import { getProperty, setProperty, incProperty } from "./property.js";

const worldElement = document.querySelector('[data-world]')
const TIME_MIN = 2000
const TIME_MAX = 4000
const SPEED = 0.02
let count

export function setupCactus() {
    document.querySelectorAll('[data-cactus]').forEach(cactus => {
        cactus.remove()
    })
    count = TIME_MIN
}

export function updateCactus(delta, timeScale) {
    if(count <= 0) {
        createCactus()
        count = randomBetween(TIME_MIN, TIME_MAX) 
    }

    document.querySelectorAll('[data-cactus]').forEach(cactus => {
        if(window.innerWidth < 768) {
            incProperty(cactus, '--cactus-left', delta * timeScale * -1 * SPEED * 2)
        } else {
            incProperty(cactus, '--cactus-left', delta * timeScale * -1 * SPEED)
        }
        
        if(getProperty(cactus, '--cactus-left') <= -50) {
            cactus.remove()
        }
    })

    count -= delta * timeScale
}

export function getCactusRect() {
    return [...document.querySelectorAll('[data-cactus]')].map(cactus => {
        return cactus.getBoundingClientRect()
    })
}

function createCactus() {
    const cactus = document.createElement('img')
    cactus.src = 'imgs/cactus.png'
    cactus.classList = 'cactus'
    cactus.dataset.cactus = true
    worldElement.append(cactus)
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
