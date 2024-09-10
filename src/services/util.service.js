export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    padNum,
    saveToStorage,
    loadFromStorage,
    getExistingProperties,
    debounce,
    getUserCordinates,
    animateCSS,
}

function getUserCordinates() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords
            resolve({ lat: latitude, lng: longitude })
        }, reject)
    })

}

function animateCSS(el, animation, isRemoveClass = true) {
    const prefix = 'animate__'
    return new Promise((resolve) => {
        const animationName = `${prefix}${animation}`
        el.classList.add(`${prefix}animated`, animationName)

        function handleAnimationEnd(event) {
            event.stopPropagation()
            if (isRemoveClass) el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }

        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
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

function getExistingProperties(obj, searchParams) {
    const truthyObj = {}
 
    const searchParamsArr = searchParams.split('&');
    const searchParamsObj = {};
    searchParamsArr.forEach(param => {
        const [key, value] = param.split('=');
        if (key && value !== undefined && value !== '') {
            searchParamsObj[key] = decodeURIComponent(value);
        }
    });

    for (const key in searchParamsObj) {
        const val = searchParamsObj[key];
        if (val || typeof val === 'boolean') {
            truthyObj[key] = val;
        }
    }

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