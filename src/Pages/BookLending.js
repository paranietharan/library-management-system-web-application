import { useState } from 'react';
import LibrarianTopNavBar from '../Components/LibrarianTopNavBar';
import Style from './style/BookLending.module.css';
import MemberSearchComponent from '../Components/MemberSearchComponent';
import BookSearchComponent from '../Components/BookSearchComponent';
import Footer from '../Components/LibraryFooter';
import AlertMessage from '../Components/AlertMessage';
import http from '../service/http-common';

function BookLending() {
    const [selectedMember, setSelectedMember] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [showError, setShowError] = useState(false);

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
            console.log("Book issued successfully:", response.data);
            // Optionally, you can reset selectedMember and selectedBook state here

            // reset the book and member state
            setSelectedBook(null);
            setSelectedMember(null);

            // Show success message
            alert("Book issued successfully!");

            // forwards to the book lending page
            window.location.href = "/book-lending";
        } catch (error) {
            console.error("Error issuing book:", error);
            // Handle error
        }
    };

    const handleCloseError = () => {
        setShowError(false);
    };

    return (
        <>
            <div className={Style.navbar}>
                <LibrarianTopNavBar />
            </div>
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
                    <button onClick={handleLendBook}>Lend Book</button>
                </div>

                <AlertMessage
                    show={showError}
                    message="Please select both a member and a book to proceed."
                    onClose={handleCloseError}
                />

            </div>

            <Footer />
        </>
    );
}

export default BookLending;