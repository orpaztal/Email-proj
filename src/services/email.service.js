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
// _createMails()

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
                        return 0; // No sorting
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

function getEmptyMail(
    subject = '',
    body = '',
    sentAt = '',
    from = '',
    to = '',
    isRead = false,
    isStarred = false,
    removedAt = null
) {
    return { id: '', subject, body, sentAt, from, to, isRead, isStarred, removedAt }
}

function _createMail(subject, body, sentAt, from, to, isRead, isStarred, removedAt = null) {
    const mail = getEmptyMail(subject, body, sentAt, from, to, isRead, isStarred, removedAt)
    mail.id = utilService.makeId()
    return mail
}

function _createMails() {
    let mails = utilService.loadFromStorage(STORAGE_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(
            _createMail(
                'Urgent!',
                `Dear Sir:

I have been requested by the Nigerian National Petroleum Company to contact you for assistance in resolving a matter. The Nigerian National Petroleum Company has recently concluded a large number of contracts for oil exploration in the sub-Sahara region. The contracts have immediately produced moneys equaling US$40,000,000. The Nigerian National Petroleum Company is desirous of oil exploration in other parts of the world, however, because of certain regulations of the Nigerian Government, it is unable to move these funds to another region.
				
You assistance is requested as a non-Nigerian citizen to assist the Nigerian National Petroleum Company, and also the Central Bank of Nigeria, in moving these funds out of Nigeria. If the funds can be transferred to your name, in your United States account, then you can forward the funds as directed by the Nigerian National Petroleum Company. In exchange for your accommodating services, the Nigerian National Petroleum Company would agree to allow you to retain 10%, or US$4 million of this amount.
				
However, to be a legitimate transferee of these moneys according to Nigerian law, you must presently be a depositor of at least US$100,000 in a Nigerian bank which is regulated by the Central Bank of Nigeria.
				
If it will be possible for you to assist us, we would be most grateful. We suggest that you meet with us in person in Lagos, and that during your visit I introduce you to the representatives of the Nigerian National Petroleum Company, as well as with certain officials of the Central Bank of Nigeria.
				
Please call me at your earliest convenience at 18-467-4975. Time is of the essence in this matter; very quickly the Nigerian Government will realize that the Central Bank is maintaining this amount on deposit, and attempt to levy certain depository taxes on it.
				
Yours truly,
				
				Prince Alyusi Islassis`,
                Date.now() - 99999,
                'Alusi@Kingdom.com',
                'user@appsus.com',
                false,
                false
            )
        )
        mails.push(
            _createMail(
                'octopus!!!',
                `				⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠟⠛⠛⠻⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿
				⣿⣿⣿⣿⣿⠟⣉⣤⣶⣾⣿⣿⣿⣿⣷⣶⣤⣉⠻⣿⣿⣿⣿⣿⣿
				⣿⣿⣿⡟⣡⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡌⢻⣿⣿⣿⣿
				⣿⣿⡟⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⢿⣿⣿⣿
				⣿⣿⡇⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⢸⣿⣿⣿
				⣿⣿⡇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢸⣿⣿⣿
				⣿⣿⣇⢹⣿⡿⠋⠉⠻⣿⣿⣿⣿⣿⣿⡿⠟⠿⣿⣿⡇⣸⣿⣿⣿
				⣿⣿⣿⡈⢿⣇⠀⠀⢀⣿⣿⡿⢿⣿⣿⣾⣿⣿⣾⡿⢁⣿⣿⣿⣿
				⣿⠟⢿⣷⡘⣿⣿⣿⣿⣿⣧⣴⣤⣴⣿⣿⣿⣿⣿⢃⣾⡿⠻⣿⣿
				⡏⡄⠸⠟⠃⠈⠛⠛⠿⣿⣿⣿⠿⠛⠛⠻⣿⡿⠁⠘⠿⠇⢀⢹⣿
				⡅⣿⣄⠀⣰⣾⣿⣷⡄⠘⠟⣡⣶⣿⣿⣦⠈⠁⠰⠿⠃⣠⣿⢸⣿
				⣷⡹⢿⡀⢿⣿⣿⣿⣿⠀⣴⣿⣿⡟⢁⡀⠀⢰⣤⣶⣾⣿⢃⣾⣿
				⣿⣿⣦⣀⠸⣿⣿⡟⠃⠸⣿⣿⣿⡇⠘⣛⠂⠾⠿⢟⣋⣵⣿⣿⣿
				⣿⣿⣿⣿⣧⡘⠿⣿⠰⣶⣍⣛⣛⣃⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
				⣿⣿⣿⣿⣿⣿⣶⣤⣀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿`,
                Date.now() - 21391293,
                'momo@momo.com',
                'user@appsus.com',
                true,
                true
            )
        )
        mails.push(
            _createMail(
                'Buy our stuff!',
                `Hey Mahatma,
				
I haven't heard back from you and that tells me one of three things:

1) You've already chosen a different company for this, and if that's the case please let me know so I can stop bothering you.
2) Yo're still interested but haven't had the time to get back to me yet.
3) You've fallen and can't get up - in that case let me know and I'll call 911.

Please let me know which one is it because I'm starting to worry... Thanks in advance
and looking forward to hearing from you.`,
                1551133930594,
                'momo@momo.com',
                'user@appsus.com',
                false,
                false
            )
        )
        mails.push(
            _createMail(
                'Regarding your job application',
                `Dear Mahatma,
				
Thank you for your interest in our Full Stack Manager position in our London office. 
We regret to inform you that we have filled this position.
We appreciate your interst in opportunities with us, and will retain your information for consideration for future openings.
we wish you the best of success in your employment search`,
                1551133930594,
                'momo@momo.com',
                'user@appsus.com',
                true,
                false
            )
        )
        mails.push(
            _createMail(
                'Money transfer',
                `Dear Alyusi,
I understand the urgency of the matter. I have the funds ready, and will meet you in Lagos at once.
Looking forward to meeting the representatives of the National Petroleum Company.

Many thanks, 
Mahatma`,
                1683893674944,
                'user@appsus.com',
                'Alusi@Kingdom.com',
                true,
                false
            )
        )
        mails.push(
            _createMail(
                'Job Application for Marketing Manager Position',
                `Dear Company,

I hope this email finds you well. My name is Mahatma, and I am writing to express my strong interest in the Marketing Manager position at Company, as advertised on [Job Board/Company Website].
		
With a solid background in marketing strategy and a proven track record of driving successful campaigns, I am confident in my ability to contribute to the growth and success of Company. I have 5 years of experience in marketing roles, including my most recent position as Marketing Specialist at my previous company. During my time there, I led cross-functional teams, developed and implemented comprehensive marketing plans, and successfully increased brand awareness and customer engagement.
		
In addition to my experience, I hold a Bachelor's degree in Marketing from University of my state and have a deep understanding of digital marketing techniques, social media management, and market research. I am also proficient in various marketing tools, including Google Analytics, SEO optimization, and CRM software.
		
I am particularly drawn to Company due to its innovative approach to marketing and its commitment to delivering exceptional results. I am excited about the opportunity to leverage my skills and contribute to your marketing initiatives.
		
Please find attached my resume for your review. I would greatly appreciate the opportunity to discuss how my qualifications align with the requirements of the Marketing Manager position. I am available for an interview at your convenience.
		
Thank you for considering my application. I look forward to the possibility of joining the talented team at Company.
		
Best regards,
		
Mahatma
123-456-7890`,
                Date.now() - 1232131,
                'user@appsus.com',
                'company@email.com'
            )
        )
        for (let i = 0; i < 30; i++) {
            mails.push(
                _createMail(
                    utilService.makeLorem(utilService.getRandomIntInclusive(3, 6)),
                    utilService.makeLorem(utilService.getRandomIntInclusive(25, 150)),
                    utilService.getRandomIntInclusive(100000, Date.now()),
                    `${utilService.makeLorem(1)}@appsus.com`,
                    'user@appsus.com',
                    utilService.getRandomIntInclusive(0, 1) ? true : false,
                    utilService.getRandomIntInclusive(0, 1) ? true : false,
                    utilService.getRandomIntInclusive(0, 5)
                        ? null
                        : utilService.getRandomIntInclusive(100000, Date.now())
                )
            )
        }

        utilService.saveToStorage(STORAGE_KEY, mails)
    }
}

