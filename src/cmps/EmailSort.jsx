import { useState } from 'react'
import { FaSort, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa'; 
import PropTypes from 'prop-types'
import { useEffectUpdate } from "../customHooks/useEffectUpdate";

export function EmailSort({ filterBy, onFilterBy }) {
    const [ filterByToEdit, setFilterByToEdit ] = useState(filterBy)

    useEffectUpdate(() => {
        onFilterBy(filterByToEdit)
    }, [filterByToEdit])

    const handleSortChange = (e) => {
        const { name, value } = e.target;
        setFilterByToEdit(prev => ({ ...prev, [name]: value }));
    };

    const { sortField, sortOrder } = filterBy 
    
    return (
        <div className="email-sort">
            <label htmlFor="sortField">Sort by:</label>
            <div className="select-wrapper">
                <FaSort className="icon" />
                <select name="sortField" value={sortField} onChange={handleSortChange}>
                    <option value="">Select</option>
                    <option value="date">Date</option>
                    <option value="subject">Subject</option>
                </select>
            </div>

            <div className="select-wrapper">
                {sortOrder === 'asc' ? <FaSortAlphaDown className="icon" /> : <FaSortAlphaUp className="icon" />}
                <select name="sortOrder" value={sortOrder} onChange={handleSortChange}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        </div>
    );
}

EmailSort.propTypes = {
    filterBy: PropTypes.object.isRequired, 
    onFilterBy: PropTypes.func.isRequired,
}