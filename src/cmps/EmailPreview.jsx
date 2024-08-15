export function EmailPreview({ email }){
    const isStarred = email.isStarred

    return <section>
        <img src={`https://robohash.org/${star}`} alt="" />
        <p>{email.subject}</p>
        <p>{email.subject}</p>
        <p>{email.subject}</p>
        <p>{email.subject}</p>
    </section>
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