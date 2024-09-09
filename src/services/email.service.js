import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    getById,
    remove,
    save,
    getDefaultFilter,
    getFilterFromSearchParams,
    getUnreadCount,
    createEmail,
}

const STORAGE_KEY = 'email'
const LOGGED_IN_USER_EMAIL = 'user@appsus.com'

_createEmails()

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY);

    if (filterBy) {
        let { folder = "inbox", txt = "", isRead = null, sortField = "", sortOrder = "asc" } = filterBy;

        emails = emails.filter(email =>
            (isRead === null || email.isRead === isRead) &&
            (email.body?.toLowerCase().includes(txt.toLowerCase()) || email.subject?.toLowerCase().includes(txt.toLowerCase()))
        );

        const filters = {
            inbox: email => email.to === LOGGED_IN_USER_EMAIL && email.removedAt === null,
            sent: email => email.to !== LOGGED_IN_USER_EMAIL && email.removedAt === null,
            starred: email => email.isStarred === true && email.removedAt === null,
            trash: email => email.removedAt !== null,
            drafts: email => email.sentAt === null && email.removedAt === null,
        };

        emails = folder ? emails.filter(filters[folder]) : emails;

        if (sortField) {
            emails.sort((a, b) => {
                let comparison = 0;

                switch (sortField) {
                    case 'date':
                        comparison = new Date(a.sentAt) - new Date(b.sentAt);
                        break;
                    case 'subject':
                        comparison = a.subject.localeCompare(b.subject);
                        break;
                    default:
                        return 0; 
                }

                return sortOrder === 'desc' ? -comparison : comparison;
            });
        }
    }

    return emails;
}

