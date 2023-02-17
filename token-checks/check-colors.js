const base = require('../tokens/color/base.json')
const color = require('../tokens/color/color.json')

const isLink = (value) => {
    return value.startsWith('{') && value.endsWith('}');
}

const shiftLevel = (obj, callback) => {
    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object') {
            shiftLevel(obj[key], callback);
        } else {
            const value = obj[key];
            if (!isLink(value)) {
                callback(value);
            }
        }
    })
}
const assertColor = (value) => {
    const hexColorRegex = new RegExp('(^#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?$)');
    
    // Adopted from https://stackoverflow.com/questions/7543818/regex-javascript-to-match-both-rgb-and-rgba
    const rgbColorRegex = new RegExp('^rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)(?:,\\s*(\\d+(?:\\.\\d+)?))?\\)$');

    if(!value.match(hexColorRegex) && !value.match(rgbColorRegex)) {
        throw new Error(`${value} is no valid color`)
    }
}


shiftLevel(base, assertColor);
shiftLevel(color, assertColor);