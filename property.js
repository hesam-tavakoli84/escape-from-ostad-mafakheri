export function getProperty(element, prop) {
    return parseFloat(getComputedStyle(element).getPropertyValue(prop)) || 0
}

export function setProperty(element, prop, value) {
    element.style.setProperty(prop, value)
}

export function incProperty(element, prop, inc) {
    setProperty(element, prop, getProperty(element, prop) + inc)
}