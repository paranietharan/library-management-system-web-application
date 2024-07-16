import React, { useState, useEffect } from 'react';
import LibrarianTopNavBar from '../Components/LibrarianTopNavBar';
import styles from './style/AdminFineManagementStyle.module.css';
import Footer from '../Components/LibraryFooter';
import MemberSearchComponent from '../Components/MemberSearchComponent';
import httpCommon from '../service/http-common';

function AdminFineManagement() {
    const [selectedMember, setSelectedMember] = useState(null);
    const [unpaidFines, setUnpaidFines] = useState(null);
    const [allFines, setAllFines] = useState([]);
    const [userID, setUserID] = useState('');

    const handleSelectMember = (member) => {
        setSelectedMember(member);
        setUnpaidFines([]);
        setAllFines([]);
    };

    useEffect(() => {
        if (selectedMember) {
            setUserID(selectedMember.userID);
            getUnpaidFines(selectedMember.userID);
            getAllFines(selectedMember.userID);
        }
    }, [selectedMember]);

    // Function to get the unpaid fines of the selected member
    const getUnpaidFines = async (userID) => {
        try {
            const response = await httpCommon.get(`/fine/unpaid/${userID}`);
            setUnpaidFines(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Get all fines of the selected member
    const getAllFines = async (userID) => {
        try {
            const response = await httpCommon.get(`/fine/history/${userID}`);
            setAllFines(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Pay fine by fineID
    const payFine = async () => {
        try {
            await httpCommon.post(`/fine/settle/${userID}`);
            getUnpaidFines(userID);
            alert('Fine paid successfully');
            // refresh the unpaid fines
            setSelectedMember(null);
            setUnpaidFines([]);
            setAllFines([]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className={styles.Container}>
                <LibrarianTopNavBar />
                <div className={styles.contents}>
                    <div className={styles.MemberSearch}>
                        <MemberSearchComponent onSelectMember={handleSelectMember} />
                    </div>

                    <div className={styles.searchResults}>
                        {selectedMember && (
                            <div className={styles.fineTable}>
                                <div className={styles.fineTableHeader}>
                                    <h2>Fine Management</h2>
                                    <h3>Member: {selectedMember.userID}</h3>
                                    <button onClick={() => getAllFines(selectedMember.userID)} className={styles.viewAllButton}>View All Fines</button>
                                </div>
                                <div className={styles.fineTableBody}>
                                    <div className={styles.fineTableBodyHeader}>
                                        <div className={styles.fineTableBodyHeaderItem}>Fine ID</div>
                                        <div className={styles.fineTableBodyHeaderItem}>Amount</div>
                                        <div className={styles.fineTableBodyHeaderItem}>Date</div>
                                        <div className={styles.fineTableBodyHeaderItem}>Status</div>
                                        <div className={styles.fineTableBodyHeaderItem}>Actions</div>
                                    </div>
                                    <div className={styles.fineTableBodyContent}>
                                        {unpaidFines.fineId ? (
                                            <div className={styles.fineTableBodyContentRow} key={unpaidFines.fineId}>
                                                <div className={styles.fineTableBodyContentItem}>{unpaidFines.fineId}</div>
                                                <div className={styles.fineTableBodyContentItem}>{unpaidFines.amount}</div>
                                                <div className={styles.fineTableBodyContentItem}>{unpaidFines.resourceIssueDate}</div>
                                                <div className={styles.fineTableBodyContentItem}>{unpaidFines.paidStatus ? "Paid" : "Unpaid"}</div>
                                                <div className={styles.fineTableBodyContentItem}>
                                                    <button onClick={payFine} className={styles.payButton}>Pay</button>
                                                </div>
                                            </div>
                                        ) : <p>No unpaid fines found.</p>}
                                    </div>
                                    {allFines.length > 0 && (
                                        <div className={styles.allFines}>
                                            <h3>All Fines</h3>
                                            {allFines.map((fine) => (
                                                <div className={styles.fineTableBodyContentRow} key={fine.fineId}>
                                                    <div className={styles.fineTableBodyContentItem}>{fine.fineId}</div>
                                                    <div className={styles.fineTableBodyContentItem}>{fine.amount}</div>
                                                    <div className={styles.fineTableBodyContentItem}>{fine.resourceIssueDate}</div>
                                                    <div className={styles.fineTableBodyContentItem}>{fine.paidStatus ? "Paid" : "Unpaid"}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default AdminFineManagement;