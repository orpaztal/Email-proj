import PropTypes from 'prop-types'

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

EmailFolder.propTypes = {
    folder: PropTypes.string.isRequired, 
    img: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
}