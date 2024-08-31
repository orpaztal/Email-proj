/* eslint-disable react/prop-types */

export function EmailFolder({ btnText, count, onClick }) {
    const countTxt = count ? `(${count})` : ""
    return <h4 className="email-folder" onClick={onClick}>{`${btnText} ${countTxt}`} </h4>
}