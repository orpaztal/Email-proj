
export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    padNum,
    saveToStorage,
    loadFromStorage,
    getExistingProperties,
    debounce,
}

function makeLorem(size = 100) {
    var words = [
        'sky',
        'above',
        'port',
        'was',
        'television',
        'tuned',
        'to',
        'channel',
        'all',
        'baby',
        'thing',
        'happened',
        'less',
        'I',
        'had',
        'story',
        'bit',
        'people',
        'and',
        'generally',
        'happens',
        'cases',
        'time',
        'it',
        'was',
        'story',
        'It',
        'was',
        'pleasure',
        'to',
        'burn',
    ]
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt.slice(0, -1)
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function padNum(num) {
    return num > 9 ? num + '' : '0' + num
}

function getExistingProperties(obj) {
    const truthyObj = {}
    for (const key in obj) {
        const val = obj[key]
        if (val || typeof val === 'boolean') {
            truthyObj[key] = val
        }
    }
    return truthyObj
}

function debounce(func, time) {
    let timeoutId
    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func(...args)
        }, time)
    }
}

function makeId(length = 5) {
    console.log("makeID called")
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}