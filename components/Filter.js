import React, { useState } from 'react';

function Filter({ onFilterChange }) {
    const [filterType, setFilterType] = useState('name');
    const [filterQuery, setFilterQuery] = useState('');

    const handleFilterTypeChange = (e) => {
        setFilterType(e.target.value);
        setFilterQuery(''); // Clear the filter query when switching type
    };

    const handleFilterQueryChange = (e) => {
        setFilterQuery(e.target.value);
        onFilterChange(e.target.value, filterType);
    };

    return (
        <div className="filter">
            <select value={filterType} onChange={handleFilterTypeChange}>
                <option value="name">Name</option>
                <option value="department">Department</option>
            </select>
            <input
                type="text"
                placeholder={`Search by ${filterType}`}
                value={filterQuery}
                onChange={handleFilterQueryChange}
            />
        </div>
    );
}

export default Filter;