async function getUnreadCount() {
    let emails = await storageService.query(STORAGE_KEY)
    return emails.filter(email => email.to === LOGGED_IN_USER_EMAIL && email.removedAt === null && !email.isRead).length
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function getDefaultFilter() {
    return {
        folder: "inbox", 
        txt: "", 
        isRead: null,
        sortField: "",  // 'date', 'subject'
        sortOrder: "asc",  // 'asc' for ascending or 'desc' for descending
    }
}

function getFilterFromSearchParams(searchParams) {
    const filterBy = {};

    for (const [field] of Object.entries(getDefaultFilter())) {
        let value = searchParams.get(field);

        if (value === "null") value = null;
        else if (value === "true") value = true;
        else if (value === "false") value = false;

        filterBy[field] = value !== null ? value : (field === "isRead" ? null : "");
    }

    const folder = searchParams.get('folder') || 'inbox'
    filterBy["folder"] = folder

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
            body: 'Would love to catch up sometime.',
            isRead: false,
            isStarred: true,
            sentAt: 1551133930594,
            removedAt: null,
            to: 'demo@appsus.com'
        },
        {
            id: 'e102',
            subject: 'Hello there!',
            body: 'How are you today?',
            isRead: false,
            isStarred: false,
            sentAt: 1551133930594,
            removedAt: null,
            to: 'user@appsus.com'
        },
        {
            id: 'e103',
            subject: 'This is Spam',
            body: 'BLA BLA BLA',
            isRead: true,
            isStarred: false,
            sentAt: 1551133930594,
            removedAt: null,
            to: 'ilan@appsus.com'
        },
        {
            id: 'e104',
            subject: 'Let\'s talk',
            body: 'I need to talk to you.',
            isRead: false,
            isStarred: false,
            sentAt: 1551133930594,
            removedAt: null,
            to: 'user@appsus.com'
        },
        {
            id: 'e105',
            subject: 'Sale starts in ZARA today!',
            body: 'Big discounts!',
            isRead: true,
            isStarred: true,
            sentAt: 1551133930594,
            removedAt: null,
            to: 'user@appsus.com'
        },
        {
            id: 'e106',
            subject: 'New mail',
            body: 'Just for you.',
            isRead: true,
            isStarred: true,
            sentAt: Date.now() - 1232131,
            removedAt: 1551133930594,
            to: 'ypp@aps.com'
        },
        {
            id: 'e107',
            subject: 'Yossi',
            body: 'Scheduled meeting with you.',
            isRead: true,
            isStarred: false,
            sentAt: 1551133930594,
            removedAt: 1551133930594,
            to: 'ypp@aps.com'
        },
        {
            id: 'e108',
            subject: 'Test result',
            body: 'Here are your test results.',
            isRead: true,
            isStarred: true,
            sentAt: 1683893674944,
            removedAt: 1551133930594,
            to: 'ypp@aps.com'
        },
        {
            id: 'e109',
            subject: 'Top secret!!!!',
            body: 'Only for you.',
            isRead: true,
            isStarred: false,
            sentAt: Date.now() - 21391293,
            removedAt: null,
            to: 'ypp@aps.com'
        },
        {
            id: 'e110',
            subject: 'SPAM SPAM SPAM',
            body: 'This is spam spam spam.',
            isRead: true,
            isStarred: true,
            sentAt: Date.now() - 99999,
            removedAt: null,
            to: 'ypp@aps.com'
        },
        // Additional mock emails
        {
            id: 'e111',
            subject: 'Meeting Reminder',
            body: 'Don’t forget our meeting tomorrow at 10 AM.',
            isRead: false,
            isStarred: false,
            sentAt: Date.now() - 86400000,
            removedAt: null,
            to: 'manager@appsus.com'
        },
        {
            id: 'e112',
            subject: 'Flight Booking Confirmation',
            body: 'Your flight has been successfully booked. Details inside.',
            isRead: true,
            isStarred: true,
            sentAt: Date.now() - 432000000,
            removedAt: null,
            to: 'user@appsus.com'
        },
        {
            id: 'e113',
            subject: 'Newsletter: September Updates',
            body: 'Check out the latest features we’ve added this month!',
            isRead: false,
            isStarred: false,
            sentAt: Date.now() - 259200000,
            removedAt: null,
            to: 'user@appsus.com'
        },
        {
            id: 'e114',
            subject: 'Subscription Expiry',
            body: 'Your subscription will expire in 3 days. Renew now to avoid disruption.',
            isRead: false,
            isStarred: true,
            sentAt: Date.now() - 72000000,
            removedAt: null,
            to: 'user@appsus.com'
        },
        {
            id: 'e115',
            subject: 'Event Invitation',
            body: 'You are invited to our annual event. Please RSVP.',
            isRead: true,
            isStarred: false,
            sentAt: Date.now() - 604800000,
            removedAt: null,
            to: 'user@appsus.com'
        },
        {
            id: 'e116',
            subject: 'Your Order Has Been Shipped',
            body: 'Your order is on its way. Track your shipment here.',
            isRead: true,
            isStarred: false,
            sentAt: Date.now() - 172800000,
            removedAt: null,
            to: 'user@appsus.com'
        },
        {
            id: 'e117',
            subject: 'Password Reset Request',
            body: 'Click here to reset your password. This link will expire in 1 hour.',
            isRead: false,
            isStarred: false,
            sentAt: Date.now() - 3600000,
            removedAt: null,
            to: 'user@appsus.com'
        },
        {
            id: 'e118',
            subject: 'Job Application Received',
            body: 'Thank you for applying to the Software Engineer position. We will review your application shortly.',
            isRead: false,
            isStarred: true,
            sentAt: Date.now() - 518400000,
            removedAt: null,
            to: 'user@appsus.com'
        },
        {
            id: 'e119',
            subject: 'Congratulations!',
            body: 'You’ve won a prize! Claim it now before it’s too late!',
            isRead: true,
            isStarred: false,
            sentAt: Date.now() - 216000000,
            removedAt: null,
            to: 'user@appsus.com'
        }
    ]

    utilService.saveToStorage(STORAGE_KEY, emails)
}


