import Style from './style/AdminBookIssue.module.css';
import MemberSearchComponent from './MemberSearchComponent';
import BookSearchComponent from './BookSearchComponent';
import { useState, useEffect } from 'react';
import http from '../service/http-common';
import AlertMessage from './AlertMessage';

function AdminBookIssue() {
    const [selectedMember, setSelectedMember] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [showError, setShowError] = useState(false);
    const [issueStatus, setIssueStatus] = useState(null); // To store if the member has a book issued

    useEffect(() => {
        if (selectedMember) {
            checkUserBookStatus(selectedMember.userID);
        } else {
            setIssueStatus(null);
        }
    }, [selectedMember]);

    const handleSelectMember = (member) => {
        setSelectedMember(member);
    };

    const handleSelectBook = (book) => {
        setSelectedBook(book);
    };

    const handleLendBook = async () => {
        if (!selectedMember || !selectedBook) {
            setShowError(true);
            return;
        }

        try {
            const response = await http.post(`/issues/issue?resourceId=${selectedBook.resourceId}&memberId=${selectedMember.userID}`);
            alert(response.data);
            // Reset the book and member state
            setSelectedBook(null);
            setSelectedMember(null);
            setIssueStatus(null);

            // Forward to the book lending page
            window.location.href = "/book-lending";
        } catch (error) {
            console.error("Error issuing book:", error);
            // Handle error
        }
    };


    const checkUserBookStatus = async (memberId) => {
        try {
            const response = await http.get(`/issues/check?memberId=${memberId}`);
            setIssueStatus(response.data);
        } catch (error) {
            console.error("Error checking book status:", error);
            setIssueStatus(null); // Clear issue status on error
        }
    };

    const handleCloseError = () => {
        setShowError(false);
    };

    const isLendDisabled = issueStatus && typeof issueStatus === 'string' && issueStatus.startsWith("Resource");

    return (
        <div className={Style.container}>
            <div className={Style.content}>
                <div className={Style.MemberSearch}>
                    <MemberSearchComponent onSelectMember={handleSelectMember} />
                </div>

                <div className={Style.BookSearch}>
                    <BookSearchComponent onSelectBook={handleSelectBook} />
                </div>
            </div>

            <div className={Style.BookLendingForm}>
                <h2>Book Lending Form</h2>
                <p>Member ID: {selectedMember ? selectedMember.userID : "Not selected"}</p>
                <p>Book Name: {selectedBook ? selectedBook.title : "Not selected"}</p>
                <button onClick={handleLendBook} disabled={isLendDisabled}>
                    Lend Book
                </button>
            </div>

            <AlertMessage
                show={showError}
                message="Please select both a member and a book to proceed."
                onClose={handleCloseError}
            />
        </div>
    );
}

export default AdminBookIssue;