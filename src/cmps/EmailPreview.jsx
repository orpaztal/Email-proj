import yellowStar from '../assets/imgs/star-yellow.png'
import star from '../assets/imgs/star.png'

export function EmailPreview({ email }){
    const isStarred = email.isStarred
    const isRead = email.isRead ? "true" : "false"

    return <li className="email-preview">
            <section className="email-left">
                <img className="star-img" src={isStarred ? yellowStar : star} alt=""/>
                <p className="email-subject">{email.subject}</p>
                <p className="email-body">{email.body}</p>
            </section>
            <p className="email-read">{isRead}</p>
            <p className="email-date">{email.sentAt}</p>
            {/* todo: implement hover buttons */}
        </li>
}

// {
//     id: 'e105',
//     subject: 'Sale starts in ZARA today!',
//     body: 'Big discounts!', 
//     isRead: true,
//     isStarred: true,
//     sentAt : 1551133930594,
//     removedAt : null, //for later use from: 'momo@momo.com',
//     to: 'user@appsus.com'
// },