import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export function EmailFolder({ folder, img, count, onClick }) {
    const countTxt = count ? `(${count})` : ""
    return <h4 className="email-folder" onClick={onClick}>
            <img className="folder-img" 
                        src={img} 
                        alt=""
                    />
            {`${folder} ${countTxt}`} 
        </h4>
        
    // return <Link className={"email-folder"} to={`/mail/${folder}`} onClick={onClick}> {`${folder} ${countTxt}`} </Link>
}
