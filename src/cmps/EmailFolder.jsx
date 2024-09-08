/* eslint-disable react/prop-types */
export function EmailFolder({ folder, img, isSelected, count, onClick }) {
    const countTxt = count ? `(${count})` : ""

    function className() {
        return `email-folder ${isSelected ? 'selected' : ''}`
    }
    
    return <h4 className={className()} onClick={onClick}>
            <img className="folder-img" 
                        src={img} 
                        alt=""
                    />
            {`${folder} ${countTxt}`} 
        </h4>        
}
