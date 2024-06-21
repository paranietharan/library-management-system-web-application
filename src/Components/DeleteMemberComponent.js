// DeleteMemberComponent.js
import React, { useState } from 'react';
import styles from './style/DeleteMemberComponent.module.css';

function DeleteMemberComponent() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        setSearchResults([
            {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                indexNumber: 'A12345',
                email: 'paranie@gmail.com',
                phoneNumber: '1234567890',
                fineAmount: 7000,
            },
        ]);
    }

    return (
        <div className={styles.deleteMemberComponent}>
            <h2>Delete Member</h2>
            <input
                type="text"
                placeholder="Search by Name or Index Number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <div className={styles.searchResults}>
                {/* Display search results here */}
            </div>
        </div>
    );
}

export default DeleteMemberComponent;