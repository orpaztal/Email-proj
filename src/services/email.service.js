import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    getById,
    remove,
    save,
    getDefaultFilter,
    getCountOfUnreadEmails,
    getFilterFromSearchParams,
    getUnreadCount,
    createEmail,
}

const STORAGE_KEY = 'email'
const LOGGED_IN_USER_EMAIL = 'user@appsus.com'

_createEmails()

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)

    if (filterBy) {
        let { folder = "inbox", txt = "", isRead = null } = filterBy

        emails = emails.filter(email =>
            (isRead === null || email.isRead === isRead) &&
            (email.body?.toLowerCase().includes(txt.toLowerCase()) || email.subject?.toLowerCase().includes(txt.toLowerCase()))
        )

        const filters = {
            inbox: email => email.to === LOGGED_IN_USER_EMAIL && email.removedAt === null,
            sent: email => email.to !== LOGGED_IN_USER_EMAIL && email.removedAt === null,
            star: email => email.isStarred === true && email.removedAt === null,
            trash: email => email.removedAt !== null,
            drafts: email => email.sentAt === null,
        };
    
        return folder ? emails.filter(filters[folder]) : emails;
    }
    return emails
}

async function getUnreadCount() {
    let emails = await storageService.query(STORAGE_KEY)
    return emails.filter(email => email.to === LOGGED_IN_USER_EMAIL && email.removedAt === null && !email.isRead).length
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
        emailToSave.id = utilService.makeId()
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function getDefaultFilter() {
    return {
        folder: "inbox", 
        txt: "", 
        isRead: null,
    }
}

function getFilterFromSearchParams(searchParams) {
    // const defaultFilter = getDefaultFilter()
    // const filterBy = {}

    // for (const field in defaultFilter) {
    //     filterBy[field] = searchParams.get(field) || (field === "isRead" ? null : "")
    //     if (filterBy[field] === "null") {
    //         filterBy[field] = null
    //     }
    // }

    // return filterBy

    const filterBy = {};

    for (const [field] of Object.entries(getDefaultFilter())) {
        let value = searchParams.get(field);

        if (value === "null") value = null;
        else if (value === "true") value = true;
        else if (value === "false") value = false;

        filterBy[field] = value !== null ? value : (field === "isRead" ? null : "");
    }

    return filterBy;
}

function createEmail() {
    return {
        subject: "",
        body: "", 
        isRead: true,
        isStarred: false,
        sentAt : null,
        removedAt : null, 
        to: "",
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
        {
            id: 'e106',
            subject: 'New mail',
            body: 'just for you', 
            isRead: true,
            isStarred: true,
            sentAt : 1551133930594,
            removedAt : 1551133930594, //for later use from: 'momo@momo.com',
            to: 'ypp@aps.com'
        },
        {
            id: 'e107',
            subject: 'Yossi',
            body: 'Scheduled meeting with you', 
            isRead: true,
            isStarred: false,
            sentAt : 1551133930594,
            removedAt : 1551133930594, //for later use from: 'momo@momo.com',
            to: 'ypp@aps.com'
        },
        {
            id: 'e108',
            subject: 'Test result',
            body: 'here are your test results', 
            isRead: true,
            isStarred: true,
            sentAt : 1551133930594,
            removedAt : 1551133930594, //for later use from: 'momo@momo.com',
            to: 'ypp@aps.com'
        },
        {
            id: 'e109',
            subject: 'Top secret!!!!',
            body: 'only for you', 
            isRead: true,
            isStarred: false,
            sentAt : 1551133930594,
            removedAt : null, //for later use from: 'momo@momo.com',
            to: 'ypp@aps.com'
        },
        {
            id: 'e110',
            subject: 'SPAM SPAM SPAM',
            body: 'this is spam spam spam', 
            isRead: true,
            isStarred: true,
            sentAt : 1551133930594,
            removedAt : null, //for later use from: 'momo@momo.com',
            to: 'ypp@aps.com'
        },
    ]

    utilService.saveToStorage(STORAGE_KEY, emails)
}