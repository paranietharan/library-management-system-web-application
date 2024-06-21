import LibrarianTopNavBar from '../Components/LibrarianTopNavBar';
import styles from './style/AdminFineManagementStyle.module.css';
import SearchAppBar from '../Components/SearchBarComponent';
import { useState } from 'react';
import Footer from '../Components/LibraryFooter';
import FineManagementTable from '../Components/FineManagementTable';

function AdminFineManagement() {

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (query) => {
        setSearchQuery(query);
        console.log('Search Query:', query); // You can handle the search query here (e.g., making API calls)
    };

    return (
        <>
            <div className={styles.Container}>
                <LibrarianTopNavBar />

                <div className={styles.contents}>
                    <div className={styles.searchSection}>
                        <SearchAppBar
                            SearchBarPlaceholder="Search..."
                            width="80%"
                            onSearchChange={handleSearchChange}
                        />
                    </div>

                    <div className={styles.searchResults}>
                        <p>Search Results for : {searchQuery}</p>

                        <div className={styles.FineManagementTable}>
                            <FineManagementTable />
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}

export default AdminFineManagement;