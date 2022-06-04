import { getProperty, setProperty, incProperty } from "./property.js";

const grounds = document.querySelectorAll('[data-ground]')
const SPEED = 0.02
export function setupGround() {
    setProperty(grounds[0], '--ground-left', 0)
    setProperty(grounds[1], '--ground-left', 300)
}

export function updateGround(delta, timeScale) {
    grounds.forEach(ground => {
        if(getProperty(ground, '--ground-left') <= -300) {
            setProperty(ground, '--ground-left', 300)
        }
        
        if(window.innerWidth < 768) {
            incProperty(ground, '--ground-left', delta * timeScale * SPEED * -1 * 2)
        } else {
            incProperty(ground, '--ground-left', delta * timeScale * SPEED * -1)   
        }
        
    })
}
