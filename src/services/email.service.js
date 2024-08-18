import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    getById,
    remove,
    save,
    getDefaultFilter,
    getCountOfUnreadEmails,
}

const STORAGE_KEY = 'email'

// const loggedinUser = {
//     email: 'user@appsus.com', 
//     fullname: 'Mahatma Appsus'
// }

_createEmails()

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)

    if (filterBy) {
        let { status = "", txt = "", isRead = null } = filterBy

        emails = emails.filter(email =>
            (isRead === null || email.isRead === isRead) &&
            (email.body.toLowerCase().includes(txt.toLowerCase()) || email.subject.toLowerCase().includes(txt.toLowerCase()))
        )

        const filters = {
            inbox: email => email.to === 'user@appsus.com',
            sent: email => email.to !== 'user@appsus.com',
            star: email => email.isStarred === true,
            trash: email => email.removedAt !== null
        };
    
        return status ? emails.filter(filters[status]) : emails;
    }
    return emails
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

async function getCountOfUnreadEmails() {
    let emails = await storageService.query(STORAGE_KEY)
    return emails.filter(email => !!email.isRead).length
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        emailToSave.isOn = false
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function getDefaultFilter() {
    return {
        status: "", 
        txt: "", 
        isRead: null,
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (emails && emails.length > 0) return

    emails = [
        {
            id: 'e101',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes', 
            isRead: false,
            isStarred: true,
            sentAt : 1551133930594,
            removedAt : null, //for later use from: 'momo@momo.com',
            to: 'demo@appsus.com'
        },
        {
            id: 'e102',
            subject: 'Hello there!',
            body: 'How are you today', 
            isRead: false,
            isStarred: false,
            sentAt : 1551133930594,
            removedAt : null, //for later use from: 'momo@momo.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e103',
            subject: 'This is Spam',
            body: 'BLA BLA BLA', 
            isRead: true,
            isStarred: false,
            sentAt : 1551133930594,
            removedAt : null, //for later use from: 'momo@momo.com',
            to: 'ilan@appsus.com'
        },
        {
            id: 'e104',
            subject: 'Lets talk',
            body: 'I need to talk to you', 
            isRead: false,
            isStarred: false,
            sentAt : 1551133930594,
            removedAt : null, //for later use from: 'momo@momo.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e105',
            subject: 'Sale starts in ZARA today!',
            body: 'Big discounts!', 
            isRead: true,
            isStarred: true,
            sentAt : 1551133930594,
            removedAt : null, //for later use from: 'momo@momo.com',
            to: 'user@appsus.com'
        },
    ]
    utilService.saveToStorage(STORAGE_KEY, emails)
}